import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Koei Tecmo Holdings (3635)...');

  // コーエーテクモHD (3635)
  await prisma.company.upsert({
    where: { tickerCode: '3635' },
    update: {
      name: 'コーエーテクモホールディングス株式会社',
      shortName: 'コーエーテクモ',
      sector: '情報・通信業',
      market: 'プライム',
      currentPrice: 1540.0,
      marketCap: 4850.0,
      trailingPE: 14.5,
      priceToBook: 2.8,
      dividendYield: 3.25,
      roe: 19.8,
      equityRatio: 82.5,
      headquarters: '神奈川県横浜市西区みなとみらい1-1-1',
      representative: '代表取締役社長 襟川 陽一',
      establishedYear: 1978,
      listingDate: '2009年4月',
      employeesCount: '2,250名 [連結]',
      avgSalary: 752.0,
      avgAge: 36.8,
      mainBanks: '三菱UFJ銀行、三井住友銀行',
      foreignHoldingRatio: 28.5,
      floatingSharesRatio: 25.0,
      shikihoHeadline: '【最高益圏】定番IPのグローバル展開と襟川会長の有価証券運用益が寄与し経常利益率50%超を維持。',
      shikihoOutlook: '『信長の野望』『三國志』『アトリエ』等の主力IPがSteam・マルチプラットフォームで好調。スマホゲーム受託や海外IPライセンス許諾も高マージンを牽引。',
      shikihoMaterial: '1,300億円超の余裕資金を活用した有価証券運用で年間100億〜150億円超の営業外収益を安定創出。株主還元性向50%を公約。',
      businessSegments: JSON.stringify([
        { name: 'エンタテインメント (ゲーム・スマホ)', ratio: 92.5 },
        { name: 'アミューズメント・パチンコ等', ratio: 4.5 },
        { name: '不動産・その他', ratio: 3.0 }
      ]),
      description: '『信長の野望』『三國志』『無双』シリーズ等で知られるゲーム大手。自社IPのグローバル展開・マルチプラットフォーム展開に加え、襟川恵子会長による卓越した有価証券運用（営業外収益140億円超）により経常利益率50%超という驚異的収益力を誇る。'
    },
    create: {
      tickerCode: '3635',
      name: 'コーエーテクモホールディングス株式会社',
      shortName: 'コーエーテクモ',
      sector: '情報・通信業',
      market: 'プライム',
      currentPrice: 1540.0,
      marketCap: 4850.0,
      trailingPE: 14.5,
      priceToBook: 2.8,
      dividendYield: 3.25,
      roe: 19.8,
      equityRatio: 82.5,
      headquarters: '神奈川県横浜市西区みなとみらい1-1-1',
      representative: '代表取締役社長 襟川 陽一',
      establishedYear: 1978,
      listingDate: '2009年4月',
      employeesCount: '2,250名 [連結]',
      avgSalary: 752.0,
      avgAge: 36.8,
      mainBanks: '三菱UFJ銀行、三井住友銀行',
      foreignHoldingRatio: 28.5,
      floatingSharesRatio: 25.0,
      shikihoHeadline: '【最高益圏】定番IPのグローバル展開と襟川会長の有価証券運用益が寄与し経常利益率50%超を維持。',
      shikihoOutlook: '『信長の野望』『三國志』『アトリエ』等の主力IPがSteam・マルチプラットフォームで好調。スマホゲーム受託や海外IPライセンス許諾も高マージンを牽引。',
      shikihoMaterial: '1,300億円超の余裕資金を活用した有価証券運用で年間100億〜150億円超の営業外収益を安定創出。株主還元性向50%を公約。',
      businessSegments: JSON.stringify([
        { name: 'エンタテインメント (ゲーム・スマホ)', ratio: 92.5 },
        { name: 'アミューズメント・パチンコ等', ratio: 4.5 },
        { name: '不動産・その他', ratio: 3.0 }
      ]),
      description: '『信長の野望』『三國志』『無双』シリーズ等で知られるゲーム大手。自社IPのグローバル展開・マルチプラットフォーム展開に加え、襟川恵子会長による卓越した有価証券運用（営業外収益140億円超）により経常利益率50%超という驚異的収益力を誇る。'
    }
  });

  // 10年PL
  const plData = [
    { fiscalYear: 2017, periodType: 'FY', periodEnd: '2017-03-31', revenue: 37025, operatingIncome: 8750, netIncome: 11520, totalAssets: 125000, netAssets: 98000, eps: 45.5, bps: 450.0, dividendPerShare: 23.0 },
    { fiscalYear: 2018, periodType: 'FY', periodEnd: '2018-03-31', revenue: 38945, operatingIncome: 11710, netIncome: 13050, totalAssets: 138000, netAssets: 109000, eps: 51.5, bps: 495.0, dividendPerShare: 26.0 },
    { fiscalYear: 2019, periodType: 'FY', periodEnd: '2019-03-31', revenue: 38968, operatingIncome: 12090, netIncome: 13640, totalAssets: 148000, netAssets: 120000, eps: 53.8, bps: 535.0, dividendPerShare: 28.0 },
    { fiscalYear: 2020, periodType: 'FY', periodEnd: '2020-03-31', revenue: 42617, operatingIncome: 14930, netIncome: 15310, totalAssets: 165000, netAssets: 135000, eps: 60.4, bps: 590.0, dividendPerShare: 32.0 },
    { fiscalYear: 2021, periodType: 'FY', periodEnd: '2021-03-31', revenue: 60370, operatingIncome: 24380, netIncome: 29540, totalAssets: 195000, netAssets: 162000, eps: 116.5, bps: 720.0, dividendPerShare: 58.0 },
    { fiscalYear: 2022, periodType: 'FY', periodEnd: '2022-03-31', revenue: 72740, operatingIncome: 34520, netIncome: 35370, totalAssets: 218000, netAssets: 185000, eps: 111.2, bps: 680.0, dividendPerShare: 56.0 },
    { fiscalYear: 2023, periodType: 'FY', periodEnd: '2023-03-31', revenue: 78417, operatingIncome: 39112, netIncome: 30930, totalAssets: 232000, netAssets: 198000, eps: 96.8, bps: 650.0, dividendPerShare: 50.0 },
    { fiscalYear: 2024, periodType: 'FY', periodEnd: '2024-03-31', revenue: 84584, operatingIncome: 28478, netIncome: 33500, totalAssets: 254000, netAssets: 215000, eps: 106.2, bps: 710.0, dividendPerShare: 50.0 }
  ];

  for (const f of plData) {
    await prisma.financialReport.upsert({
      where: {
        tickerCode_fiscalYear_periodType: {
          tickerCode: '3635',
          fiscalYear: f.fiscalYear,
          periodType: f.periodType
        }
      },
      update: f,
      create: { tickerCode: '3635', ...f }
    });
  }

  console.log('Seeding Koei Tecmo complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });