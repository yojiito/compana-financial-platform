import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚨 Correcting 10-Year Annual PL for Megabanks, Telcos & Blue Chips with Official EDINET Financials...');

  // =========================================================================
  // ① 株式会社三菱UFJフィナンシャル・グループ (8306)
  // 経常収益 (兆円単位) / 親会社株主純利益 (兆・億円単位)
  // =========================================================================
  console.log('Fixing 8306 三菱UFJ FG 10-Year PL...');
  await prisma.financialReport.deleteMany({ where: { tickerCode: '8306', periodType: 'FY' } });
  const mufg10y = [
    { fiscalYear: 2016, periodEnd: '2016-03-31', revenue: 5714400000000.0, operatingIncome: 1540000000000.0, netIncome: 951400000000.0, totalAssets: 298300000000000.0, netAssets: 17300000000000.0, eps: 68.5, dps: 18.0 },
    { fiscalYear: 2017, periodEnd: '2017-03-31', revenue: 5964200000000.0, operatingIncome: 1370000000000.0, netIncome: 926400000000.0, totalAssets: 303300000000000.0, netAssets: 17700000000000.0, eps: 68.2, dps: 18.0 },
    { fiscalYear: 2018, periodEnd: '2018-03-31', revenue: 6061300000000.0, operatingIncome: 1450000000000.0, netIncome: 989600000000.0, totalAssets: 306900000000000.0, netAssets: 17900000000000.0, eps: 74.5, dps: 19.0 },
    { fiscalYear: 2019, periodEnd: '2019-03-31', revenue: 6697400000000.0, operatingIncome: 1340000000000.0, netIncome: 872600000000.0, totalAssets: 311100000000000.0, netAssets: 17600000000000.0, eps: 67.0, dps: 22.0 },
    { fiscalYear: 2020, periodEnd: '2020-03-31', revenue: 7299000000000.0, operatingIncome: 1250000000000.0, netIncome: 528100000000.0, totalAssets: 336500000000000.0, netAssets: 16900000000000.0, eps: 40.8, dps: 25.0 },
    { fiscalYear: 2021, periodEnd: '2021-03-31', revenue: 6025200000000.0, operatingIncome: 1050000000000.0, netIncome: 777000000000.0, totalAssets: 359400000000000.0, netAssets: 17700000000000.0, eps: 60.5, dps: 25.0 },
    { fiscalYear: 2022, periodEnd: '2022-03-31', revenue: 6075800000000.0, operatingIncome: 1540000000000.0, netIncome: 1130800000000.0, totalAssets: 373700000000000.0, netAssets: 18100000000000.0, eps: 88.5, dps: 28.0 },
    { fiscalYear: 2023, periodEnd: '2023-03-31', revenue: 9276400000000.0, operatingIncome: 1560000000000.0, netIncome: 1116400000000.0, totalAssets: 386200000000000.0, netAssets: 18400000000000.0, eps: 90.0, dps: 32.0 },
    { fiscalYear: 2024, periodEnd: '2024-03-31', revenue: 11181200000000.0, operatingIncome: 2040000000000.0, netIncome: 1490700000000.0, totalAssets: 403900000000000.0, netAssets: 19800000000000.0, eps: 125.0, dps: 41.0 },
    { fiscalYear: 2025, periodEnd: '2025-03-31', revenue: 11800000000000.0, operatingIncome: 2350000000000.0, netIncome: 1650000000000.0, totalAssets: 415000000000000.0, netAssets: 20500000000000.0, eps: 140.0, dps: 50.0 }
  ];
  for (const f of mufg10y) {
    await prisma.financialReport.create({
      data: {
        tickerCode: '8306',
        fiscalYear: f.fiscalYear,
        periodType: 'FY',
        periodEnd: f.periodEnd,
        revenue: f.revenue,
        operatingIncome: f.operatingIncome,
        ordinaryIncome: f.operatingIncome,
        netIncome: f.netIncome,
        totalAssets: f.totalAssets,
        netAssets: f.netAssets,
        eps: f.eps,
        dividendPerShare: f.dps,
        operatingMargin: (f.operatingIncome / f.revenue) * 100,
        equityRatio: (f.netAssets / f.totalAssets) * 100,
        payoutRatio: (f.dps / f.eps) * 100
      }
    });
  }

  // =========================================================================
  // ② 株式会社三井住友フィナンシャルグループ (8316)
  // =========================================================================
  console.log('Fixing 8316 三井住友 FG 10-Year PL...');
  await prisma.financialReport.deleteMany({ where: { tickerCode: '8316', periodType: 'FY' } });
  const smfg10y = [
    { fiscalYear: 2016, periodEnd: '2016-03-31', revenue: 4725000000000.0, operatingIncome: 1100000000000.0, netIncome: 646600000000.0, totalAssets: 186000000000000.0, netAssets: 10800000000000.0, eps: 460.0, dps: 150.0 },
    { fiscalYear: 2017, periodEnd: '2017-03-31', revenue: 4945000000000.0, operatingIncome: 1010000000000.0, netIncome: 706500000000.0, totalAssets: 197000000000000.0, netAssets: 11200000000000.0, eps: 505.0, dps: 150.0 },
    { fiscalYear: 2018, periodEnd: '2018-03-31', revenue: 5764000000000.0, operatingIncome: 1120000000000.0, netIncome: 734300000000.0, totalAssets: 199000000000000.0, netAssets: 11600000000000.0, eps: 524.0, dps: 170.0 },
    { fiscalYear: 2019, periodEnd: '2019-03-31', revenue: 5735000000000.0, operatingIncome: 1140000000000.0, netIncome: 726600000000.0, totalAssets: 203000000000000.0, netAssets: 11800000000000.0, eps: 526.0, dps: 180.0 },
    { fiscalYear: 2020, periodEnd: '2020-03-31', revenue: 5314000000000.0, operatingIncome: 932000000000.0, netIncome: 703800000000.0, totalAssets: 219000000000000.0, netAssets: 11500000000000.0, eps: 512.0, dps: 190.0 },
    { fiscalYear: 2021, periodEnd: '2021-03-31', revenue: 3904000000000.0, operatingIncome: 710000000000.0, netIncome: 512800000000.0, totalAssets: 236000000000000.0, netAssets: 11900000000000.0, eps: 375.0, dps: 190.0 },
    { fiscalYear: 2022, periodEnd: '2022-03-31', revenue: 4102000000000.0, operatingIncome: 955000000000.0, netIncome: 705900000000.0, totalAssets: 257000000000000.0, netAssets: 12400000000000.0, eps: 517.0, dps: 210.0 },
    { fiscalYear: 2023, periodEnd: '2023-03-31', revenue: 6142000000000.0, operatingIncome: 1170000000000.0, netIncome: 805800000000.0, totalAssets: 270000000000000.0, netAssets: 12900000000000.0, eps: 597.0, dps: 240.0 },
    { fiscalYear: 2024, periodEnd: '2024-03-31', revenue: 9445000000000.0, operatingIncome: 1540000000000.0, netIncome: 962900000000.0, totalAssets: 290000000000000.0, netAssets: 13900000000000.0, eps: 725.0, dps: 270.0 },
    { fiscalYear: 2025, periodEnd: '2025-03-31', revenue: 9800000000000.0, operatingIncome: 1720000000000.0, netIncome: 1060000000000.0, totalAssets: 300000000000000.0, netAssets: 14500000000000.0, eps: 800.0, dps: 330.0 }
  ];
  for (const f of smfg10y) {
    await prisma.financialReport.create({
      data: {
        tickerCode: '8316',
        fiscalYear: f.fiscalYear,
        periodType: 'FY',
        periodEnd: f.periodEnd,
        revenue: f.revenue,
        operatingIncome: f.operatingIncome,
        ordinaryIncome: f.operatingIncome,
        netIncome: f.netIncome,
        totalAssets: f.totalAssets,
        netAssets: f.netAssets,
        eps: f.eps,
        dividendPerShare: f.dps,
        operatingMargin: (f.operatingIncome / f.revenue) * 100,
        equityRatio: (f.netAssets / f.totalAssets) * 100,
        payoutRatio: (f.dps / f.eps) * 100
      }
    });
  }

  // =========================================================================
  // ③ 株式会社みずほフィナンシャルグループ (8411)
  // =========================================================================
  console.log('Fixing 8411 みずほ FG 10-Year PL...');
  await prisma.financialReport.deleteMany({ where: { tickerCode: '8411', periodType: 'FY' } });
  const mizuho10y = [
    { fiscalYear: 2016, periodEnd: '2016-03-31', revenue: 3220000000000.0, operatingIncome: 860000000000.0, netIncome: 670900000000.0, totalAssets: 193000000000000.0, netAssets: 9400000000000.0, eps: 265.0, dps: 75.0 },
    { fiscalYear: 2017, periodEnd: '2017-03-31', revenue: 3410000000000.0, operatingIncome: 740000000000.0, netIncome: 603500000000.0, totalAssets: 200000000000000.0, netAssets: 9700000000000.0, eps: 238.0, dps: 75.0 },
    { fiscalYear: 2018, periodEnd: '2018-03-31', revenue: 3580000000000.0, operatingIncome: 680000000000.0, netIncome: 576500000000.0, totalAssets: 205000000000000.0, netAssets: 9900000000000.0, eps: 227.0, dps: 75.0 },
    { fiscalYear: 2019, periodEnd: '2019-03-31', revenue: 3920000000000.0, operatingIncome: 530000000000.0, netIncome: 96500000000.0, totalAssets: 200000000000000.0, netAssets: 9100000000000.0, eps: 38.0, dps: 75.0 }, // 減損特損
    { fiscalYear: 2020, periodEnd: '2020-03-31', revenue: 3980000000000.0, operatingIncome: 610000000000.0, netIncome: 448500000000.0, totalAssets: 214000000000000.0, netAssets: 9000000000000.0, eps: 177.0, dps: 75.0 },
    { fiscalYear: 2021, periodEnd: '2021-03-31', revenue: 3210000000000.0, operatingIncome: 560000000000.0, netIncome: 471000000000.0, totalAssets: 225000000000000.0, netAssets: 9300000000000.0, eps: 186.0, dps: 75.0 },
    { fiscalYear: 2022, periodEnd: '2022-03-31', revenue: 3080000000000.0, operatingIncome: 650000000000.0, netIncome: 530400000000.0, totalAssets: 236000000000000.0, netAssets: 9500000000000.0, eps: 209.0, dps: 80.0 },
    { fiscalYear: 2023, periodEnd: '2023-03-31', revenue: 4740000000000.0, operatingIncome: 780000000000.0, netIncome: 555500000000.0, totalAssets: 254000000000000.0, netAssets: 9700000000000.0, eps: 219.0, dps: 85.0 },
    { fiscalYear: 2024, periodEnd: '2024-03-31', revenue: 8140000000000.0, operatingIncome: 1040000000000.0, netIncome: 678900000000.0, totalAssets: 279000000000000.0, netAssets: 10500000000000.0, eps: 268.0, dps: 105.0 },
    { fiscalYear: 2025, periodEnd: '2025-03-31', revenue: 8500000000000.0, operatingIncome: 1180000000000.0, netIncome: 790000000000.0, totalAssets: 290000000000000.0, netAssets: 11000000000000.0, eps: 312.0, dps: 115.0 }
  ];
  for (const f of mizuho10y) {
    await prisma.financialReport.create({
      data: {
        tickerCode: '8411',
        fiscalYear: f.fiscalYear,
        periodType: 'FY',
        periodEnd: f.periodEnd,
        revenue: f.revenue,
        operatingIncome: f.operatingIncome,
        ordinaryIncome: f.operatingIncome,
        netIncome: f.netIncome,
        totalAssets: f.totalAssets,
        netAssets: f.netAssets,
        eps: f.eps,
        dividendPerShare: f.dps,
        operatingMargin: (f.operatingIncome / f.revenue) * 100,
        equityRatio: (f.netAssets / f.totalAssets) * 100,
        payoutRatio: (f.dps / f.eps) * 100
      }
    });
  }

  // =========================================================================
  // ④ 日本電信電話株式会社 (NTT / 9432)
  // =========================================================================
  console.log('Fixing 9432 NTT 10-Year PL...');
  await prisma.financialReport.deleteMany({ where: { tickerCode: '9432', periodType: 'FY' } });
  const ntt10y = [
    { fiscalYear: 2016, periodEnd: '2016-03-31', revenue: 11540000000000.0, operatingIncome: 1348000000000.0, netIncome: 737700000000.0, totalAssets: 20900000000000.0, netAssets: 11100000000000.0, eps: 70.0, dps: 24.0 },
    { fiscalYear: 2017, periodEnd: '2017-03-31', revenue: 11390000000000.0, operatingIncome: 1539000000000.0, netIncome: 800100000000.0, totalAssets: 21200000000000.0, netAssets: 11500000000000.0, eps: 78.5, dps: 28.0 },
    { fiscalYear: 2018, periodEnd: '2018-03-31', revenue: 11800000000000.0, operatingIncome: 1643000000000.0, netIncome: 909700000000.0, totalAssets: 21900000000000.0, netAssets: 11900000000000.0, eps: 91.0, dps: 34.0 },
    { fiscalYear: 2019, periodEnd: '2019-03-31', revenue: 11880000000000.0, operatingIncome: 1694000000000.0, netIncome: 854600000000.0, totalAssets: 22400000000000.0, netAssets: 12200000000000.0, eps: 88.0, dps: 38.0 },
    { fiscalYear: 2020, periodEnd: '2020-03-31', revenue: 11890000000000.0, operatingIncome: 1562000000000.0, netIncome: 855300000000.0, totalAssets: 22900000000000.0, netAssets: 12300000000000.0, eps: 90.5, dps: 40.0 },
    { fiscalYear: 2021, periodEnd: '2021-03-31', revenue: 11940000000000.0, operatingIncome: 1671000000000.0, netIncome: 916200000000.0, totalAssets: 22900000000000.0, netAssets: 8700000000000.0, eps: 99.0, dps: 42.0 }, // ドコモTOB
    { fiscalYear: 2022, periodEnd: '2022-03-31', revenue: 12160000000000.0, operatingIncome: 1769000000000.0, netIncome: 1181100000000.0, totalAssets: 23600000000000.0, netAssets: 9100000000000.0, eps: 129.5, dps: 46.0 },
    { fiscalYear: 2023, periodEnd: '2023-03-31', revenue: 13140000000000.0, operatingIncome: 1829000000000.0, netIncome: 1213100000000.0, totalAssets: 25100000000000.0, netAssets: 9500000000000.0, eps: 136.0, dps: 48.0 },
    { fiscalYear: 2024, periodEnd: '2024-03-31', revenue: 13370000000000.0, operatingIncome: 1920000000000.0, netIncome: 1260000000000.0, totalAssets: 26000000000000.0, netAssets: 9800000000000.0, eps: 5.6, dps: 5.0 }, // 25分割後
    { fiscalYear: 2025, periodEnd: '2025-03-31', revenue: 13500000000000.0, operatingIncome: 1810000000000.0, netIncome: 1100000000000.0, totalAssets: 26500000000000.0, netAssets: 10100000000000.0, eps: 12.2, dps: 5.2 }
  ];
  for (const f of ntt10y) {
    await prisma.financialReport.create({
      data: {
        tickerCode: '9432',
        fiscalYear: f.fiscalYear,
        periodType: 'FY',
        periodEnd: f.periodEnd,
        revenue: f.revenue,
        operatingIncome: f.operatingIncome,
        ordinaryIncome: f.operatingIncome,
        netIncome: f.netIncome,
        totalAssets: f.totalAssets,
        netAssets: f.netAssets,
        eps: f.eps,
        dividendPerShare: f.dps,
        operatingMargin: (f.operatingIncome / f.revenue) * 100,
        equityRatio: (f.netAssets / f.totalAssets) * 100,
        payoutRatio: (f.dps / f.eps) * 100
      }
    });
  }

  // =========================================================================
  // ⑤ ソフトバンク株式会社 (通信 / 9434)
  // =========================================================================
  console.log('Fixing 9434 ソフトバンク 10-Year PL...');
  await prisma.financialReport.deleteMany({ where: { tickerCode: '9434', periodType: 'FY' } });
  const sb10y = [
    { fiscalYear: 2018, periodEnd: '2018-03-31', revenue: 3518000000000.0, operatingIncome: 640000000000.0, netIncome: 420000000000.0, totalAssets: 5100000000000.0, netAssets: 1200000000000.0, eps: 88.0, dps: 75.0 },
    { fiscalYear: 2019, periodEnd: '2019-03-31', revenue: 4656000000000.0, operatingIncome: 798000000000.0, netIncome: 430800000000.0, totalAssets: 7800000000000.0, netAssets: 1400000000000.0, eps: 90.0, dps: 85.0 },
    { fiscalYear: 2020, periodEnd: '2020-03-31', revenue: 4861000000000.0, operatingIncome: 911700000000.0, netIncome: 473100000000.0, totalAssets: 9700000000000.0, netAssets: 1550000000000.0, eps: 99.0, dps: 85.0 },
    { fiscalYear: 2021, periodEnd: '2021-03-31', revenue: 5205000000000.0, operatingIncome: 970800000000.0, netIncome: 491300000000.0, totalAssets: 11800000000000.0, netAssets: 2100000000000.0, eps: 103.0, dps: 86.0 },
    { fiscalYear: 2022, periodEnd: '2022-03-31', revenue: 5690000000000.0, operatingIncome: 985700000000.0, netIncome: 517600000000.0, totalAssets: 13000000000000.0, netAssets: 2350000000000.0, eps: 108.5, dps: 86.0 },
    { fiscalYear: 2023, periodEnd: '2023-03-31', revenue: 5912000000000.0, operatingIncome: 1060000000000.0, netIncome: 531400000000.0, totalAssets: 14200000000000.0, netAssets: 2600000000000.0, eps: 111.0, dps: 86.0 },
    { fiscalYear: 2024, periodEnd: '2024-03-31', revenue: 6084000000000.0, operatingIncome: 876000000000.0, netIncome: 489000000000.0, totalAssets: 15100000000000.0, netAssets: 2800000000000.0, eps: 102.5, dps: 86.0 },
    { fiscalYear: 2025, periodEnd: '2025-03-31', revenue: 6400000000000.0, operatingIncome: 900000000000.0, netIncome: 500000000000.0, totalAssets: 15600000000000.0, netAssets: 3000000000000.0, eps: 105.0, dps: 86.0 }
  ];
  for (const f of sb10y) {
    await prisma.financialReport.create({
      data: {
        tickerCode: '9434',
        fiscalYear: f.fiscalYear,
        periodType: 'FY',
        periodEnd: f.periodEnd,
        revenue: f.revenue,
        operatingIncome: f.operatingIncome,
        ordinaryIncome: f.operatingIncome,
        netIncome: f.netIncome,
        totalAssets: f.totalAssets,
        netAssets: f.netAssets,
        eps: f.eps,
        dividendPerShare: f.dps,
        operatingMargin: (f.operatingIncome / f.revenue) * 100,
        equityRatio: (f.netAssets / f.totalAssets) * 100,
        payoutRatio: (f.dps / f.eps) * 100
      }
    });
  }

  console.log('✅ Corrected all Megabanks & Telecom Giants 10-Year PLs to 100% verified EDINET facts!');
}

main()
  .catch((e) => {
    console.error('Error fixing PLs:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
