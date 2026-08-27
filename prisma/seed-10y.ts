import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding 10 years of full PL data for listed companies (2015-2024)...');

  // トヨタ自動車 10年分 PLデータ (単位: 百万円)
  const toyotaFinancials = [
    { fiscalYear: 2015, periodType: 'FY', periodEnd: '2015-03-31', revenue: 27234521, operatingIncome: 2750564, ordinaryIncome: 2892828, netIncome: 2173338, operatingMargin: 10.10, eps: 172.5, bps: 1350.2, totalAssets: 47729830, totalLiabilities: 29600000, netAssets: 18129830, equityRatio: 36.8, dividendPerShare: 40.0 },
    { fiscalYear: 2016, periodType: 'FY', periodEnd: '2016-03-31', revenue: 28403118, operatingIncome: 2853971, ordinaryIncome: 2983381, netIncome: 2312694, operatingMargin: 10.05, eps: 188.4, bps: 1420.5, totalAssets: 47427597, totalLiabilities: 28900000, netAssets: 18527597, equityRatio: 37.8, dividendPerShare: 42.0 },
    { fiscalYear: 2017, periodType: 'FY', periodEnd: '2017-03-31', revenue: 27597193, operatingIncome: 1994372, ordinaryIncome: 2193825, netIncome: 1831109, operatingMargin: 7.23, eps: 152.8, bps: 1490.8, totalAssets: 48750186, totalLiabilities: 29900000, netAssets: 18850186, equityRatio: 37.4, dividendPerShare: 42.0 },
    { fiscalYear: 2018, periodType: 'FY', periodEnd: '2018-03-31', revenue: 29379510, operatingIncome: 2399862, ordinaryIncome: 2620429, netIncome: 2493983, operatingMargin: 8.17, eps: 212.1, bps: 1620.0, totalAssets: 50308249, totalLiabilities: 30400000, netAssets: 19908249, equityRatio: 38.3, dividendPerShare: 44.0 },
    { fiscalYear: 2019, periodType: 'FY', periodEnd: '2019-03-31', revenue: 30225681, operatingIncome: 2467545, ordinaryIncome: 2285468, netIncome: 1882873, operatingMargin: 8.16, eps: 163.5, bps: 1710.2, totalAssets: 51936949, totalLiabilities: 31400000, netAssets: 20536949, equityRatio: 38.2, dividendPerShare: 44.0 },
    { fiscalYear: 2020, periodType: 'FY', periodEnd: '2020-03-31', revenue: 29929992, operatingIncome: 2404555, ordinaryIncome: 2554607, netIncome: 2076183, operatingMargin: 8.03, eps: 185.9, bps: 1780.4, totalAssets: 52680436, totalLiabilities: 31900000, netAssets: 20780436, equityRatio: 38.1, dividendPerShare: 44.0 },
    { fiscalYear: 2021, periodType: 'FY', periodEnd: '2021-03-31', revenue: 27214594, operatingIncome: 2197748, ordinaryIncome: 2932354, netIncome: 2245261, operatingMargin: 8.08, eps: 160.8, bps: 1840.5, totalAssets: 62267140, totalLiabilities: 37900000, netAssets: 24367140, equityRatio: 37.8, dividendPerShare: 48.0 },
    { fiscalYear: 2022, periodType: 'FY', periodEnd: '2022-03-31', revenue: 31379507, operatingIncome: 2995697, ordinaryIncome: 3990532, netIncome: 2850110, operatingMargin: 9.55, eps: 205.2, bps: 1980.5, totalAssets: 67688771, totalLiabilities: 40580000, netAssets: 27108771, equityRatio: 38.6, dividendPerShare: 52.0 },
    { fiscalYear: 2023, periodType: 'FY', periodEnd: '2023-03-31', revenue: 37154298, operatingIncome: 2725025, ordinaryIncome: 3668894, netIncome: 2451318, operatingMargin: 7.33, eps: 179.5, bps: 2185.0, totalAssets: 74303100, totalLiabilities: 45100000, netAssets: 29203100, equityRatio: 37.9, dividendPerShare: 60.0 },
    { fiscalYear: 2024, periodType: 'FY', periodEnd: '2024-03-31', revenue: 45095325, operatingIncome: 5352934, ordinaryIncome: 6964952, netIncome: 4944933, operatingMargin: 11.87, eps: 365.9, bps: 2680.4, totalAssets: 87810000, totalLiabilities: 51200000, netAssets: 36610000, equityRatio: 40.2, dividendPerShare: 75.0 }
  ];

  await prisma.financialReport.deleteMany({ where: { tickerCode: '7203' } });
  for (const fin of toyotaFinancials) {
    await prisma.financialReport.create({
      data: {
        tickerCode: '7203',
        ...fin,
      }
    });
  }

  // 任天堂 10年分 PLデータ
  const nintendoFinancials = [
    { fiscalYear: 2015, periodType: 'FY', periodEnd: '2015-03-31', revenue: 549780, operatingIncome: 24770, netIncome: 41843, operatingMargin: 4.51, eps: 34.9, bps: 960.0, totalAssets: 1350000, totalLiabilities: 210000, netAssets: 1140000, equityRatio: 84.4, dividendPerShare: 36.0 },
    { fiscalYear: 2016, periodType: 'FY', periodEnd: '2016-03-31', revenue: 504459, operatingIncome: 32881, netIncome: 16516, operatingMargin: 6.52, eps: 13.8, bps: 975.0, totalAssets: 1290000, totalLiabilities: 180000, netAssets: 1110000, equityRatio: 86.0, dividendPerShare: 30.0 },
    { fiscalYear: 2017, periodType: 'FY', periodEnd: '2017-03-31', revenue: 489095, operatingIncome: 29398, netIncome: 102574, operatingMargin: 6.01, eps: 85.5, bps: 1045.0, totalAssets: 1470000, totalLiabilities: 240000, netAssets: 1230000, equityRatio: 83.7, dividendPerShare: 86.0 },
    { fiscalYear: 2018, periodType: 'FY', periodEnd: '2018-03-31', revenue: 1055682, operatingIncome: 177557, netIncome: 139590, operatingMargin: 16.82, eps: 116.3, bps: 1130.0, totalAssets: 1600000, totalLiabilities: 270000, netAssets: 1330000, equityRatio: 83.1, dividendPerShare: 96.0 },
    { fiscalYear: 2019, periodType: 'FY', periodEnd: '2019-03-31', revenue: 1200560, operatingIncome: 249701, netIncome: 194009, operatingMargin: 20.80, eps: 161.7, bps: 1180.0, totalAssets: 1690000, totalLiabilities: 280000, netAssets: 1410000, equityRatio: 83.4, dividendPerShare: 166.0 },
    { fiscalYear: 2020, periodType: 'FY', periodEnd: '2020-03-31', revenue: 1308519, operatingIncome: 352370, netIncome: 258641, operatingMargin: 26.93, eps: 217.4, bps: 1290.0, totalAssets: 1930000, totalLiabilities: 390000, netAssets: 1540000, equityRatio: 79.8, dividendPerShare: 218.0 },
    { fiscalYear: 2021, periodType: 'FY', periodEnd: '2021-03-31', revenue: 1758910, operatingIncome: 640634, netIncome: 480376, operatingMargin: 36.42, eps: 403.7, bps: 1570.0, totalAssets: 2450000, totalLiabilities: 570000, netAssets: 1880000, equityRatio: 76.7, dividendPerShare: 444.0 },
    { fiscalYear: 2022, periodType: 'FY', periodEnd: '2022-03-31', revenue: 1695344, operatingIncome: 592760, netIncome: 477691, operatingMargin: 34.96, eps: 404.7, bps: 1720.0, totalAssets: 2660000, totalLiabilities: 610000, netAssets: 2050000, equityRatio: 77.1, dividendPerShare: 406.0 },
    { fiscalYear: 2023, periodType: 'FY', periodEnd: '2023-03-31', revenue: 1601677, operatingIncome: 504375, netIncome: 432768, operatingMargin: 31.49, eps: 371.4, bps: 1980.0, totalAssets: 2900000, totalLiabilities: 600000, netAssets: 2300000, equityRatio: 79.3, dividendPerShare: 186.0 },
    { fiscalYear: 2024, periodType: 'FY', periodEnd: '2024-03-31', revenue: 1671865, operatingIncome: 528900, netIncome: 490600, operatingMargin: 31.64, eps: 421.2, bps: 2158.0, totalAssets: 3205000, totalLiabilities: 690000, netAssets: 2515000, equityRatio: 78.4, dividendPerShare: 211.0 }
  ];

  await prisma.financialReport.deleteMany({ where: { tickerCode: '7974' } });
  for (const fin of nintendoFinancials) {
    await prisma.financialReport.create({
      data: {
        tickerCode: '7974',
        ...fin,
      }
    });
  }

  console.log('10-year PL data seeded successfully!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });