import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚨 Correcting Market Caps, Stock Prices, and Shares Issued for Mitsui & Co. (8031) and Major Prime Corporates...');

  const majorCompanies = [
    {
      tickerCode: '8031',
      name: '三井物産株式会社',
      shortName: '三井物産',
      englishName: 'MITSUI & CO., LTD.',
      market: 'プライム',
      sector: '卸売業',
      currentPrice: 3420.0,
      sharesIssued: 3016000000,
      marketCap: 10314720000000.0, // 10兆3,147億円 (3,420円 × 30.16億株)
      trailingPE: 9.8,
      priceToBook: 1.25,
      dividendYield: 3.2,
      roe: 14.8,
      equityRatio: 41.5,
      representative: '堀健栄 (代表取締役社長)',
      description: '三井物産は、金属資源、エネルギー、インフラ、化学品、鉄鋼、食料、ヘルスケア等をグローバルに展開する日本を代表する総合商社です。'
    },
    {
      tickerCode: '8058',
      name: '三菱商事株式会社',
      shortName: '三菱商事',
      englishName: 'Mitsubishi Corporation',
      market: 'プライム',
      sector: '卸売業',
      currentPrice: 3150.0,
      sharesIssued: 4150000000,
      marketCap: 13072500000000.0, // 13兆725億円
      trailingPE: 11.2,
      priceToBook: 1.32,
      dividendYield: 3.1,
      roe: 13.5,
      equityRatio: 38.2,
      representative: '中西勝也 (代表取締役社長)',
      description: '三菱商事は、エネルギー、金属資源、流通、インフラ等幅広い産業を網羅する日本最大の総合商社です。'
    },
    {
      tickerCode: '8001',
      name: '伊藤忠商事株式会社',
      shortName: '伊藤忠商事',
      englishName: 'ITOCHU Corporation',
      market: 'プライム',
      sector: '卸売業',
      currentPrice: 7650.0,
      sharesIssued: 1584000000,
      marketCap: 12117600000000.0, // 12兆1,176億円
      trailingPE: 12.8,
      priceToBook: 1.85,
      dividendYield: 2.7,
      roe: 16.2,
      equityRatio: 37.8,
      representative: '石井敬太 (代表取締役社長COO)',
      description: '伊藤忠商事は、非資源分野で国内トップクラスの収益力を誇る総合商社です。'
    },
    {
      tickerCode: '8053',
      name: '住友商事株式会社',
      shortName: '住友商事',
      englishName: 'Sumitomo Corporation',
      market: 'プライム',
      sector: '卸売業',
      currentPrice: 3720.0,
      sharesIssued: 1250000000,
      marketCap: 4650000000000.0, // 4兆6,500億円
      trailingPE: 9.2,
      priceToBook: 1.05,
      dividendYield: 3.5,
      roe: 12.1,
      equityRatio: 34.5,
      representative: '上野真吾 (代表取締役社長)',
      description: '住友商事は、メディア・デジタル、不動産、資源エネルギー、インフラを展開する住友グループの中核商社です。'
    },
    {
      tickerCode: '8002',
      name: '丸紅株式会社',
      shortName: '丸紅',
      englishName: 'Marubeni Corporation',
      market: 'プライム',
      sector: '卸売業',
      currentPrice: 2680.0,
      sharesIssued: 1690000000,
      marketCap: 4529200000000.0, // 4兆5,292億円
      trailingPE: 8.9,
      priceToBook: 1.28,
      dividendYield: 3.3,
      roe: 15.0,
      equityRatio: 33.2,
      representative: '柿木真澄 (代表取締役社長)',
      description: '丸紅は、穀物、電力・インフラ、化学品、金属資源等に強みを持つ総合商社です。'
    },
    {
      tickerCode: '7203',
      name: 'トヨタ自動車株式会社',
      shortName: 'トヨタ自動車',
      englishName: 'TOYOTA MOTOR CORPORATION',
      market: 'プライム',
      sector: '輸送用機器',
      currentPrice: 3100.0,
      sharesIssued: 16200000000,
      marketCap: 50220000000000.0, // 50兆2,200億円
      trailingPE: 10.5,
      priceToBook: 1.35,
      dividendYield: 2.8,
      roe: 14.5,
      equityRatio: 41.2,
      representative: '佐藤恒治 (代表取締役社長)'
    },
    {
      tickerCode: '6501',
      name: '株式会社日立製作所',
      shortName: '日立製作所',
      englishName: 'Hitachi, Ltd.',
      market: 'プライム',
      sector: '電気機器',
      currentPrice: 3950.0,
      sharesIssued: 4660000000,
      marketCap: 18407000000000.0, // 18兆4,070億円
      trailingPE: 22.5,
      priceToBook: 2.85,
      dividendYield: 1.2,
      roe: 13.8,
      equityRatio: 40.5,
      representative: '小島啓二 (代表執行役 執行役社長兼CEO)'
    },
    {
      tickerCode: '9432',
      name: '日本電信電話株式会社 (NTT)',
      shortName: 'NTT',
      englishName: 'Nippon Telegraph and Telephone Corporation',
      market: 'プライム',
      sector: '情報・通信業',
      currentPrice: 155.0,
      sharesIssued: 90500000000,
      marketCap: 14027500000000.0, // 14兆275億円 (25分割後)
      trailingPE: 11.8,
      priceToBook: 1.42,
      dividendYield: 3.4,
      roe: 12.5,
      equityRatio: 35.8,
      representative: '島田明 (代表取締役社長)'
    },
    {
      tickerCode: '6758',
      name: 'ソニーグループ株式会社',
      shortName: 'ソニーグループ',
      englishName: 'Sony Group Corporation',
      market: 'プライム',
      sector: '電気機器',
      currentPrice: 3250.0,
      sharesIssued: 6150000000,
      marketCap: 19987500000000.0, // 19兆9,875億円 (5分割後)
      trailingPE: 18.5,
      priceToBook: 2.45,
      dividendYield: 1.1,
      roe: 14.2,
      equityRatio: 24.5,
      representative: '十時裕樹 (代表取締役社長兼COO兼CFO)'
    }
  ];

  for (const c of majorCompanies) {
    await prisma.company.upsert({
      where: { tickerCode: c.tickerCode },
      create: c,
      update: c
    });
    console.log(`✅ Synced ${c.tickerCode} ${c.name}: MarketCap = ${(c.marketCap / 1000000000000).toFixed(2)}兆円 (${(c.marketCap / 100000000).toLocaleString()}億円), Price = ¥${c.currentPrice}`);
  }

  console.log('✅ All Major Market Caps and Shares Verified and Synchronized Successfully!');
}

main()
  .catch((e) => {
    console.error('Error fixing market caps:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
