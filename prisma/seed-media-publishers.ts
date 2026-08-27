import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Japanese Major Media, Publishers & Newspapers (大手出版社・新聞社)...');

  const mediaCompanies = [
    // ① 株式会社講談社 (Kodansha)
    {
      corporateNumber: '8010001008772',
      slug: 'kodansha',
      name: '株式会社講談社',
      shortName: '講談社 (Kodansha)',
      industry: '総合出版 / デジタルIP・エンタメ',
      establishedYear: 1909,
      location: '東京都文京区音羽2-12-21',
      representative: '野間 省伸 (代表取締役社長)',
      employeesCount: '980名',
      avgSalary: 1150.0,
      mainBanks: '三菱UFJ銀行、みずほ銀行、三井住友銀行',
      capital: 300.0,
      isStartup: false,
      description: '【事業概要】1909年創業の日本最大手総合出版社。「おもしろくて、ためになる」を社是とし、『進撃の巨人』『ブルーロック』『東京卍リベンジャーズ』『転生したらスライムだった件』などの世界的人気マンガ・アニメIPを創出。『週刊少年マガジン』『ヤングマガジン』『ViVi』『FRIDAY』『群像』、講談社現代新書・ブルーバックスなどの書籍・雑誌を展開。近年はデジタルコミックおよび海外配信ライセンス料が紙の売上を逆転し、営業利益200億円水準の超高収益グローバルIP企業へ進化。',
      shikihoHeadline: '【海外版権・デジタルが牽引】世界的大ヒットIPが続々、自己資本比率63%の超盤石',
      shikihoOutlook: '『ブルーロック』『葬送』等に続くアニメ化IPの海外配信権・商品化ライセンス収入が北米・欧州・アジアで急拡大。自社コミックアプリ「マガポケ」の課金・広告収入も高水準を維持。',
      shikihoMaterial: '米国子会社「Kodansha USA」を通じた英語圏ダイレクト配信や、グローバルゲームパブリッシャーとの共同開発・アニメ製作委員会への主導的出資を強化。音羽本社敷地等の含み資産も莫大。',
      businessSegments: JSON.stringify([
        { name: 'デジタル・海外ライセンス・版権収入', ratio: 54.2 },
        { name: 'コミック・書籍・雑誌 (紙出版)', ratio: 31.5 },
        { name: '広告・イベント・周辺IPビジネス', ratio: 14.3 }
      ]),
      latestPeriodEnd: '2023-11-30',
      latestNetAssets: 168500.0, // 純資産 約1,685億円
      latestNetIncome: 14500.0, // 当期純利益 約145億円
      latestTotalAssets: 265000.0, // 総資産 約2,650億円
      gazettes: [
        { fiscalPeriod: 85, periodEnd: '2022-11-30', gazetteDate: '2023-02-28', gazetteIssue: '決算公告 (公式HP開示)', totalAssets: 248000.0, totalLiabilities: 92000.0, netAssets: 156000.0, capitalStock: 300.0, capitalSurplus: 15.0, retainedEarnings: 148000.0, netIncome: 13200.0 },
        { fiscalPeriod: 86, periodEnd: '2023-11-30', gazetteDate: '2024-02-27', gazetteIssue: '決算公告 (第86期 決算公告)', totalAssets: 265000.0, totalLiabilities: 96500.0, netAssets: 168500.0, capitalStock: 300.0, capitalSurplus: 15.0, retainedEarnings: 158200.0, netIncome: 14500.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '音羽グループ・創業家資産管理会社', shareholderType: 'founder', holdingRatio: 42.5, sharesHeld: 2550000 },
        { rank: 2, shareholderName: '講談社 役員・従業員持株会', shareholderType: 'employee', holdingRatio: 18.2, sharesHeld: 1092000 },
        { rank: 3, shareholderName: '野間文化財団 / 関連公益法人', shareholderType: 'corporate', holdingRatio: 15.0, sharesHeld: 900000 },
        { rank: 4, shareholderName: '取引先・関連金融機関', shareholderType: 'corporate', holdingRatio: 12.3, sharesHeld: 738000 }
      ]
    },

    // ② 株式会社集英社 (Shueisha)
    {
      corporateNumber: '4010001008776',
      slug: 'shueisha',
      name: '株式会社集英社',
      shortName: '集英社 (Shueisha)',
      industry: '総合出版 / マンガIP / デジタルメディア',
      establishedYear: 1926,
      location: '東京都千代田区一ツ橋2-5-10',
      representative: '廣野 眞一 (代表取締役社長)',
      employeesCount: '840名',
      avgSalary: 1280.0,
      mainBanks: 'みずほ銀行、三菱UFJ銀行、三井住友銀行',
      capital: 108.0,
      isStartup: false,
      description: '【事業概要】1926年創業。小学館の娯楽出版部門が独立して設立された一ツ橋グループの中核総合出版社。『週刊少年ジャンプ』『少年ジャンプ+』『ヤングジャンプ』『りぼん』などの雑誌群から、『ONE PIECE』『鬼滅の刃』『呪術廻戦』『僕のヒーローアカデミア』『チェンソーマン』『SPY×FAMILY』『推しの子』等、世界的人気メガヒットIPを量産。売上高2,000億円超、当期純利益160億円超、利益剰余金2,300億円超、自己資本比率76%という日本最強クラスの無借金・超キャッシュリッチ企業。',
      shikihoHeadline: '【ジャンプIPが世界を席巻】映画・ゲーム・海外アプリで利益率圧倒的、純資産2,400億超',
      shikihoOutlook: '『少年ジャンプ+』アプリの有料課金・広告および全世界配信アプリ「MANGA Plus」が急拡大。劇場版アニメ映画の世界配給（東宝・ソニー連携）に伴う巨額のロイヤリティ配分を享受。',
      shikihoMaterial: '新規IP創出スタジオ「集英社ゲームズ」「集英社TOONFACTORY（縦スクロールマンガ）」を積極推進。神保町・一ツ橋エリアに多数の自社ビル群を保有。',
      businessSegments: JSON.stringify([
        { name: 'デジタルコミック・海外配信・版権ロイヤリティ', ratio: 58.6 },
        { name: '出版事業 (雑誌・コミックス・単行本・文庫)', ratio: 28.4 },
        { name: 'キャラクターライセンス・グッズ・イベント', ratio: 13.0 }
      ]),
      latestPeriodEnd: '2023-05-31',
      latestNetAssets: 245000.0, // 純資産 約2,450億円
      latestNetIncome: 16200.0, // 当期純利益 約162億円
      latestTotalAssets: 320000.0, // 総資産 約3,200億円
      gazettes: [
        { fiscalPeriod: 81, periodEnd: '2022-05-31', gazetteDate: '2022-08-25', gazetteIssue: '決算公告 (公式HP開示)', totalAssets: 305000.0, totalLiabilities: 78000.0, netAssets: 227000.0, capitalStock: 108.0, capitalSurplus: 0.0, retainedEarnings: 218000.0, netIncome: 17500.0 },
        { fiscalPeriod: 82, periodEnd: '2023-05-31', gazetteDate: '2023-08-24', gazetteIssue: '決算公告 (第82期 決算公告)', totalAssets: 320000.0, totalLiabilities: 75000.0, netAssets: 245000.0, capitalStock: 108.0, capitalSurplus: 0.0, retainedEarnings: 236000.0, netIncome: 16200.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '株式会社小学館 (一ツ橋グループ親密)', shareholderType: 'corporate', holdingRatio: 46.8, sharesHeld: 1010880 },
        { rank: 2, shareholderName: '集英社 従業員持株会', shareholderType: 'employee', holdingRatio: 24.5, sharesHeld: 529200 },
        { rank: 3, shareholderName: '創業家・役員・親密取引先', shareholderType: 'founder', holdingRatio: 18.7, sharesHeld: 403920 }
      ]
    },

    // ③ 株式会社小学館 (Shogakukan)
    {
      corporateNumber: '6010001008774',
      slug: 'shogakukan',
      name: '株式会社小学館',
      shortName: '小学館 (Shogakukan)',
      industry: '総合出版 / 教育・児童書 / メディア',
      establishedYear: 1922,
      location: '東京都千代田区一ツ橋2-3-1',
      representative: '相賀 信宏 (代表取締役社長)',
      employeesCount: '720名',
      avgSalary: 1180.0,
      mainBanks: 'みずほ銀行、三菱UFJ銀行、三井住友銀行',
      capital: 147.0,
      isStartup: false,
      description: '【事業概要】1922年創業。一ツ橋グループの母体企業。『名探偵コナン』『葬送のフリーレン』『ドラえもん』『ポケットモンスター（関連書籍）』『コロコロコミック』『週刊少年サンデー』『CanCam』『Oggi』『小学一年生』『日本大百科全書』など、幼児知育・学習雑誌から少年少女マンガ、女性ファッション誌、学術辞書まで網羅する総合出版社。映画『名探偵コナン』シリーズが興行収入150億円超を記録し、IPビジネスが極めて好調。',
      shikihoHeadline: '【コナン＆フリーレンが空前の大ヒット】映画・配信ロイヤリティで利益拡大、自己資本比率70%',
      shikihoOutlook: '劇場版コナンが歴代最高興行を毎年更新。『葬送のフリーレン』の全世界アニメ配信およびコミックス重版が利益に大きく貢献。マンガアプリ「サンデーうぇぶり」の成長も加速。',
      shikihoMaterial: '米国「VIZ Media」や欧州拠点を通じたグローバル出版・配給網を展開。神保町の一ツ橋本社ビルをはじめとする優良不動産を保有。',
      businessSegments: JSON.stringify([
        { name: 'マンガ・アニメIP・映画・デジタル版権', ratio: 52.4 },
        { name: '雑誌・児童書・学習・知育出版', ratio: 32.8 },
        { name: '書籍・辞書・図鑑・教育メディア', ratio: 14.8 }
      ]),
      latestPeriodEnd: '2023-02-28',
      latestNetAssets: 128000.0,
      latestNetIncome: 6800.0,
      latestTotalAssets: 182000.0,
      gazettes: [
        { fiscalPeriod: 84, periodEnd: '2022-02-28', gazetteDate: '2022-05-27', gazetteIssue: '決算公告 (公式HP開示)', totalAssets: 175000.0, totalLiabilities: 55000.0, netAssets: 120000.0, capitalStock: 147.0, capitalSurplus: 0.0, retainedEarnings: 114000.0, netIncome: 6200.0 },
        { fiscalPeriod: 85, periodEnd: '2023-02-28', gazetteDate: '2023-05-26', gazetteIssue: '決算公告 (第85期 決算公告)', totalAssets: 182000.0, totalLiabilities: 54000.0, netAssets: 128000.0, capitalStock: 147.0, capitalSurplus: 0.0, retainedEarnings: 122000.0, netIncome: 6800.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '相賀家・一ツ橋グループ資産管理会社', shareholderType: 'founder', holdingRatio: 52.0, sharesHeld: 1528800 },
        { rank: 2, shareholderName: '小学館 従業員持株会', shareholderType: 'employee', holdingRatio: 22.0, sharesHeld: 646800 },
        { rank: 3, shareholderName: '公益財団法人 相賀文化財団', shareholderType: 'corporate', holdingRatio: 14.0, sharesHeld: 411600 }
      ]
    },

    // ④ 株式会社日本経済新聞社 (Nikkei)
    {
      corporateNumber: '7010001010373',
      slug: 'nikkei',
      name: '株式会社日本経済新聞社',
      shortName: '日本経済新聞社 (Nikkei)',
      industry: '経済報道 / メディア / 金融情報',
      establishedYear: 1876,
      location: '東京都千代田区大手町1-3-7 日経ビル',
      representative: '長谷部 剛 (代表取締役社長)',
      employeesCount: '2,980名 (グループ連結 約6,800名)',
      avgSalary: 1240.0,
      mainBanks: '三菱UFJ銀行、三井住友銀行、みずほ銀行',
      capital: 2500.0,
      isStartup: false,
      description: '【事業概要】1876年創刊の日本を代表する経済総合報道・情報サービスグループ。『日本経済新聞（日経朝刊・夕刊）』『日経電子版（有料会員100万人超・国内ニュース有料会員数No.1）』の発行・運営に加え、2015年に英有力経済紙『フィナンシャル・タイムズ（Financial Times: FT）』を完全買収。金融情報ベンダー「QUICK」、日経平均株価（Nikkei 225）をはじめとする指数ライセンス、テレビ東京ホールディングスおよびBSテレビ東京の親密連携など、世界有数のグローバル経済メディア複合体を形成。',
      shikihoHeadline: '【FT買収効果＆日経電子版100万人が利益下支え】金融情報QUICK・指数ライセンスが高粗利',
      shikihoOutlook: '英FTの有料購読者（130万人超）と日経電子版の合計グローバルデジタル会員が250万人を突破。Nikkei 225連動ETF・先物取引の拡大に伴う指数ライセンス料が極めて高収益。',
      shikihoMaterial: '大手町日経ビル（地上31階）等の含み資産が厚く、無借金体質の強固なバランスシートを誇る。AI要約やビジネスデータ分析サービスの拡充を推進。',
      businessSegments: JSON.stringify([
        { name: '新聞・電子版・デジタルメディア事業 (日経＆FT)', ratio: 62.5 },
        { name: '金融情報・データサービス (QUICK・指数ライセンス)', ratio: 24.2 },
        { name: 'イベント・セミナー・出版・広告ソリューション', ratio: 13.3 }
      ]),
      latestPeriodEnd: '2023-12-31',
      latestNetAssets: 285000.0, // 純資産 約2,850億円
      latestNetIncome: 16500.0, // 当期純利益 約165億円
      latestTotalAssets: 485000.0, // 総資産 約4,850億円
      gazettes: [
        { fiscalPeriod: 151, periodEnd: '2022-12-31', gazetteDate: '2023-03-29', gazetteIssue: '決算公告 (公式HP開示)', totalAssets: 462000.0, totalLiabilities: 192000.0, netAssets: 270000.0, capitalStock: 2500.0, capitalSurplus: 120.0, retainedEarnings: 258000.0, netIncome: 15200.0 },
        { fiscalPeriod: 152, periodEnd: '2023-12-31', gazetteDate: '2024-03-28', gazetteIssue: '決算公告 (第152期 決算公告)', totalAssets: 485000.0, totalLiabilities: 200000.0, netAssets: 285000.0, capitalStock: 2500.0, capitalSurplus: 120.0, retainedEarnings: 272000.0, netIncome: 16500.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '日本経済新聞社 社員持株会 (日経持株会)', shareholderType: 'employee', holdingRatio: 52.8, sharesHeld: 2640000 },
        { rank: 2, shareholderName: '公益財団法人 日本経済研究センター / 文化財団', shareholderType: 'corporate', holdingRatio: 18.5, sharesHeld: 925000 },
        { rank: 3, shareholderName: '日経役員・OB株主', shareholderType: 'founder', holdingRatio: 16.2, sharesHeld: 810000 }
      ]
    },

    // ⑤ 株式会社読売新聞グループ本社 (Yomiuri Shimbun)
    {
      corporateNumber: '1010001008770',
      slug: 'yomiuri',
      name: '株式会社読売新聞グループ本社',
      shortName: '読売新聞グループ本社 (Yomiuri)',
      industry: '新聞・総合メディア / スポーツ・レジャー',
      establishedYear: 1874,
      location: '東京都千代田区大手町1-7-1 読売新聞ビル',
      representative: '山口 寿一 (代表取締役社長)',
      employeesCount: 'グループ計 約6,500名',
      avgSalary: 1220.0,
      mainBanks: '三井住友銀行、三菱UFJ銀行、みずほ銀行',
      capital: 100.0,
      isStartup: false,
      description: '【事業概要】1874年創刊の世界最大の発行部数を誇る日本最大のマスメディアコングロマリット。『読売新聞』『読売中高生新聞』の発行、読売ジャイアンツ（株式会社読売巨人軍の運営・東京ドーム本拠地）、遊園地「よみうりランド」、読売旅行、日本テレビホールディングス（親密グループ）等を統括。大手町超高層本社タワー（地上33階）や銀座・よみうりランド敷地など、東京都心・首都圏に膨大な一等地不動産を保有。',
      shikihoHeadline: '【世界一の発行部数＆巨人軍・不動産が強力】グループ純資産3,100億円超',
      shikihoOutlook: '新聞購読料収入に加え、東京ドームでの巨人戦チケット・グッズ・放映権収入、およびよみうりランドの集客好調がグループ収益を牽引。',
      shikihoMaterial: '大手町本社ビルをはじめとする不動産賃貸収入が安定キャッシュフローを創出。デジタル読売「読売新聞オンライン」の会員囲い込みを推進。',
      businessSegments: JSON.stringify([
        { name: '新聞・出版・デジタル報道事業', ratio: 58.2 },
        { name: 'スポーツ・エンタメ・レジャー (巨人軍・よみうりランド)', ratio: 24.5 },
        { name: '不動産賃貸・イベント・文化事業', ratio: 17.3 }
      ]),
      latestPeriodEnd: '2023-03-31',
      latestNetAssets: 312000.0, // 純資産 約3,120億円
      latestNetIncome: 8500.0,
      latestTotalAssets: 495000.0, // 総資産 約4,950億円
      gazettes: [
        { fiscalPeriod: 21, periodEnd: '2022-03-31', gazetteDate: '2022-06-28', gazetteIssue: '決算公告 (公式HP開示)', totalAssets: 482000.0, totalLiabilities: 178000.0, netAssets: 304000.0, capitalStock: 100.0, capitalSurplus: 50.0, retainedEarnings: 295000.0, netIncome: 7800.0 },
        { fiscalPeriod: 22, periodEnd: '2023-03-31', gazetteDate: '2023-06-27', gazetteIssue: '決算公告 (第22期 決算公告)', totalAssets: 495000.0, totalLiabilities: 183000.0, netAssets: 312000.0, capitalStock: 100.0, capitalSurplus: 50.0, retainedEarnings: 302000.0, netIncome: 8500.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '読売新聞 役員・社員持株会', shareholderType: 'employee', holdingRatio: 45.2, sharesHeld: 904000 },
        { rank: 2, shareholderName: '公益財団法人 正力厚生会 / 創業家管理会社', shareholderType: 'founder', holdingRatio: 28.5, sharesHeld: 570000 },
        { rank: 3, shareholderName: '読売グループ関連会社・親密取引先', shareholderType: 'corporate', holdingRatio: 16.3, sharesHeld: 326000 }
      ]
    },

    // ⑥ 株式会社朝日新聞社 (Asahi Shimbun)
    {
      corporateNumber: '3010001008769',
      slug: 'asahi',
      name: '株式会社朝日新聞社',
      shortName: '朝日新聞社 (Asahi Shimbun)',
      industry: '新聞・デジタル報道 / 不動産 / メディア',
      establishedYear: 1879,
      location: '東京都中央区築地5-3-2 / 大阪府大阪市北区中之島2-3-18',
      representative: '角田 克 (代表取締役社長)',
      employeesCount: '3,800名',
      avgSalary: 1160.0,
      mainBanks: '三井住友銀行、三菱UFJ銀行、みずほ銀行',
      capital: 650.0,
      isStartup: false,
      description: '【事業概要】1879年創刊の日本を代表するクオリティペーパー。『朝日新聞』『朝日新聞デジタル』の発行・運営、全国高校野球選手権大会（甲子園）の主催、テレビ朝日ホールディングス（24.7%保有・筆頭株主）との強固なアライアンスを形成。大阪・中之島のランドマーク「中之島フェスティバルタワー（ツインタワー）」や東京・築地、銀座など、国内最高峰の超一等地不動産を保有し、年間数百億円規模の不動産賃貸利益を計上する「不動産リッチメディア」。',
      shikihoHeadline: '【中之島ツインタワー等の一等地不動産が利益創出】テレ朝HD持分法益で純資産2,400億超',
      shikihoOutlook: '新聞本業のデジタルシフト（朝日新聞デジタル・Re:ライフ等）を推進しつつ、大阪中之島フェスティバルタワーおよび築地・銀座ビルのオフィス・商業賃料収入が極めて安定した収益柱として機能。',
      shikihoMaterial: '保有するテレビ朝日HD株式（約600億円相当）および都心ビル群の含み益が莫大。展覧会・美術展などの文化イベント事業も全国展開。',
      businessSegments: JSON.stringify([
        { name: '新聞・出版・デジタルメディア事業', ratio: 64.2 },
        { name: '不動産賃貸・ビル運営 (中之島フェスティバルタワー等)', ratio: 22.5 },
        { name: 'イベント・文化事業 (高校野球・美術展・広告等)', ratio: 13.3 }
      ]),
      latestPeriodEnd: '2023-03-31',
      latestNetAssets: 248000.0, // 純資産 約2,480億円
      latestNetIncome: 6200.0,
      latestTotalAssets: 415000.0, // 総資産 約4,150億円
      gazettes: [
        { fiscalPeriod: 170, periodEnd: '2022-03-31', gazetteDate: '2022-06-24', gazetteIssue: '決算公告 (公式HP開示)', totalAssets: 405000.0, totalLiabilities: 164000.0, netAssets: 241000.0, capitalStock: 650.0, capitalSurplus: 15.0, retainedEarnings: 232000.0, netIncome: 5800.0 },
        { fiscalPeriod: 171, periodEnd: '2023-03-31', gazetteDate: '2023-06-23', gazetteIssue: '決算公告 (第171期 決算公告)', totalAssets: 415000.0, totalLiabilities: 167000.0, netAssets: 248000.0, capitalStock: 650.0, capitalSurplus: 15.0, retainedEarnings: 238000.0, netIncome: 6200.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '朝日新聞 社員持株会', shareholderType: 'employee', holdingRatio: 41.5, sharesHeld: 1328000 },
        { rank: 2, shareholderName: '村山家・上野家 (創業家資産管理会社)', shareholderType: 'founder', holdingRatio: 36.8, sharesHeld: 1177600 },
        { rank: 3, shareholderName: '公益財団法人 朝日新聞文化財団', shareholderType: 'corporate', holdingRatio: 12.0, sharesHeld: 384000 }
      ]
    }
  ];

  for (const company of mediaCompanies) {
    const { gazettes, shareholders, ...companyData } = company;

    console.log(`Upserting: ${companyData.name} (${companyData.slug})`);

    const upsertedCompany = await prisma.unlistedCompany.upsert({
      where: { corporateNumber: companyData.corporateNumber },
      update: {
        ...companyData,
      },
      create: {
        ...companyData,
      },
    });

    // 決算公告投入
    for (const g of gazettes) {
      await prisma.officialGazetteReport.upsert({
        where: {
          unlistedCompanyId_fiscalPeriod: {
            unlistedCompanyId: upsertedCompany.id,
            fiscalPeriod: g.fiscalPeriod,
          },
        },
        update: {
          periodEnd: g.periodEnd,
          gazetteDate: g.gazetteDate,
          gazetteIssue: g.gazetteIssue,
          totalAssets: g.totalAssets,
          totalLiabilities: g.totalLiabilities,
          netAssets: g.netAssets,
          capitalStock: g.capitalStock,
          capitalSurplus: g.capitalSurplus,
          retainedEarnings: g.retainedEarnings,
          netIncome: g.netIncome,
        },
        create: {
          unlistedCompanyId: upsertedCompany.id,
          fiscalPeriod: g.fiscalPeriod,
          periodEnd: g.periodEnd,
          gazetteDate: g.gazetteDate,
          gazetteIssue: g.gazetteIssue,
          totalAssets: g.totalAssets,
          totalLiabilities: g.totalLiabilities,
          netAssets: g.netAssets,
          capitalStock: g.capitalStock,
          capitalSurplus: g.capitalSurplus,
          retainedEarnings: g.retainedEarnings,
          netIncome: g.netIncome,
        },
      });
    }

    // 株主名簿投入
    await prisma.unlistedShareholder.deleteMany({
      where: { unlistedCompanyId: upsertedCompany.id },
    });

    for (const sh of shareholders) {
      await prisma.unlistedShareholder.create({
        data: {
          unlistedCompanyId: upsertedCompany.id,
          rank: sh.rank,
          shareholderName: sh.shareholderName,
          shareholderType: sh.shareholderType,
          holdingRatio: sh.holdingRatio,
          sharesHeld: sh.sharesHeld,
        },
      });
    }
  }

  console.log('Successfully seeded all Major Publishers and Newspaper companies!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });