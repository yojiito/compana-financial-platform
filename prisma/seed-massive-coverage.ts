import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Seeding Megacaps & Unicorns into Database...');

  // ==========================================
  // 1. 上場企業 (ソニーG, キーエンス, SBG, ファストリ)
  // ==========================================
  
  // 1-1. ソニーグループ (6758)
  const sony = await prisma.company.upsert({
    where: { tickerCode: '6758' },
    update: {
      marketCap: 168500.0,
      currentPrice: 2890.0,
      trailingPE: 17.5,
      priceToBook: 2.15,
      dividendYield: 1.05,
      roe: 14.8,
      equityRatio: 22.9,
    },
    create: {
      tickerCode: '6758',
      name: 'ソニーグループ株式会社',
      shortName: 'ソニーG',
      sector: '電気機器',
      market: '東証プライム',
      marketCap: 168500.0,
      currentPrice: 2890.0,
      trailingPE: 17.5,
      priceToBook: 2.15,
      dividendYield: 1.05,
      roe: 14.8,
      equityRatio: 22.9,
      priceChange: 35.0,
      priceChangePct: 1.22,
      establishedYear: 1946,
      listingDate: '1958年12月',
      representative: '十時 裕樹 (代表取締役社長COO兼CFO)',
      headquarters: '東京都港区港南1-7-1',
      employeesCount: '113,000名 [連結]',
      avgSalary: 1100.0,
      avgAge: 43.1,
      mainBanks: '三井住友銀行、三菱UFJ銀行、みずほ銀行',
      foreignHoldingRatio: 56.4,
      floatingSharesRatio: 22.1,
      shikihoHeadline: '【エンタメ最高益】ゲーム・音楽・映画が好調、CMOSセンサー牽引',
      shikihoOutlook: 'PS5ハード普及拡大に伴うサードパーティソフト課金増。アニメ・音楽出版の世界配信が利益牽引。車載・スマホ向けCMOSイメージセンサーの歩留まり改善で増益加速。',
      shikihoMaterial: '金融事業（ソニーフィナンシャルグループ）の2025年10月パーシャル・スピンオフ上場に向け準備進行。エンタメ×テクノロジーに経営資源を集中投下。',
      businessSegments: JSON.stringify([
        { name: 'ゲーム＆ネットワークサービス (G&NS)', ratio: 32.4 },
        { name: 'イメージング＆センシング (I&SS: CMOS)', ratio: 15.2 },
        { name: 'エンタテインメント (音楽・映画・アニメ)', ratio: 24.8 },
        { name: 'エンタテインメント・テクノロジー (ET&S)', ratio: 18.6 },
        { name: '金融・その他サービス', ratio: 9.0 }
      ]),
    }
  });

  const sonyFins = [
    { fiscalYear: 2015, periodType: 'FY', periodEnd: '2015-03-31', revenue: 8215880, operatingIncome: 68548, netIncome: -125980, totalAssets: 15834300, netAssets: 2319300, eps: -108.5, bps: 1980.0, dividendPerShare: 10.0 },
    { fiscalYear: 2016, periodType: 'FY', periodEnd: '2016-03-31', revenue: 8105712, operatingIncome: 294198, netIncome: 147791, totalAssets: 16673400, netAssets: 2632400, eps: 117.4, bps: 2090.0, dividendPerShare: 20.0 },
    { fiscalYear: 2017, periodType: 'FY', periodEnd: '2017-03-31', revenue: 7603250, operatingIncome: 288702, netIncome: 73289, totalAssets: 17697700, netAssets: 2766700, eps: 58.0, bps: 2190.0, dividendPerShare: 20.0 },
    { fiscalYear: 2018, periodType: 'FY', periodEnd: '2018-03-31', revenue: 8543982, operatingIncome: 734860, netIncome: 490794, totalAssets: 19065600, netAssets: 3433600, eps: 388.3, bps: 2720.0, dividendPerShare: 27.5 },
    { fiscalYear: 2019, periodType: 'FY', periodEnd: '2019-03-31', revenue: 8665687, operatingIncome: 894191, netIncome: 916271, totalAssets: 20981600, netAssets: 4044600, eps: 728.8, bps: 3200.0, dividendPerShare: 35.0 },
    { fiscalYear: 2020, periodType: 'FY', periodEnd: '2020-03-31', revenue: 8259885, operatingIncome: 845459, netIncome: 582191, totalAssets: 23039600, netAssets: 4852600, eps: 469.2, bps: 3840.0, dividendPerShare: 45.0 },
    { fiscalYear: 2021, periodType: 'FY', periodEnd: '2021-03-31', revenue: 8999360, operatingIncome: 971865, netIncome: 1171776, totalAssets: 25765900, netAssets: 5627900, eps: 945.7, bps: 4460.0, dividendPerShare: 55.0 },
    { fiscalYear: 2022, periodType: 'FY', periodEnd: '2022-03-31', revenue: 9921513, operatingIncome: 1202339, netIncome: 882178, totalAssets: 28987100, netAssets: 6292100, eps: 712.4, bps: 5080.0, dividendPerShare: 65.0 },
    { fiscalYear: 2023, periodType: 'FY', periodEnd: '2023-03-31', revenue: 11539837, operatingIncome: 1208206, netIncome: 937126, totalAssets: 31258600, netAssets: 6918600, eps: 757.2, bps: 5580.0, dividendPerShare: 80.0 },
    { fiscalYear: 2024, periodType: 'FY', periodEnd: '2024-03-31', revenue: 13020769, operatingIncome: 1208831, netIncome: 970566, totalAssets: 33742100, netAssets: 7721100, eps: 785.4, bps: 6240.0, dividendPerShare: 90.0 }
  ];
  for (const f of sonyFins) {
    await prisma.financialReport.upsert({
      where: { tickerCode_fiscalYear_periodType: { tickerCode: '6758', fiscalYear: f.fiscalYear, periodType: f.periodType } },
      update: f,
      create: { tickerCode: '6758', ...f }
    });
  }

  // 1-2. キーエンス (6861)
  await prisma.company.upsert({
    where: { tickerCode: '6861' },
    update: {
      marketCap: 172000.0,
      currentPrice: 70850.0,
      trailingPE: 42.5,
      priceToBook: 6.85,
      dividendYield: 0.55,
      roe: 13.8,
      equityRatio: 96.0,
    },
    create: {
      tickerCode: '6861',
      name: '株式会社キーエンス',
      shortName: 'キーエンス',
      sector: '精密機器',
      market: '東証プライム',
      marketCap: 172000.0,
      currentPrice: 70850.0,
      trailingPE: 42.5,
      priceToBook: 6.85,
      dividendYield: 0.55,
      roe: 13.8,
      equityRatio: 96.0,
      priceChange: 450.0,
      priceChangePct: 0.64,
      establishedYear: 1974,
      listingDate: '1987年12月',
      representative: '中田 有 (代表取締役社長)',
      headquarters: '大阪府大阪市東淀川区東中島1-3-14',
      employeesCount: '10,500名 [連結]',
      avgSalary: 2279.0,
      avgAge: 35.8,
      mainBanks: '三菱UFJ銀行、三井住友銀行',
      foreignHoldingRatio: 52.1,
      floatingSharesRatio: 18.5,
      shikihoHeadline: '【利益率50%超】ファブレス＆直販で独走、世界全地域でFA需要拡大',
      shikihoOutlook: 'EV電池・半導体・物流自動化向けセンサーが国内外で高成長。顧客密着の直販コンサルティング営業体制により驚異の営業利益率51%を継続。',
      shikihoMaterial: '自己資本比率95%超、現預金・有価証券で2兆円超を保有する超鉄壁の財務基盤。海外売上比率が60%を突破しグローバル成長が加速。',
      businessSegments: JSON.stringify([
        { name: 'FA用センサ・測定器・計測制御機器', ratio: 62.5 },
        { name: '画像処理・レーザマーカ・顕微鏡', ratio: 25.8 },
        { name: 'コードリーダ・産業用インクジェット', ratio: 11.7 }
      ]),
    }
  });

  const keyenceFins = [
    { fiscalYear: 2015, periodType: 'FY', periodEnd: '2015-03-20', revenue: 334000, operatingIncome: 175600, netIncome: 115200, totalAssets: 1050000, netAssets: 1002000, eps: 950.0, bps: 8250.0, dividendPerShare: 100.0 },
    { fiscalYear: 2016, periodType: 'FY', periodEnd: '2016-03-20', revenue: 379000, operatingIncome: 203800, netIncome: 133500, totalAssets: 1180000, netAssets: 1128000, eps: 1100.0, bps: 9280.0, dividendPerShare: 100.0 },
    { fiscalYear: 2017, periodType: 'FY', periodEnd: '2017-03-20', revenue: 434000, operatingIncome: 236200, netIncome: 156800, totalAssets: 1320000, netAssets: 1265000, eps: 1290.0, bps: 10400.0, dividendPerShare: 150.0 },
    { fiscalYear: 2018, periodType: 'FY', periodEnd: '2018-03-20', revenue: 526800, operatingIncome: 292800, netIncome: 210600, totalAssets: 1540000, netAssets: 1478000, eps: 1730.0, bps: 12160.0, dividendPerShare: 200.0 },
    { fiscalYear: 2019, periodType: 'FY', periodEnd: '2019-03-20', revenue: 587000, operatingIncome: 317800, netIncome: 226100, totalAssets: 1780000, netAssets: 1710000, eps: 1860.0, bps: 14070.0, dividendPerShare: 200.0 },
    { fiscalYear: 2020, periodType: 'FY', periodEnd: '2020-03-20', revenue: 551800, operatingIncome: 277600, netIncome: 198100, totalAssets: 1920000, netAssets: 1845000, eps: 1630.0, bps: 15180.0, dividendPerShare: 200.0 },
    { fiscalYear: 2021, periodType: 'FY', periodEnd: '2021-03-20', revenue: 538100, operatingIncome: 276800, netIncome: 197300, totalAssets: 2120000, netAssets: 2040000, eps: 1624.0, bps: 16790.0, dividendPerShare: 200.0 },
    { fiscalYear: 2022, periodType: 'FY', periodEnd: '2022-03-20', revenue: 755100, operatingIncome: 418000, netIncome: 303300, totalAssets: 2510000, netAssets: 2412000, eps: 2496.0, bps: 19850.0, dividendPerShare: 300.0 },
    { fiscalYear: 2023, periodType: 'FY', periodEnd: '2023-03-20', revenue: 922400, operatingIncome: 498900, netIncome: 362900, totalAssets: 2780000, netAssets: 2670000, eps: 2986.0, bps: 21970.0, dividendPerShare: 350.0 },
    { fiscalYear: 2024, periodType: 'FY', periodEnd: '2024-03-20', revenue: 967288, operatingIncome: 495034, netIncome: 369634, totalAssets: 3105000, netAssets: 2980000, eps: 3042.0, bps: 24520.0, dividendPerShare: 400.0 }
  ];
  for (const f of keyenceFins) {
    await prisma.financialReport.upsert({
      where: { tickerCode_fiscalYear_periodType: { tickerCode: '6861', fiscalYear: f.fiscalYear, periodType: f.periodType } },
      update: f,
      create: { tickerCode: '6861', ...f }
    });
  }

  // 1-3. ソフトバンクグループ (9984)
  await prisma.company.upsert({
    where: { tickerCode: '9984' },
    update: {
      marketCap: 125000.0,
      currentPrice: 8540.0,
      trailingPE: 12.8,
      priceToBook: 1.18,
      dividendYield: 0.52,
      roe: 8.5,
      equityRatio: 24.3,
    },
    create: {
      tickerCode: '9984',
      name: 'ソフトバンクグループ株式会社',
      shortName: 'ソフトバンクG',
      sector: '情報・通信業',
      market: '東証プライム',
      marketCap: 125000.0,
      currentPrice: 8540.0,
      trailingPE: 12.8,
      priceToBook: 1.18,
      dividendYield: 0.52,
      roe: 8.5,
      equityRatio: 24.3,
      priceChange: -60.0,
      priceChangePct: -0.70,
      establishedYear: 1981,
      listingDate: '1994年7月',
      representative: '孫 正義 (代表取締役会長兼社長)',
      headquarters: '東京都港区海岸1-7-1 東京ポートシティ竹芝',
      employeesCount: '63,000名 [連結]',
      avgSalary: 1450.0,
      avgAge: 40.2,
      mainBanks: 'みずほ銀行、三井住友銀行、三菱UFJ銀行',
      foreignHoldingRatio: 42.5,
      floatingSharesRatio: 28.2,
      shikihoHeadline: '【AI革命へ大攻勢】Arm株高でNAV急増、ASI半導体・データセンター投資',
      shikihoOutlook: '英Arm（株式90%保有）の時価総額拡大がNAV（保有株式価値）を押し上げ。ソフトバンク・ビジョン・ファンド（SVF）の投資先上場やエグジットも回復軌道。',
      shikihoMaterial: '孫社長が提唱する「人工超知能（ASI）」の実現に向け、生成AI向け大規模半導体設計および次世代AIデータセンターに数兆円規模の投資を計画。',
      businessSegments: JSON.stringify([
        { name: 'Arm事業 (半導体アーキテクチャ・IPライセンス)', ratio: 38.5 },
        { name: 'ソフトバンク・ビジョン・ファンド (SVF1/SVF2)', ratio: 32.0 },
        { name: 'ソフトバンク株式会社 (国内通信・Yahoo/LINE)', ratio: 24.5 },
        { name: 'その他・持株会社投資', ratio: 5.0 }
      ]),
    }
  });

  const sbgFins = [
    { fiscalYear: 2015, periodType: 'FY', periodEnd: '2015-03-31', revenue: 8670989, operatingIncome: 982701, netIncome: 668361, totalAssets: 21000000, netAssets: 3800000, eps: 560.0, bps: 3100.0, dividendPerShare: 40.0 },
    { fiscalYear: 2016, periodType: 'FY', periodEnd: '2016-03-31', revenue: 9153549, operatingIncome: 999488, netIncome: 474172, totalAssets: 20700000, netAssets: 3600000, eps: 398.0, bps: 2950.0, dividendPerShare: 41.0 },
    { fiscalYear: 2017, periodType: 'FY', periodEnd: '2017-03-31', revenue: 8901004, operatingIncome: 1025999, netIncome: 1426344, totalAssets: 24600000, netAssets: 4500000, eps: 1300.0, bps: 3800.0, dividendPerShare: 44.0 },
    { fiscalYear: 2018, periodType: 'FY', periodEnd: '2018-03-31', revenue: 9158765, operatingIncome: 1303801, netIncome: 1038977, totalAssets: 31200000, netAssets: 6200000, eps: 960.0, bps: 4700.0, dividendPerShare: 44.0 },
    { fiscalYear: 2019, periodType: 'FY', periodEnd: '2019-03-31', revenue: 9602236, operatingIncome: 2353931, netIncome: 1411199, totalAssets: 36300000, netAssets: 9000000, eps: 1320.0, bps: 6800.0, dividendPerShare: 44.0 },
    { fiscalYear: 2020, periodType: 'FY', periodEnd: '2020-03-31', revenue: 6051280, operatingIncome: -1364600, netIncome: -961576, totalAssets: 37200000, netAssets: 7200000, eps: -900.0, bps: 5200.0, dividendPerShare: 44.0 },
    { fiscalYear: 2021, periodType: 'FY', periodEnd: '2021-03-31', revenue: 5628167, operatingIncome: 2360000, netIncome: 4987962, totalAssets: 45700000, netAssets: 11600000, eps: 2540.0, bps: 7900.0, dividendPerShare: 44.0 },
    { fiscalYear: 2022, periodType: 'FY', periodEnd: '2022-03-31', revenue: 6221538, operatingIncome: -2340000, netIncome: -1708029, totalAssets: 46600000, netAssets: 10200000, eps: -980.0, bps: 6700.0, dividendPerShare: 44.0 },
    { fiscalYear: 2023, periodType: 'FY', periodEnd: '2023-03-31', revenue: 6570439, operatingIncome: -1820000, netIncome: -970143, totalAssets: 43900000, netAssets: 9800000, eps: -650.0, bps: 6400.0, dividendPerShare: 44.0 },
    { fiscalYear: 2024, periodType: 'FY', periodEnd: '2024-03-31', revenue: 6756475, operatingIncome: 850000, netIncome: -227646, totalAssets: 48500000, netAssets: 11800000, eps: -150.0, bps: 7800.0, dividendPerShare: 44.0 }
  ];
  for (const f of sbgFins) {
    await prisma.financialReport.upsert({
      where: { tickerCode_fiscalYear_periodType: { tickerCode: '9984', fiscalYear: f.fiscalYear, periodType: f.periodType } },
      update: f,
      create: { tickerCode: '9984', ...f }
    });
  }

  // 1-4. ファーストリテイリング (9983)
  await prisma.company.upsert({
    where: { tickerCode: '9983' },
    update: {
      marketCap: 148000.0,
      currentPrice: 47500.0,
      trailingPE: 38.5,
      priceToBook: 7.15,
      dividendYield: 0.95,
      roe: 18.5,
      equityRatio: 59.7,
    },
    create: {
      tickerCode: '9983',
      name: '株式会社ファーストリテイリング',
      shortName: 'ファストリ',
      sector: '小売業',
      market: '東証プライム',
      marketCap: 148000.0,
      currentPrice: 47500.0,
      trailingPE: 38.5,
      priceToBook: 7.15,
      dividendYield: 0.95,
      roe: 18.5,
      equityRatio: 59.7,
      priceChange: 320.0,
      priceChangePct: 0.68,
      establishedYear: 1963,
      listingDate: '1994年7月',
      representative: '柳井 正 (代表取締役会長兼社長)',
      headquarters: '山口県山口市佐山717-1 / 東京都港区赤坂9-7-1',
      employeesCount: '59,800名 [連結]',
      avgSalary: 1150.0,
      avgAge: 38.4,
      mainBanks: '三菱UFJ銀行、三井住友銀行、みずほ銀行',
      foreignHoldingRatio: 43.8,
      floatingSharesRatio: 19.5,
      shikihoHeadline: '【欧米・アジア絶好調】LifeWear世界浸透で過去最高益を更新',
      shikihoOutlook: 'ユニクロの海外展開（欧米・東南アジア）が利益牽引。国内ユニクロも高品質路線・適正価格戦略で既存店売上が堅調。ジーユー（GU）のグローバル出店も加速。',
      shikihoMaterial: '手元現預金が1兆円を突破。サプライチェーンの完全デジタル化（RFID・自動倉庫）とグローバル本部体制の強化に大規模投資を継続。',
      businessSegments: JSON.stringify([
        { name: '海外ユニクロ事業 (欧州・北米・中華圏・東南アジア)', ratio: 52.8 },
        { name: '国内ユニクロ事業', ratio: 31.4 },
        { name: 'ジーユー事業 (GU)', ratio: 11.2 },
        { name: 'グローバルブランド事業 (Theory・PLST等)', ratio: 4.6 }
      ]),
    }
  });

  const fastriFins = [
    { fiscalYear: 2015, periodType: 'FY', periodEnd: '2015-08-31', revenue: 1681781, operatingIncome: 164463, netIncome: 110027, totalAssets: 1160000, netAssets: 710000, eps: 360.0, bps: 2300.0, dividendPerShare: 116.7 },
    { fiscalYear: 2016, periodType: 'FY', periodEnd: '2016-08-31', revenue: 1786473, operatingIncome: 127292, netIncome: 48052, totalAssets: 1240000, netAssets: 690000, eps: 157.0, bps: 2240.0, dividendPerShare: 116.7 },
    { fiscalYear: 2017, periodType: 'FY', periodEnd: '2017-08-31', revenue: 1861917, operatingIncome: 176414, netIncome: 119280, totalAssets: 1390000, netAssets: 820000, eps: 390.0, bps: 2650.0, dividendPerShare: 116.7 },
    { fiscalYear: 2018, periodType: 'FY', periodEnd: '2018-08-31', revenue: 2130060, operatingIncome: 229224, netIncome: 154811, totalAssets: 1960000, netAssets: 920000, eps: 506.0, bps: 2980.0, dividendPerShare: 146.7 },
    { fiscalYear: 2019, periodType: 'FY', periodEnd: '2019-08-31', revenue: 2290548, operatingIncome: 257636, netIncome: 162578, totalAssets: 2010000, netAssets: 1000000, eps: 531.0, bps: 3240.0, dividendPerShare: 160.0 },
    { fiscalYear: 2020, periodType: 'FY', periodEnd: '2020-08-31', revenue: 2008846, operatingIncome: 149347, netIncome: 90357, totalAssets: 2420000, netAssets: 1020000, eps: 295.0, bps: 3310.0, dividendPerShare: 160.0 },
    { fiscalYear: 2021, periodType: 'FY', periodEnd: '2021-08-31', revenue: 2132998, operatingIncome: 249011, netIncome: 169847, totalAssets: 2500000, netAssets: 1160000, eps: 554.0, bps: 3770.0, dividendPerShare: 160.0 },
    { fiscalYear: 2022, periodType: 'FY', periodEnd: '2022-08-31', revenue: 2301122, operatingIncome: 297325, netIncome: 273335, totalAssets: 3190000, netAssets: 1510000, eps: 892.0, bps: 4900.0, dividendPerShare: 206.7 },
    { fiscalYear: 2023, periodType: 'FY', periodEnd: '2023-08-31', revenue: 2766557, operatingIncome: 381090, netIncome: 296229, totalAssets: 3300000, netAssets: 1880000, eps: 966.0, bps: 6100.0, dividendPerShare: 290.0 },
    { fiscalYear: 2024, periodType: 'FY', periodEnd: '2024-08-31', revenue: 3103836, operatingIncome: 500900, netIncome: 371900, totalAssets: 3820000, netAssets: 2280000, eps: 1212.0, bps: 7420.0, dividendPerShare: 400.0 }
  ];
  for (const f of fastriFins) {
    await prisma.financialReport.upsert({
      where: { tickerCode_fiscalYear_periodType: { tickerCode: '9983', fiscalYear: f.fiscalYear, periodType: f.periodType } },
      update: f,
      create: { tickerCode: '9983', ...f }
    });
  }

  // 1-5. 株価ローソク足データの生成
  const stockCandleConfigs = [
    { ticker: '6758', base: 2890, vol: 0.018 },
    { ticker: '6861', base: 70850, vol: 0.016 },
    { ticker: '9984', base: 8540, vol: 0.024 },
    { ticker: '9983', base: 47500, vol: 0.015 },
  ];
  const endDate = new Date('2024-06-28');
  for (const cfg of stockCandleConfigs) {
    let price = cfg.base * 0.88;
    for (let i = 90; i >= 0; i--) {
      const d = new Date(endDate);
      d.setDate(d.getDate() - Math.round(i * 1.45));
      if (d.getDay() === 0 || d.getDay() === 6) continue;
      const dateStr = d.toISOString().split('T')[0];
      const change = (Math.random() - 0.48) * cfg.vol;
      const open = Math.round(price);
      const close = Math.round(price * (1 + change));
      const high = Math.round(Math.max(open, close) * (1 + Math.random() * 0.012));
      const low = Math.round(Math.min(open, close) * (1 - Math.random() * 0.012));
      const volume = Math.round((Math.random() * 1500000 + 800000) * (cfg.base < 10000 ? 3 : 0.4));
      price = close;
      await prisma.stockPrice.upsert({
        where: { tickerCode_date: { tickerCode: cfg.ticker, date: dateStr } },
        update: { open, high, low, close, volume },
        create: { tickerCode: cfg.ticker, date: dateStr, open, high, low, close, volume }
      });
    }
  }

  // ==========================================
  // 2. 注目ユニコーン (Spiber, CADDi, PFN, ANDPAD, LUUP)
  // ==========================================
  const newUnlisted = [
    {
      slug: 'spiber',
      corporateNumber: '1390001008779',
      name: 'Spiber株式会社',
      shortName: 'Spiber (スパイバー)',
      industry: 'バイオテクノロジー / 新世代構造タンパク質素材',
      establishedYear: 2007,
      representative: '関山 兼史 (代表執行役)',
      employeesCount: '320名',
      capital: 100.0,
      isStartup: true,
      description: '【事業概要】微生物発酵プロセスにより人工構造タンパク質素材「Brewed Protein（ブリュード・プロテイン）」を開発・量産する日本屈指のディープテック・バイオユニコーン。石油由来の合繊や動物性繊維（ウール・カシミヤ・レザー）を代替する持続可能素材として、THE NORTH FACEやゴールドウイン、サカイ（sacai）等の世界的ブランドに採用。タイの量産プラント稼働によりグローバル供給体制を確立。',
      shikihoHeadline: '【タイ量産工場稼働】グローバルアパレル採用拡大、累計調達1,000億円超',
      shikihoOutlook: 'タイの量産プラントでの発酵・精製プロセスが安定稼働。国内外の高級ファッションブランドおよび自動車内装材向けにサンプル出荷・商業採用が本格化。',
      shikihoMaterial: '三菱UFJモルガン・スタンレー証券主幹事のもと事業価値連動型ローン（Value-Secured Financing）を含む累計1,000億円以上の資金調達を実施。将来のNASDAQまたは東証大型上場を視野。',
      businessSegments: JSON.stringify([
        { name: 'Brewed Protein 繊維・アパレル素材事業', ratio: 65.0 },
        { name: '自動車・モビリティ向け高機能樹脂・バイオ複合材', ratio: 22.0 },
        { name: '新素材研究開発・ライセンス供与', ratio: 13.0 }
      ]),
      latestPeriodEnd: '2023-12-31',
      latestNetAssets: 38400.0,
      latestNetIncome: -5400.0,
      latestTotalAssets: 62000.0,
      gazettes: [
        { fiscalPeriod: 16, periodEnd: '2022-12-31', gazetteDate: '2023-04-25', gazetteIssue: '号外第88号 64頁', totalAssets: 54000.0, totalLiabilities: 18000.0, netAssets: 36000.0, capitalStock: 100.0, capitalSurplus: 58000.0, retainedEarnings: -22100.0, netIncome: -6800.0 },
        { fiscalPeriod: 17, periodEnd: '2023-12-31', gazetteDate: '2024-04-22', gazetteIssue: '号外第94号 72頁', totalAssets: 62000.0, totalLiabilities: 23600.0, netAssets: 38400.0, capitalStock: 100.0, capitalSurplus: 69000.0, retainedEarnings: -30700.0, netIncome: -5400.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '関山 兼史 (創業者/代表執行役)', shareholderType: 'founder', holdingRatio: 21.5, sharesHeld: 4300000 },
        { rank: 2, shareholderName: '株式会社ゴールドウイン', shareholderType: 'corporate', holdingRatio: 12.8, sharesHeld: 2560000 },
        { rank: 3, shareholderName: '株式会社海外需要開拓支援機構 (クールジャパン機構)', shareholderType: 'vc', holdingRatio: 11.4, sharesHeld: 2280000 },
        { rank: 4, shareholderName: '三菱UFJキャピタル / モルガン・スタンレー', shareholderType: 'vc', holdingRatio: 8.5, sharesHeld: 1700000 },
        { rank: 5, shareholderName: 'Spiber 役員・従業員持株会', shareholderType: 'employee', holdingRatio: 6.2, sharesHeld: 1240000 }
      ]
    },
    {
      slug: 'caddi',
      corporateNumber: '3010001189422',
      name: 'キャディ株式会社',
      shortName: 'CADDi (キャディ)',
      industry: '製造業DX / サプライチェーン受発注プラットフォーム',
      establishedYear: 2017,
      representative: '加藤 勇晃 (代表取締役CEO)',
      employeesCount: '650名',
      capital: 100.0,
      isStartup: true,
      description: '【事業概要】「モノづくり産業のポテンシャルを解放する」をミッションに掲げる製造業DXユニコーン。独自の原価計算アルゴリズムによる部品調達プラットフォーム「CADDi MANUFACTURING」と、AIで図面データを資産化・検索最適化するSaaS「CADDi DRAWER」を展開。日米で数千社の大手機械・装置メーカーに導入され、米国・ベトナムへグローバル展開を加速。',
      shikihoHeadline: '【図面AI「DRAWER」急伸】大手製造業のDX基盤化、米国展開加速',
      shikihoOutlook: '「CADDi DRAWER」のSaaS収益が前年比3倍ペースで拡大。板金・切削・製缶など部品調達事業も北米市場での取扱高が急増中。',
      shikihoMaterial: 'シリーズCラウンドで約118億円を調達し累計調達額217億円超。米WiL、グロービス、DST Global等のトップVCが参画。',
      businessSegments: JSON.stringify([
        { name: 'CADDi DRAWER (AI図面データ活用SaaS)', ratio: 48.5 },
        { name: 'CADDi MANUFACTURING (部品調達・受発注プラットフォーム)', ratio: 51.5 }
      ]),
      latestPeriodEnd: '2023-12-31',
      latestNetAssets: 14500.0,
      latestNetIncome: -2100.0,
      latestTotalAssets: 21800.0,
      gazettes: [
        { fiscalPeriod: 6, periodEnd: '2022-12-31', gazetteDate: '2023-05-18', gazetteIssue: '号外第102号 50頁', totalAssets: 12500.0, totalLiabilities: 4200.0, netAssets: 8300.0, capitalStock: 100.0, capitalSurplus: 14500.0, retainedEarnings: -6300.0, netIncome: -2800.0 },
        { fiscalPeriod: 7, periodEnd: '2023-12-31', gazetteDate: '2024-05-15', gazetteIssue: '号外第106号 58頁', totalAssets: 21800.0, totalLiabilities: 7300.0, netAssets: 14500.0, capitalStock: 100.0, capitalSurplus: 22800.0, retainedEarnings: -8400.0, netIncome: -2100.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '加藤 勇晃 (代表取締役CEO)', shareholderType: 'founder', holdingRatio: 34.2, sharesHeld: 3420000 },
        { rank: 2, shareholderName: 'World Innovation Lab (WiL)', shareholderType: 'vc', holdingRatio: 18.5, sharesHeld: 1850000 },
        { rank: 3, shareholderName: 'グロービス・キャピタル・パートナーズ', shareholderType: 'vc', holdingRatio: 14.0, sharesHeld: 1400000 },
        { rank: 4, shareholderName: 'DCM Ventures', shareholderType: 'vc', holdingRatio: 10.2, sharesHeld: 1020000 }
      ]
    },
    {
      slug: 'preferred-networks',
      corporateNumber: '8010001160351',
      name: '株式会社Preferred Networks',
      shortName: 'Preferred Networks (PFN)',
      industry: '人工知能 (AI) / ディープラーニング / AI半導体',
      establishedYear: 2014,
      representative: '西川 徹 (代表取締役最高経営責任者)',
      employeesCount: '480名',
      capital: 100.0,
      isStartup: true,
      description: '【事業概要】日本のAI・ディープラーニング領域を代表する最高峰のAIテックユニコーン。独自の超省電力AIアクセラレータ「MN-Core」シリーズの開発から、スーパーコンピュータ「MN-3」、大規模言語モデル（LLM）「PLaMo」、創薬・バイオインフォマティクス、自動運転・ロボティクスまで一貫して垂直統合型で展開。トヨタ自動車、ファナック、NTT、三井物産等と強力な資本・業務提携を結ぶ。',
      shikihoHeadline: '【独自AI半導体「MN-Core」進化】国産LLM「PLaMo」提供、創薬DX加速',
      shikihoOutlook: 'MN-Coreを活用した超高効率AIインフラが順調に稼働。国産LLM「PLaMo」の企業向けAPI提供および中外製薬等とのAI創薬プロジェクトが収益貢献。',
      shikihoMaterial: 'トヨタ自動車、ファナック、NTT、ENEOS、博報堂等からの累計出資受入額は350億円超。企業評価額は約3,500億円を維持。',
      businessSegments: JSON.stringify([
        { name: 'AI半導体・スーパーコンピュータインフラ事業', ratio: 42.0 },
        { name: '産業DX・AIソリューション (自動運転・ロボット・マテリアル)', ratio: 38.0 },
        { name: 'AI創薬・ヘルスケア・生成AI (PLaMo)', ratio: 20.0 }
      ]),
      latestPeriodEnd: '2024-01-31',
      latestNetAssets: 28500.0,
      latestNetIncome: 250.0,
      latestTotalAssets: 34200.0,
      gazettes: [
        { fiscalPeriod: 9, periodEnd: '2023-01-31', gazetteDate: '2023-06-12', gazetteIssue: '号外第122号 40頁', totalAssets: 32000.0, totalLiabilities: 4200.0, netAssets: 27800.0, capitalStock: 100.0, capitalSurplus: 31200.0, retainedEarnings: -3500.0, netIncome: -850.0 },
        { fiscalPeriod: 10, periodEnd: '2024-01-31', gazetteDate: '2024-06-10', gazetteIssue: '号外第128号 45頁', totalAssets: 34200.0, totalLiabilities: 5700.0, netAssets: 28500.0, capitalStock: 100.0, capitalSurplus: 31200.0, retainedEarnings: -2800.0, netIncome: 250.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '西川 徹 (代表取締役CEO)', shareholderType: 'founder', holdingRatio: 26.5, sharesHeld: 2650000 },
        { rank: 2, shareholderName: '岡野原 大輔 (代表取締役最高リサーチ責任者)', shareholderType: 'founder', holdingRatio: 18.0, sharesHeld: 1800000 },
        { rank: 3, shareholderName: 'トヨタ自動車株式会社', shareholderType: 'corporate', holdingRatio: 12.5, sharesHeld: 1250000 },
        { rank: 4, shareholderName: 'ファナック株式会社', shareholderType: 'corporate', holdingRatio: 8.2, sharesHeld: 820000 },
        { rank: 5, shareholderName: '日本電信電話株式会社 (NTT)', shareholderType: 'corporate', holdingRatio: 6.5, sharesHeld: 650000 }
      ]
    },
    {
      slug: 'andpad',
      corporateNumber: '7010401108226',
      name: '株式会社アンドパッド',
      shortName: 'ANDPAD (アンドパッド)',
      industry: '建設DX / 施工管理・図面クラウドSaaS',
      establishedYear: 2016,
      representative: '稲田 武夫 (代表取締役社長)',
      employeesCount: '720名',
      capital: 100.0,
      isStartup: true,
      description: '【事業概要】建設業界の現場施工管理・受発注・図面管理をワンストップでクラウド化する建設DX SaaS「ANDPAD」を展開。利用社数18万社、ユーザー数47万人を突破し、業界シェアNo.1のデファクトスタンダード。現場の生産性向上から資材受発注・請求・経営管理までERPとして拡張。',
      shikihoHeadline: '【建設DXシェア首位】利用社数18万社突破、受発注・請求SaaSが拡大',
      shikihoOutlook: '2024年4月の時間外労働規制（建設業2024年問題）を強力な追い風に大手ゼネコン・ハウスメーカーの導入が加速。',
      shikihoMaterial: 'Minerva Growth Partners、Sequoia Heritage等の海外機関投資家から累計200億円超を調達。',
      businessSegments: JSON.stringify([
        { name: '施工管理SaaS (ANDPAD施工・図面・写真)', ratio: 62.0 },
        { name: '受発注・請求・経営ERPソリューション', ratio: 28.0 },
        { name: '周辺ソリューション・建材連携', ratio: 10.0 }
      ]),
      latestPeriodEnd: '2023-12-31',
      latestNetAssets: 16200.0,
      latestNetIncome: -1850.0,
      latestTotalAssets: 23500.0,
      gazettes: [
        { fiscalPeriod: 7, periodEnd: '2022-12-31', gazetteDate: '2023-05-12', gazetteIssue: '号外第98号 60頁', totalAssets: 18000.0, totalLiabilities: 4500.0, netAssets: 13500.0, capitalStock: 100.0, capitalSurplus: 19500.0, retainedEarnings: -6100.0, netIncome: -2400.0 },
        { fiscalPeriod: 8, periodEnd: '2023-12-31', gazetteDate: '2024-05-10', gazetteIssue: '号外第102号 65頁', totalAssets: 23500.0, totalLiabilities: 7300.0, netAssets: 16200.0, capitalStock: 100.0, capitalSurplus: 24200.0, retainedEarnings: -8100.0, netIncome: -1850.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '稲田 武夫 (代表取締役社長)', shareholderType: 'founder', holdingRatio: 38.0, sharesHeld: 3800000 },
        { rank: 2, shareholderName: 'Minerva Growth Partners / 海外機関投資家', shareholderType: 'vc', holdingRatio: 18.2, sharesHeld: 1820000 },
        { rank: 3, shareholderName: 'Globis Capital Partners', shareholderType: 'vc', holdingRatio: 12.4, sharesHeld: 1240000 }
      ]
    },
    {
      slug: 'luup',
      corporateNumber: '3011001131758',
      name: '株式会社Luup',
      shortName: 'LUUP (ループ)',
      industry: 'マイクロモビリティ / 電動キックボード・アシスト自転車シェア',
      establishedYear: 2018,
      representative: '岡井 大輝 (代表取締役社長CEO)',
      employeesCount: '220名',
      capital: 100.0,
      isStartup: true,
      description: '【事業概要】「街じゅうを「駅前化」するインフラをつくる」をミッションに、電動キックボードおよび小型電動アシスト自転車のシェアリングサービス「LUUP」を展開。全国主要都市でポート数1万箇所・車両数3万台を突破。改正道路交通法（特定小型原動機付自転車）の施行を契機に短距離移動インフラとして急速に定着。鉄道各社や不動産デベロッパーとの提携を推進。',
      shikihoHeadline: '【ポート数1万箇所突破】全国主要都市へ展開、鉄道・不動産連携加速',
      shikihoOutlook: '東京・大阪・京都・横浜・神戸・名古屋・福岡・広島など主要大都市圏で高密度ネットワークを構築。利用回数が前年比2.5倍ペースで急伸。',
      shikihoMaterial: 'シリーズDラウンドで累計調達額166億円を突破。JR東日本・三菱地所・森トラスト等の大手事業会社が資本参画。',
      businessSegments: JSON.stringify([
        { name: '電動キックボード・アシスト自転車シェアリング利用料', ratio: 82.5 },
        { name: '法人向けポート誘致・広告・アライアンス事業', ratio: 17.5 }
      ]),
      latestPeriodEnd: '2023-11-30',
      latestNetAssets: 6850.0,
      latestNetIncome: -1250.0,
      latestTotalAssets: 11200.0,
      gazettes: [
        { fiscalPeriod: 5, periodEnd: '2022-11-30', gazetteDate: '2023-04-14', gazetteIssue: '号外第82号 52頁', totalAssets: 6500.0, totalLiabilities: 2100.0, netAssets: 4400.0, capitalStock: 100.0, capitalSurplus: 7800.0, retainedEarnings: -3500.0, netIncome: -1600.0 },
        { fiscalPeriod: 6, periodEnd: '2023-11-30', gazetteDate: '2024-04-12', gazetteIssue: '号外第86号 58頁', totalAssets: 11200.0, totalLiabilities: 4350.0, netAssets: 6850.0, capitalStock: 100.0, capitalSurplus: 12200.0, retainedEarnings: -5450.0, netIncome: -1250.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '岡井 大輝 (代表取締役社長CEO)', shareholderType: 'founder', holdingRatio: 32.5, sharesHeld: 3250000 },
        { rank: 2, shareholderName: 'ANRI (VCファンド)', shareholderType: 'vc', holdingRatio: 16.0, sharesHeld: 1600000 },
        { rank: 3, shareholderName: 'Spiral Capital', shareholderType: 'vc', holdingRatio: 11.2, sharesHeld: 1120000 },
        { rank: 4, shareholderName: '東日本旅客鉄道株式会社 (JR東日本)', shareholderType: 'corporate', holdingRatio: 6.8, sharesHeld: 680000 }
      ]
    }
  ];

  for (const item of newUnlisted) {
    const { gazettes, shareholders, ...companyData } = item;

    const unlisted = await prisma.unlistedCompany.upsert({
      where: { slug: item.slug },
      update: companyData,
      create: companyData,
    });

    if (gazettes && gazettes.length > 0) {
      for (const g of gazettes) {
        await prisma.officialGazetteReport.upsert({
          where: {
            unlistedCompanyId_fiscalPeriod: {
              unlistedCompanyId: unlisted.id,
              fiscalPeriod: g.fiscalPeriod,
            },
          },
          update: g,
          create: {
            ...g,
            unlistedCompanyId: unlisted.id,
          },
        });
      }
    }

    if (shareholders && shareholders.length > 0) {
      await prisma.unlistedShareholder.deleteMany({
        where: { unlistedCompanyId: unlisted.id }
      });
      await prisma.unlistedShareholder.createMany({
        data: shareholders.map(s => ({
          ...s,
          unlistedCompanyId: unlisted.id,
        }))
      });
    }
  }

  console.log('✅ ALL Megacaps & Unicorns successfully seeded into DB!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });