import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Clearing old data...');
  await prisma.irDocumentSummary.deleteMany();
  await prisma.unlistedShareholder.deleteMany();
  await prisma.unlistedCapitalEvent.deleteMany();
  await prisma.officialGazetteReport.deleteMany();
  await prisma.unlistedCompany.deleteMany();
  await prisma.disclosureDocument.deleteMany();
  await prisma.fundraising.deleteMany();
  await prisma.largeHoldingReport.deleteMany();
  await prisma.majorShareholder.deleteMany();
  await prisma.financialReport.deleteMany();
  await prisma.stockPrice.deleteMany();
  await prisma.company.deleteMany();

  console.log('1. Seeding Listed Companies with Rich IR Summaries (有報・決算短信 AI要約)...');
  
  // 1. トヨタ自動車 (7203)
  await prisma.company.create({
    data: {
      tickerCode: '7203',
      name: 'トヨタ自動車株式会社',
      shortName: 'トヨタ',
      sector: '輸送用機器',
      market: '東証プライム',
      establishedYear: 1937,
      listingDate: '1949年5月',
      headquarters: '愛知県豊田市トヨタ町1番地',
      representative: '佐藤 恒治 (代表取締役社長)',
      employeesCount: '375,235名 [連結]',
      avgAge: 40.4,
      avgSalary: 895.4,
      mainBanks: '三井住友銀行、三菱UFJ銀行、みずほ銀行',
      shikihoHeadline: '【最高益】HV世界快走、円安追い風で純利益5兆円迫る',
      shikihoOutlook: '主力HVが北米・欧州・日本で好調持続。認証問題の影響を生産挽回で吸収。',
      businessSegments: JSON.stringify([{ name: '自動車事業', ratio: 89.5 }, { name: '金融事業', ratio: 6.8 }, { name: 'その他', ratio: 3.7 }]),
      overseasRatio: 78.2,
      currentPrice: 3132.0,
      priceChange: 45.0,
      priceChangePct: 1.46,
      marketCap: 370861.0,
      trailingPE: 8.91,
      priceToBook: 0.99,
      roe: 12.40,
      dividendYield: 3.19,
      equityRatio: 41.2,
      financials: {
        create: [
          { fiscalYear: 2022, periodType: 'FY', periodEnd: '2022-03-31', revenue: 31379507, operatingIncome: 2995697, ordinaryIncome: 3990532, netIncome: 2850110, operatingMargin: 9.55, eps: 205.2, bps: 1980.5, totalAssets: 67688771, totalLiabilities: 40580000, netAssets: 27108771, equityRatio: 38.6 },
          { fiscalYear: 2023, periodType: 'FY', periodEnd: '2023-03-31', revenue: 37154298, operatingIncome: 2725025, ordinaryIncome: 3668894, netIncome: 2451318, operatingMargin: 7.33, eps: 179.5, bps: 2185.0, totalAssets: 74303100, totalLiabilities: 45100000, netAssets: 29203100, equityRatio: 37.9 },
          { fiscalYear: 2024, periodType: 'FY', periodEnd: '2024-03-31', revenue: 45095325, operatingIncome: 5352934, ordinaryIncome: 6964952, netIncome: 4944933, operatingMargin: 11.87, eps: 365.9, bps: 2680.4, totalAssets: 87810000, totalLiabilities: 51200000, netAssets: 36610000, equityRatio: 40.2 }
        ]
      },
      shareholders: {
        create: [
          { rank: 1, periodEnd: '2024-03-31', shareholderName: '日本マスタートラスト信託銀行株式会社(信託口)', sharesHeld: 1912450000, holdingRatio: 14.28, changeNote: '+0.35%' },
          { rank: 2, periodEnd: '2024-03-31', shareholderName: '株式会社日本カストディ銀行(信託口)', sharesHeld: 843210000, holdingRatio: 6.30, changeNote: '-0.12%' }
        ]
      },
      irSummaries: {
        create: [
          {
            period: '2024年3月期 有価証券報告書 (第120期)',
            docType: '有価証券報告書',
            discloseDate: '2024-06-25',
            executiveSummary: '連結売上高45兆953億円（前年比21.4%増）、営業利益5兆3,529億円（同96.4%増）と過去最高益を達成。ハイブリッド車（HEV）の世界的人気拡大と円安為替効果、高付加価値SUV・LEXUSの販売構成比改善が大幅増益を牽引。',
            keyDrivers: '① ハイブリッド車の世界販売が359万台（前年比31.0%増）と過去最高を更新。\n② 為替効果が営業利益を約6,850億円押し上げ（1ドル=144円、1ユーロ=157円）。\n③ 半導体供給制約の緩和に伴う生産稼働率の改善とLEXUS・クラウン等の高採算車種の伸長。',
            futureOutlook: '2025年3月期の連結営業利益予想は4兆3,000億円（前年比19.7%減）を見込む。認証問題を受けた一時的な生産調整や、「人への投資」「知能化・電動化などの未来への投資（年間1.7兆円）」を前倒しで実行する計画。想定為替レートは1ドル=145円。',
            businessRisks: '① 型式指定申請における認証プロセスの見直しとガバナンス改革（国交省指示への対応）。\n② 世界的なEV（電気自動車）シフトの減速と地域別需要の二極化リスク。\n③ 原材料・物流コストのインフレ高止まりおよび地政学リスクに伴うサプライチェーン分断。',
            capexAndGrowth: '① 次世代全固体電池の実用化（2027-2028年ターゲット）に向けたパイロットライン建設。\n② ギガキャスト（一体成型技術）の量産導入とソフトウェア定義車両（SDV）「Arene OS」の開発加速。\n③ 自己株式取得（上限1兆円）および配当性向30%水準の維持による積極的な株主還元方針。',
            rawUrl: 'https://disclosure2.edinet-fsa.go.jp/'
          },
          {
            period: '2025年3月期 第2四半期 決算短信',
            docType: '決算短信',
            discloseDate: '2024-11-06',
            executiveSummary: '中間連結売上高23兆2,824億円（前年同期比5.9%増）、営業利益2兆4,642億円（同3.7%減）。北米市場でのHEV需要が極めて好調に推移し売上高は過去最高を更新。認証問題による国内生産一時停止の影響を北米・欧州の増益で下支え。',
            keyDrivers: '① 北米でのHEV販売比率が大幅上昇し、車両1台あたり収益性が改善。\n② 認証問題に伴う国内工場の一時停止による生産減少影響（△約1,000億円）。\n③ 仕入先支援や人件費改善、次世代モビリティソフトウェア開発費用の増加。',
            futureOutlook: '通期業績予想は営業利益4兆3,000億円を据え置き。下期の生産挽回と高採算グレードの供給優先により計画達成を目指す。',
            businessRisks: '米国新政権の通商・関税政策の動向、および中国市場における現地EVメーカーとの価格競争激化。',
            capexAndGrowth: 'ノースカロライナ車載用電池工場の立ち上げ加速。年間設備投資計画2兆1,500億円を継続。',
            rawUrl: 'https://www.release.tdnet.info/'
          }
        ]
      }
    }
  });

  // 2. 任天堂 (7974)
  await prisma.company.create({
    data: {
      tickerCode: '7974',
      name: '任天堂株式会社',
      shortName: '任天堂',
      sector: 'その他製品',
      market: '東証プライム',
      establishedYear: 1889,
      listingDate: '1962年1月',
      headquarters: '京都府京都市南区上鳥羽鉾立町11番地1',
      representative: '古川 俊太郎 (代表取締役社長)',
      employeesCount: '7,724名 [連結]',
      avgAge: 40.2,
      avgSalary: 1004.8,
      shikihoHeadline: '【次世代機】Switch後継機発表へ、世界的IPビジネス拡大',
      shikihoOutlook: 'Switchハードは発売8年目で減速も、「マリオ」「ゼルダ」等のIP収入が急成長。',
      businessSegments: JSON.stringify([{ name: '専用ゲーム機', ratio: 94.2 }, { name: 'IP・その他', ratio: 5.8 }]),
      overseasRatio: 77.4,
      currentPrice: 8350.0,
      priceChange: -60.0,
      priceChangePct: -0.71,
      marketCap: 108400.0,
      trailingPE: 22.1,
      priceToBook: 3.45,
      roe: 18.2,
      dividendYield: 2.45,
      equityRatio: 78.4,
      financials: {
        create: [
          { fiscalYear: 2024, periodType: 'FY', periodEnd: '2024-03-31', revenue: 1671865, operatingIncome: 528900, netIncome: 490600, totalAssets: 3205000, totalLiabilities: 690000, netAssets: 2515000, equityRatio: 78.4 }
        ]
      },
      irSummaries: {
        create: [
          {
            period: '2024年3月期 有価証券報告書 (第84期)',
            docType: '有価証券報告書',
            discloseDate: '2024-06-28',
            executiveSummary: '連結売上高1兆6,718億円（前年比4.4%増）、営業利益5,289億円（同4.9%増）、純利益4,906億円（同13.4%増）。Switch発売8年目ながら『ゼルダの伝説 ティアーズ オブ ザ キングダム』や映画『ザ・スーパーマリオブラザーズ・ムービー』の世界的ヒットにより高水準の収益を維持。',
            keyDrivers: '① 『ゼルダの伝説 TotK』が累計2,061万本、『マリオブラザーズ ワンダー』が1,344万本と強力な自社IPソフトが牽引。\n② 映画マリオの世界興行収入13.6億ドル突破に伴うIP関連・モバイル収入が前年比81.6%増の927億円へ急拡大。\n③ 円安為替効果による海外売上・金融収益の押し上げ。',
            futureOutlook: '2025年3月期はSwitchハードの経年に伴い売上高1兆3,500億円、営業利益4,000億円への減収減益を見込む。なお、今期中に「Nintendo Switchの後継機種」に関する公式アナウンスを実施する方針を明記。',
            businessRisks: '① ハードウェア端境期における収益ボラティリティの上昇。\n② 半導体部材コストの変動および次世代機立ち上げに伴う製造原価・在庫リスク。\n③ 世界的なエンターテインメント・可処分時間の奪い合い（スマホ・ストリーミング競合）。',
            capexAndGrowth: '① 2.5兆円超の純資産と実質無借金経営を活かした次世代プラットフォーム開発への集中投資。\n② 京都本社隣接地への開発新棟建設およびユニバーサル・スタジオ（USJ・米国）での「ドンキーコング・カントリー」等のテーマパークIP展開。\n③ 配当性向33%以上（または1株配当方針）に基づく安定還元。',
            rawUrl: 'https://disclosure2.edinet-fsa.go.jp/'
          }
        ]
      }
    }
  });

  console.log('2. Seeding Unlisted Companies...');
  const unlistedList = [
    {
      corporateNumber: '6010401103759',
      slug: 'smarthr',
      name: '株式会社SmartHR',
      shortName: 'SmartHR',
      industry: 'クラウド人事労務 / SaaS',
      establishedYear: 2013,
      location: '東京都港区六本木3-2-1',
      representative: '芹澤 雅人 (代表取締役CEO)',
      employeesCount: '1,250名',
      capital: 100.0,
      isStartup: true,
      latestPeriodEnd: '2023-12-31',
      latestNetAssets: 21540.0,
      latestNetIncome: -2850.0,
      latestTotalAssets: 34200.0,
      gazettes: [
        { fiscalPeriod: 11, periodEnd: '2023-12-31', gazetteDate: '2024-04-18', gazetteIssue: '号外第90号 80頁', totalAssets: 34200.0, totalLiabilities: 12660.0, netAssets: 21540.0, capitalStock: 100.0, capitalSurplus: 35700.0, retainedEarnings: -14260.0, netIncome: -2850.0 }
      ]
    },
    {
      corporateNumber: '9010401140306',
      slug: 'layerx',
      name: '株式会社LayerX',
      shortName: 'LayerX',
      industry: 'Fintech / AI / 経費SaaS',
      establishedYear: 2018,
      location: '東京都中央区日本橋堀留町1-9-8',
      representative: '福島 良典 (代表取締役CEO)',
      employeesCount: '350名',
      capital: 100.0,
      isStartup: true,
      latestPeriodEnd: '2024-03-31',
      latestNetAssets: 11850.0,
      latestNetIncome: -1650.0,
      latestTotalAssets: 15400.0,
      gazettes: [
        { fiscalPeriod: 6, periodEnd: '2024-03-31', gazetteDate: '2024-07-12', gazetteIssue: '号外第152号 60頁', totalAssets: 15400.0, totalLiabilities: 3550.0, netAssets: 11850.0, capitalStock: 100.0, capitalSurplus: 16700.0, retainedEarnings: -4950.0, netIncome: -1650.0 }
      ]
    },
    {
      corporateNumber: '7120001138859',
      slug: 'suntory-hd',
      name: 'サントリーホールディングス株式会社',
      shortName: 'サントリーHD',
      industry: '飲料・食品・酒類',
      establishedYear: 1899,
      location: '大阪府大阪市北区堂島浜2-1-40',
      representative: '鳥井 信宏 (代表取締役社長)',
      employeesCount: '41,500名 [連結]',
      capital: 70000.0,
      isStartup: false,
      latestPeriodEnd: '2023-12-31',
      latestNetAssets: 1895000.0,
      latestNetIncome: 142000.0,
      latestTotalAssets: 5240000.0,
      gazettes: [
        { fiscalPeriod: 15, periodEnd: '2023-12-31', gazetteDate: '2024-04-10', gazetteIssue: '号外第82号 110頁', totalAssets: 5240000.0, totalLiabilities: 3345000.0, netAssets: 1895000.0, capitalStock: 70000.0, capitalSurplus: 120000.0, retainedEarnings: 1705000.0, netIncome: 142000.0 }
      ]
    }
  ];

  for (const item of unlistedList) {
    const { gazettes, ...companyData } = item;
    await prisma.unlistedCompany.create({
      data: {
        ...companyData,
        gazetteReports: {
          create: gazettes || []
        }
      }
    });
  }

  // 株価ローソク足
  const configs = [
    { ticker: '7203', base: 3132, vol: 0.015 },
    { ticker: '7974', base: 8350, vol: 0.014 },
  ];
  const endDate = new Date('2024-06-28');
  for (const cfg of configs) {
    let price = cfg.base * 0.85;
    for (let i = 90; i >= 0; i--) {
      const d = new Date(endDate);
      d.setDate(d.getDate() - Math.round(i * 1.45));
      if (d.getDay() === 0 || d.getDay() === 6) continue;
      const dateStr = d.toISOString().split('T')[0];
      const change = (Math.random() - 0.47) * cfg.vol;
      const open = Math.round(price);
      const close = Math.round(price * (1 + change));
      const high = Math.round(Math.max(open, close) * (1 + Math.random() * 0.012));
      const low = Math.round(Math.min(open, close) * (1 - Math.random() * 0.012));
      const volume = Math.round((Math.random() * 1500000 + 800000) * (cfg.base < 10000 ? 4 : 1));
      price = close;
      await prisma.stockPrice.upsert({
        where: { tickerCode_date: { tickerCode: cfg.ticker, date: dateStr } },
        update: { open, high, low, close, volume, adjustedClose: close },
        create: { tickerCode: cfg.ticker, date: dateStr, open, high, low, close, volume, adjustedClose: close },
      });
    }
  }

  console.log('Seed with IR Document Summaries executed successfully!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });