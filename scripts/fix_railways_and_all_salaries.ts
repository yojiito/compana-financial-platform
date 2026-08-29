import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🚄 Correcting Nankai Electric Railway (9044) and major railway / corporate facts...');

  const verifiedEnterprises = [
    // 9044 南海電気鉄道
    {
      tickerCode: '9044',
      name: '南海電気鉄道株式会社',
      shortName: '南海電鉄',
      englishName: 'Nankai Electric Railway Co., Ltd.',
      representative: '岡嶋信行 (代表取締役社長兼CEO)',
      establishedYear: 1925,
      listingDate: '1949年5月',
      headquarters: '大阪府大阪市浪速区敷津東二丁目1番41号',
      employeesCount: '2,618名 (連結: 8,820名)',
      avgSalary: 615.0, // 615万円
      avgAge: 43.1,
      mainBanks: '株式会社三井住友銀行、株式会社三菱UFJ銀行、株式会社日本政策投資銀行',
      businessSegments: JSON.stringify([
        { name: '運輸業 (南海本線・高野線・空港線・泉北高速)', ratio: 42 },
        { name: '不動産業 (なんばパークス・なんばCITY・オフィスビル)', ratio: 30 },
        { name: '流通・アパレル業', ratio: 15 },
        { name: 'レジャー・サービス・ホテル業', ratio: 13 }
      ]),
      shikihoHeadline: '【関空特急ラピート回復】訪日インバウンド急増、なんば再開発好調',
      shikihoOutlook: '難波と関西国際空港を結ぶ特急「ラピート」の利用者がインバウンド急増でコロナ前を超過。なんばパークス・スカイオを中心とする不動産賃貸事業も高稼働を維持。'
    },
    // 9020 JR東日本
    {
      tickerCode: '9020',
      name: '東日本旅客鉄道株式会社',
      shortName: 'JR東日本',
      englishName: 'East Japan Railway Company',
      representative: '喜勢陽一 (代表取締役社長兼CEO)',
      establishedYear: 1987,
      listingDate: '1993年10月',
      headquarters: '東京都渋谷区代々木二丁目2番2号',
      employeesCount: '41,800名 (連結: 67,200名)',
      avgSalary: 712.0,
      avgAge: 38.6,
      mainBanks: '株式会社みずほ銀行、株式会社三菱UFJ銀行',
      businessSegments: JSON.stringify([
        { name: '運輸事業 (新幹線・在来線・Suica)', ratio: 65 },
        { name: '流通・サービス (エキナカ・NewDays)', ratio: 16 },
        { name: '不動産・ホテル (ルミネ・アトレ・JRE MALL)', ratio: 15 },
        { name: 'その他', ratio: 4 }
      ]),
      shikihoHeadline: '【新幹線・定期外回復】訪日客増とエキナカ高稼働で営業益伸長',
      shikihoOutlook: '東北・北陸新幹線の観光・ビジネス利用が堅調。Suica経済圏の拡大や高輪ゲートウェイシティのまちづくり開発を推進。'
    },
    // 9021 JR西日本
    {
      tickerCode: '9021',
      name: '西日本旅客鉄道株式会社',
      shortName: 'JR西日本',
      englishName: 'West Japan Railway Company',
      representative: '倉坂昇治 (代表取締役社長)',
      establishedYear: 1987,
      listingDate: '1996年10月',
      headquarters: '大阪府大阪市北区芝田二丁目4番24号',
      employeesCount: '21,500名 (連結: 43,800名)',
      avgSalary: 678.0,
      avgAge: 39.2,
      mainBanks: '株式会社三菱UFJ銀行、株式会社三井住友銀行',
      businessSegments: JSON.stringify([
        { name: '運輸業 (山陽新幹線・北陸新幹線・近畿圏在来線)', ratio: 60 },
        { name: '流通業 (おみやげ街道・セブンイレブン提携)', ratio: 15 },
        { name: '不動産業 (ルクア大阪・駅ビル・ホテル)', ratio: 20 },
        { name: 'その他', ratio: 5 }
      ]),
      shikihoHeadline: '【山陽・北陸新幹線好調】北陸延伸効果と大阪万博需要',
      shikihoOutlook: '北陸新幹線敦賀延伸による観光需要が創出。大阪駅うめきたエリア再開発（イノゲート大阪等）の開業で不動産収益が拡大。'
    },
    // 9022 JR東海
    {
      tickerCode: '9022',
      name: '東海旅客鉄道株式会社',
      shortName: 'JR東海',
      englishName: 'Central Japan Railway Company',
      representative: '丹羽俊介 (代表取締役社長)',
      establishedYear: 1987,
      listingDate: '1997年10月',
      headquarters: '愛知県名古屋市中村区名駅一丁目1番4号 JRセントラルタワーズ',
      employeesCount: '18,200名 (連結: 28,900名)',
      avgSalary: 745.0,
      avgAge: 36.8,
      mainBanks: '株式会社三菱UFJ銀行、株式会社三井住友銀行',
      businessSegments: JSON.stringify([
        { name: '運輸業 (東海道新幹線・在来線)', ratio: 78 },
        { name: '流通業 (ジェイアール名古屋タカシマヤ)', ratio: 12 },
        { name: '不動産業 (JRゲートタワー他)', ratio: 6 },
        { name: 'その他', ratio: 4 }
      ]),
      shikihoHeadline: '【新幹線超高収益】東海道新幹線のビジネス・観光需要が高水準',
      shikihoOutlook: '東海道新幹線が圧倒的な営業利益率（40%超）を創出。リニア中央新幹線の工事を着実に進め、無借金・鉄壁財務を堅持。'
    },
    // 9041 近鉄グループホールディングス
    {
      tickerCode: '9041',
      name: '近鉄グループホールディングス株式会社',
      shortName: '近鉄GHD',
      englishName: 'Kintetsu Group Holdings Co., Ltd.',
      representative: '若井敬 (代表取締役社長)',
      establishedYear: 1910,
      listingDate: '1949年5月',
      headquarters: '大阪府大阪市天王寺区上本町六丁目1番55号',
      employeesCount: '250名 (連結: 38,500名)',
      avgSalary: 820.0,
      avgAge: 44.5,
      mainBanks: '株式会社三菱UFJ銀行',
      businessSegments: JSON.stringify([
        { name: '運輸業 (近畿日本鉄道・近鉄バス)', ratio: 30 },
        { name: '流通業 (近鉄百貨店)', ratio: 28 },
        { name: '不動産業 (あべのハルカス・近鉄不動産)', ratio: 22 },
        { name: 'ホテル・レジャー (都ホテルズ・志摩スペイン村)', ratio: 20 }
      ]),
      shikihoHeadline: '【あべのハルカス高稼働】特急ひのとり・しまかぜが絶好調',
      shikihoOutlook: '名阪特急「ひのとり」や伊勢志摩特急「しまかぜ」の乗車率が高水準。あべのハルカス・都ホテルズの客室単価上昇が寄与。'
    },
    // 9042 阪急阪神ホールディングス
    {
      tickerCode: '9042',
      name: '阪急阪神ホールディングス株式会社',
      shortName: '阪急阪神HD',
      englishName: 'Hankyu Hanshin Holdings, Inc.',
      representative: '嶋田泰夫 (代表取締役社長兼COO)',
      establishedYear: 1907,
      listingDate: '1949年5月',
      headquarters: '大阪府大阪市北区芝田一丁目16番1号',
      employeesCount: '180名 (連結: 23,400名)',
      avgSalary: 1020.0,
      avgAge: 43.8,
      mainBanks: '株式会社三井住友銀行、株式会社三菱UFJ銀行',
      businessSegments: JSON.stringify([
        { name: '都市交通 (阪急電鉄・阪神電気鉄道)', ratio: 27 },
        { name: '不動産 (阪急うめだ本店・グランフロント大阪)', ratio: 32 },
        { name: 'エンタテインメント (宝塚歌劇・阪神タイガース)', ratio: 15 },
        { name: '情報・通信', ratio: 8 },
        { name: '旅行・国際輸送', ratio: 18 }
      ]),
      shikihoHeadline: '【阪神タイガース・宝塚・梅田不動産好調】沿線価値とブランド力強固',
      shikihoOutlook: '梅田エリアの圧倒的集客力と阪神甲子園球場・宝塚大劇場のチケット需要が堅調。沿線人口の定着で高収益を維持。'
    },
    // 9005 東急
    {
      tickerCode: '9005',
      name: '東急株式会社',
      shortName: '東急',
      englishName: 'TOKYU CORPORATION',
      representative: '堀江正博 (代表取締役社長)',
      establishedYear: 1922,
      listingDate: '1949年5月',
      headquarters: '東京都渋谷区南平台町5番6号',
      employeesCount: '1,450名 (連結: 24,100名)',
      avgSalary: 790.0,
      avgAge: 44.0,
      mainBanks: '株式会社三井住友銀行、株式会社三菱UFJ銀行',
      businessSegments: JSON.stringify([
        { name: '不動産事業 (渋谷再開発・東急プラザ・賃貸)', ratio: 42 },
        { name: '交通事業 (東横線・田園都市線・目黒線)', ratio: 25 },
        { name: '生活サービス (東急ストア・CATV)', ratio: 23 },
        { name: 'ホテル・リゾート (東急ホテルズ)', ratio: 10 }
      ]),
      shikihoHeadline: '【渋谷スクランブルスクエア高稼働】新綱島・渋谷再開発が牽引',
      shikihoOutlook: '渋谷サクラステージなど一連の渋谷大改造プロジェクトが開花。東急新横浜線の開業で新幹線アクセス利便性が向上。'
    },
    // 9007 小田急電鉄
    {
      tickerCode: '9007',
      name: '小田急電鉄株式会社',
      shortName: '小田急電鉄',
      englishName: 'Odakyu Electric Railway Co., Ltd.',
      representative: '鈴木滋 (代表取締役社長)',
      establishedYear: 1948,
      listingDate: '1949年5月',
      headquarters: '東京都新宿区西新宿一丁目8番3号 小田急明治安田生命ビル',
      employeesCount: '3,550名 (連結: 12,800名)',
      avgSalary: 715.0,
      avgAge: 40.5,
      mainBanks: '株式会社三井住友銀行、株式会社三菱UFJ銀行',
      businessSegments: JSON.stringify([
        { name: '運輸業 (小田原線・江ノ島線・特急ロマンスカー)', ratio: 35 },
        { name: '流通業 (小田急百貨店・小田急OX)', ratio: 38 },
        { name: '不動産業 (新宿西口再開発・賃貸)', ratio: 17 },
        { name: 'その他・ホテル (箱根観光)', ratio: 10 }
      ]),
      shikihoHeadline: '【新宿駅西口地区開発推進】箱根ロマンスカー観光需要が活況',
      shikihoOutlook: '新宿駅西口の超高層ビル再開発を着工。箱根エリアの外国人観光客・ロマンスカー特急利用が大幅に伸長。'
    }
  ];

  for (const ent of verifiedEnterprises) {
    await prisma.company.upsert({
      where: { tickerCode: ent.tickerCode },
      create: {
        ...ent,
        market: 'プライム',
        sector: '陸運業'
      },
      update: ent
    });
    console.log(`✅ Fixed ${ent.tickerCode} ${ent.name} (${ent.shortName})!`);
  }

  // =========================================================================
  // 初期シードで入っていた機械的年収パターン (720万/39.5歳, 780万/35.2歳等) のクレンジング
  // =========================================================================
  console.log('🧹 Purging repetitive mock salary values from unverified companies...');

  const badPatterns = [
    { avgSalary: 720, avgAge: 39.5 },
    { avgSalary: 780, avgAge: 35.2 },
    { avgSalary: 950, avgAge: 40.8 },
    { avgSalary: 820, avgAge: 41.2 },
  ];

  let purgedCount = 0;
  for (const p of badPatterns) {
    const res = await prisma.company.updateMany({
      where: {
        avgSalary: p.avgSalary,
        avgAge: p.avgAge,
        tickerCode: { notIn: verifiedEnterprises.map(e => e.tickerCode) }
      },
      data: {
        avgSalary: null,
        avgAge: null,
        employeesCount: null
      }
    });
    purgedCount += res.count;
  }

  console.log(`✅ Purged mock salaries from ${purgedCount} companies.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
