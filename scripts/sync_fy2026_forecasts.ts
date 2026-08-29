import { prisma } from '../lib/prisma';

// 🏢 代表企業の2026年3月期 通期会社予想 (periodType: 'FY')
const FY2026_FORECASTS: Record<string, {
  revenue: number;
  operatingIncome: number;
  ordinaryIncome: number;
  netIncome: number;
  totalAssets: number;
  netAssets: number;
  eps?: number;
  dividendPerShare?: number;
}> = {
  // トヨタ自動車 (7203) - 2026期 通期会社予想
  '7203': {
    revenue: 46000000,
    operatingIncome: 4300000,
    ordinaryIncome: 4800000,
    netIncome: 3570000,
    totalAssets: 93500000,
    netAssets: 40600000,
    eps: 268.5,
    dividendPerShare: 95.0
  },
  // ソニーグループ (6758) - 2026期 通期会社予想
  '6758': {
    revenue: 12700000,
    operatingIncome: 1310000,
    ordinaryIncome: 1350000,
    netIncome: 980000,
    totalAssets: 36500000,
    netAssets: 10100000,
    eps: 80.2,
    dividendPerShare: 90.0
  },
  // 三菱商事 (8058) - 2026期 通期会社予想
  '8058': {
    revenue: 19800000,
    operatingIncome: 1080000,
    ordinaryIncome: 1250000,
    netIncome: 980000,
    totalAssets: 23800000,
    netAssets: 9550000,
    eps: 242.0,
    dividendPerShare: 100.0
  },
  // キーエンス (6861) - 2026期 通期会社予想
  '6861': {
    revenue: 1050000,
    operatingIncome: 540000,
    ordinaryIncome: 560000,
    netIncome: 400000,
    totalAssets: 3300000,
    netAssets: 3120000,
    eps: 1650.0,
    dividendPerShare: 350.0
  },
  // 任天堂 (7974) - 2026期 通期会社予想
  '7974': {
    revenue: 1650000,
    operatingIncome: 450000,
    ordinaryIncome: 520000,
    netIncome: 380000,
    totalAssets: 3320000,
    netAssets: 2720000,
    eps: 325.0,
    dividendPerShare: 140.0
  },
  // パピレス (3641) - 2026期 通期会社予想
  '3641': {
    revenue: 55100,
    operatingIncome: 4740,
    ordinaryIncome: 4800,
    netIncome: 3080,
    totalAssets: 49500,
    netAssets: 34700,
    eps: 196.4,
    dividendPerShare: 20.0
  },
  // カバー (5253) - 2026期 通期会社予想
  '5253': {
    revenue: 33500,
    operatingIncome: 5800,
    ordinaryIncome: 5850,
    netIncome: 4100,
    totalAssets: 30500,
    netAssets: 20600,
    eps: 66.8,
    dividendPerShare: 10.0
  },
  // note (5243) - 2026期 通期会社予想
  '5243': {
    revenue: 4250,
    operatingIncome: 450,
    ordinaryIncome: 440,
    netIncome: 410,
    totalAssets: 5800,
    netAssets: 3920,
    eps: 26.5,
    dividendPerShare: 0.0
  }
};

async function syncFy2026Forecasts() {
  console.log('=== 2026年度 通期会社予想 (FY) レコード整備処理 ===\n');

  for (const [ticker, data] of Object.entries(FY2026_FORECASTS)) {
    const comp = await prisma.company.findUnique({ where: { tickerCode: ticker } });
    if (!comp) continue;

    await prisma.financialReport.upsert({
      where: {
        tickerCode_fiscalYear_periodType: {
          tickerCode: ticker,
          fiscalYear: 2026,
          periodType: 'FY'
        }
      },
      create: {
        tickerCode: ticker,
        fiscalYear: 2026,
        periodType: 'FY',
        periodEnd: '2026-03-31',
        revenue: data.revenue,
        operatingIncome: data.operatingIncome,
        ordinaryIncome: data.ordinaryIncome,
        netIncome: data.netIncome,
        totalAssets: data.totalAssets,
        netAssets: data.netAssets,
        eps: data.eps,
        dividendPerShare: data.dividendPerShare,
        operatingMargin: Number(((data.operatingIncome / data.revenue) * 100).toFixed(2)),
        equityRatio: Number(((data.netAssets / data.totalAssets) * 100).toFixed(1))
      },
      update: {
        periodEnd: '2026-03-31',
        revenue: data.revenue,
        operatingIncome: data.operatingIncome,
        ordinaryIncome: data.ordinaryIncome,
        netIncome: data.netIncome,
        totalAssets: data.totalAssets,
        netAssets: data.netAssets,
        eps: data.eps,
        dividendPerShare: data.dividendPerShare,
        operatingMargin: Number(((data.operatingIncome / data.revenue) * 100).toFixed(2)),
        equityRatio: Number(((data.netAssets / data.totalAssets) * 100).toFixed(1))
      }
    });

    console.log(`✅ [${ticker}] ${comp.name} 2026年度通期会社予想 (FY) 反映完了 (売上: ${(data.revenue / 100000000).toFixed(1)}億円 / 営利: ${(data.operatingIncome / 100000000).toFixed(1)}億円)`);
  }

  console.log('\n🎉 通期会社予想 (FY) の整備が完了しました！');
}

syncFy2026Forecasts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
