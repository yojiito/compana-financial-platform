export interface CompareEntity {
  id: string;
  name: string;
  enName?: string;
  shortName: string;
  enShortName?: string;
  type: 'listed' | 'unlisted' | 'reit';
  typeLabel: string;
  enTypeLabel?: string;
  badgeColor: string;
  sector: string;
  enSector?: string;
  url: string;
  websiteUrl?: string;
  fiscalPeriodLabel: string;
  enFiscalPeriodLabel?: string;
  scaleLabel: string;
  enScaleLabel?: string;
  scaleValueBillion: number;
  revenueBillion: number;
  operatingIncomeBillion?: number;
  netIncomeBillion: number;
  operatingMarginPct?: number;
  roePct?: number;
  equityRatioPct?: number;
  employeesCount?: string;
  enEmployeesCount?: string;
  avgSalary?: number;
  costAnatomy?: {
    cogsPct: number;
    sgaPct: number;
    laborPct?: number;
    rdPct?: number;
    adPct?: number;
    opMarginPct: number;
    extraNote?: string;
    enExtraNote?: string;
  };
  moats?: string[];
  enMoats?: string[];
  summary?: string;
  enSummary?: string;
}

export const ALL_COMPARE_ENTITIES: CompareEntity[] = [
  // 1. トヨタ自動車
  {
    id: '7203',
    fiscalPeriodLabel: '2024年3月期 通期実績',
    enFiscalPeriodLabel: 'FY2024 Full Year Actual',
    name: 'トヨタ自動車 (7203)',
    enName: 'Toyota Motor Corporation (7203)',
    shortName: 'トヨタ',
    enShortName: 'Toyota',
    type: 'listed',
    typeLabel: '東証プライム',
    enTypeLabel: 'TSE Prime',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    sector: '輸送用機器',
    enSector: 'Automobiles & Transportation',
    url: '/stocks/7203',
    websiteUrl: 'https://global.toyota/',
    scaleLabel: '時価総額',
    enScaleLabel: 'Market Cap',
    scaleValueBillion: 432000,
    revenueBillion: 450953,
    operatingIncomeBillion: 53529,
    netIncomeBillion: 49449,
    operatingMarginPct: 11.9,
    roePct: 16.5,
    equityRatioPct: 39.8,
    employeesCount: '375,000名 (連結)',
    enEmployeesCount: '375,000 (Consolidated)',
    avgSalary: 895,
    costAnatomy: {
      cogsPct: 80.2,
      sgaPct: 7.9,
      laborPct: 8.2,
      rdPct: 2.8,
      adPct: 1.1,
      opMarginPct: 11.9,
      extraNote: 'ジャストインタイム(TPS)による世界最強の量産サプライチェーンとHEV高収益。',
      enExtraNote: 'World-class mass production supply chain via Just-in-Time (TPS) and high HEV profits.'
    },
    moats: [
      '徹底的な原価低減とカイゼンを極めた「トヨタ生産方式 (TPS)」',
      '世界全域（北米・欧州・日本・アジア）でバランスよく稼ぐグローバル販売網',
      'デンソー・アイシン・豊田自動織機等の系列垂直統合サプライチェーン'
    ],
    enMoats: [
      'Toyota Production System (TPS) mastering relentless Kaizen and cost optimization',
      'Well-balanced global distribution network generating steady profits across North America, Europe, Asia, and Japan',
      'Vertically integrated Keiretsu supply chain including DENSO, Aisin, and Toyota Industries'
    ],
    summary: '世界首位の自動車製造・販売グループ。全方位マルチパスウェイ戦略と年間1,000万台超の量産規模。',
    enSummary: 'World-leading automotive group delivering >10 million vehicles annually via a multi-pathway decarbonization strategy.'
  },

  // 2. キーエンス
  {
    id: '6861',
    fiscalPeriodLabel: '2024年3月期 通期実績',
    enFiscalPeriodLabel: 'FY2024 Full Year Actual',
    name: 'キーエンス (6861)',
    enName: 'Keyence Corporation (6861)',
    shortName: 'キーエンス',
    enShortName: 'Keyence',
    type: 'listed',
    typeLabel: '東証プライム',
    enTypeLabel: 'TSE Prime',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    sector: '電気機器 (FAセンサ)',
    enSector: 'Electronics (FA Sensors)',
    url: '/stocks/6861',
    websiteUrl: 'https://www.keyence.co.jp/',
    scaleLabel: '時価総額',
    enScaleLabel: 'Market Cap',
    scaleValueBillion: 168000,
    revenueBillion: 9672,
    operatingIncomeBillion: 4950,
    netIncomeBillion: 3696,
    operatingMarginPct: 51.2,
    roePct: 13.8,
    equityRatioPct: 94.2,
    employeesCount: '10,500名 (連結)',
    enEmployeesCount: '10,500 (Consolidated)',
    avgSalary: 2279,
    costAnatomy: {
      cogsPct: 18.2,
      sgaPct: 30.6,
      laborPct: 15.4,
      rdPct: 3.2,
      adPct: 2.8,
      opMarginPct: 51.2,
      extraNote: '営業利益率51.2%。ファブレス生産と直販コンサルティング営業による圧倒的粗利。',
      enExtraNote: '51.2% operating margin driven by direct-sales consulting and pure fabless model.'
    },
    moats: [
      '新製品の約7割が世界初・業界初という圧倒的な商品企画力',
      '代理店を介さず顧客工場へ直接赴く「直販コンサルティング営業体制」',
      '自社工場を持たず固定費を極小化する完全ファブレス生産モデル'
    ],
    enMoats: [
      'Unrivaled product planning where ~70% of new releases are world-first or industry-first innovations',
      'Direct-sales consulting model solving factory automation issues on-site without distributors',
      'Pure fabless manufacturing model eliminating fixed factory overhead and maximizing gross margins'
    ],
    summary: 'FA用センサ・画像処理機器の世界的リーダー。売上高営業利益率50%超・無借金経営の超高収益体質。',
    enSummary: 'Global leader in factory automation sensors and machine vision, boasting >50% operating margins and zero debt.'
  },

  // 3. 任天堂
  {
    id: '7974',
    fiscalPeriodLabel: '2024年3月期 通期実績',
    enFiscalPeriodLabel: 'FY2024 Full Year Actual',
    name: '任天堂 (7974)',
    enName: 'Nintendo Co., Ltd. (7974)',
    shortName: '任天堂',
    enShortName: 'Nintendo',
    type: 'listed',
    typeLabel: '東証プライム',
    enTypeLabel: 'TSE Prime',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    sector: 'その他製品 (ゲームIP)',
    enSector: 'Consumer Goods (Gaming IP)',
    url: '/stocks/7974',
    websiteUrl: 'https://www.nintendo.co.jp/',
    scaleLabel: '時価総額',
    enScaleLabel: 'Market Cap',
    scaleValueBillion: 104000,
    revenueBillion: 16718,
    operatingIncomeBillion: 5289,
    netIncomeBillion: 4906,
    operatingMarginPct: 31.6,
    roePct: 17.1,
    equityRatioPct: 78.5,
    employeesCount: '7,724名 (連結)',
    enEmployeesCount: '7,724 (Consolidated)',
    avgSalary: 988,
    costAnatomy: {
      cogsPct: 43.1,
      sgaPct: 25.3,
      laborPct: 9.8,
      rdPct: 7.2,
      adPct: 5.4,
      opMarginPct: 31.6,
      extraNote: '自社開発ゲームIP（マリオ・ゼルダ・ポケモン）による極めて強固な独占プラットフォーム。',
      enExtraNote: 'Monopoly gaming platform powered by iconic proprietary IP (Mario, Zelda, Pokemon).'
    },
    moats: [
      'マリオ、ポケモン、ゼルダ等の世界的認知度を誇る最強のキャラクターIP群',
      'ハードウェア（Switch）とソフトウェアの垂直統合エコシステム',
      '無借金経営と2兆円超の手元流動性による強靭な財務安定性'
    ],
    enMoats: [
      'Legendary IP portfolio commanding unmatched global brand power and multi-generational loyalty',
      'Vertically integrated hardware-software gaming ecosystem (Nintendo Switch platform)',
      'Rock-solid balance sheet with zero debt and >¥2 trillion in liquid reserves'
    ],
    summary: '世界最高峰のゲーム機・ゲームソフトメーカー。独自IPと独創的エンタメ体験を提供。',
    enSummary: 'World’s premier entertainment platform delivering beloved proprietary IP and innovative hardware/software synergy.'
  },

  // 4. コーエーテクモHD
  {
    id: '3635',
    fiscalPeriodLabel: '2024年3月期 通期実績',
    enFiscalPeriodLabel: 'FY2024 Full Year Actual',
    name: 'コーエーテクモHD (3635)',
    enName: 'Koei Tecmo Holdings Co., Ltd. (3635)',
    shortName: 'コーエーテクモ',
    enShortName: 'Koei Tecmo',
    type: 'listed',
    typeLabel: '東証プライム',
    enTypeLabel: 'TSE Prime',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    sector: '情報・通信業 (ゲーム・運用)',
    enSector: 'Information & Games / Asset Mgmt',
    url: '/stocks/3635',
    websiteUrl: 'https://www.koeitecmo.co.jp/',
    scaleLabel: '時価総額',
    enScaleLabel: 'Market Cap',
    scaleValueBillion: 5500,
    revenueBillion: 846,
    operatingIncomeBillion: 285,
    netIncomeBillion: 341,
    operatingMarginPct: 33.7,
    roePct: 18.2,
    equityRatioPct: 83.1,
    employeesCount: '2,310名 (連結)',
    enEmployeesCount: '2,310 (Consolidated)',
    avgSalary: 730,
    costAnatomy: {
      cogsPct: 48.2,
      sgaPct: 18.1,
      laborPct: 22.4,
      rdPct: 12.1,
      adPct: 4.2,
      opMarginPct: 33.7,
      extraNote: '歴史シミュレーションIPのマルチ展開に加え、襟川恵子会長による卓越した有価証券運用益。',
      enExtraNote: 'High IP margins combined with exceptional investment management gains led by Chairwoman Keiko Erikawa.'
    },
    moats: [
      '「信長の野望」「三國志」等の代替不可能な長寿歴史シミュレーションIP',
      '襟川恵子会長の運用手腕による安定的な巨額投資収益（営業外収益）',
      '他社有力IPとのコラボ開発（無双シリーズ等）による高い受託開発力'
    ],
    enMoats: [
      'Irreplaceable historical strategy simulation franchises (Nobunaga’s Ambition, Romance of the Three Kingdoms)',
      'Substantial non-operating investment portfolio returns managed by Chairwoman Keiko Erikawa',
      'High-margin IP collaboration and co-development capability (Musou / Warriors series)'
    ],
    summary: '「信長の野望」「三國志」等のIPを創出するゲーム大手。高い利益率と卓越した財務運用力が特徴。',
    enSummary: 'Leading digital entertainment studio known for evergreen strategy IP and world-class investment treasury management.'
  },

  // 5. ソニーグループ
  {
    id: '6758',
    fiscalPeriodLabel: '2024年3月期 通期実績',
    enFiscalPeriodLabel: 'FY2024 Full Year Actual',
    name: 'ソニーグループ (6758)',
    enName: 'Sony Group Corporation (6758)',
    shortName: 'ソニーグループ',
    enShortName: 'Sony Group',
    type: 'listed',
    typeLabel: '東証プライム',
    enTypeLabel: 'TSE Prime',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    sector: '電気機器 (複合コングロマリット)',
    enSector: 'Consumer Electronics & Media Conglomerate',
    url: '/stocks/6758',
    websiteUrl: 'https://www.sony.com/',
    scaleLabel: '時価総額',
    enScaleLabel: 'Market Cap',
    scaleValueBillion: 175000,
    revenueBillion: 130208,
    operatingIncomeBillion: 12088,
    netIncomeBillion: 9706,
    operatingMarginPct: 9.3,
    roePct: 14.2,
    equityRatioPct: 22.4,
    employeesCount: '113,000名 (連結)',
    enEmployeesCount: '113,000 (Consolidated)',
    avgSalary: 1102,
    costAnatomy: {
      cogsPct: 68.4,
      sgaPct: 22.3,
      laborPct: 14.2,
      rdPct: 5.6,
      adPct: 3.8,
      opMarginPct: 9.3,
      extraNote: 'ゲーム（PS5）、音楽（世界首位級）、映画、CMOSイメージセンサーの多角化コングロマリット。',
      enExtraNote: 'Global creative entertainment giant combining PlayStation gaming, music publishing, movies, and CMOS sensors.'
    },
    moats: [
      'PlayStationネットワークの巨大なアクティブユーザー基盤とエコシステム',
      '世界シェアNo.1のCMOSイメージセンサー（半導体）技術力',
      '音楽出版（Sony Music）およびアニメ（Aniplex/Crunchyroll）の世界的配給網'
    ],
    enMoats: [
      'Massive global active user base and subscription ecosystem on PlayStation Network (PSN)',
      'World #1 market share in cutting-edge CMOS image sensors for mobile and autonomous vehicles',
      'Dominant global music publishing catalog and anime distribution infrastructure (Aniplex, Crunchyroll)'
    ],
    summary: 'ゲーム・音楽・映画・半導体・金融を網羅する世界屈指のクリエイティブ・エンタテインメント企業。',
    enSummary: 'Global creative entertainment and technology leader spanning gaming, music, film, semiconductors, and financial services.'
  },

  // 6. 集英社
  {
    id: 'shueisha',
    fiscalPeriodLabel: '2024年5月期 (第83期)',
    enFiscalPeriodLabel: 'FY2024 Full Year Actual',
    name: '集英社 (Shueisha)',
    enName: 'Shueisha Inc.',
    shortName: '集英社',
    enShortName: 'Shueisha',
    type: 'unlisted',
    typeLabel: '未上場メガ出版',
    enTypeLabel: 'Unlisted Publishing Giant',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    sector: '総合出版 / マンガIP / デジタル',
    enSector: 'Publishing / Manga IP / Digital',
    url: '/unlisted/shueisha',
    websiteUrl: 'https://www.shueisha.co.jp/',
    scaleLabel: '純資産',
    enScaleLabel: 'Net Assets',
    scaleValueBillion: 2450,
    revenueBillion: 2096,
    operatingIncomeBillion: 450,
    netIncomeBillion: 162,
    operatingMarginPct: 21.5,
    roePct: 6.8,
    equityRatioPct: 76.2,
    employeesCount: '820名 (単体)',
    enEmployeesCount: '820 (Non-consolidated)',
    avgSalary: 1250,
    costAnatomy: {
      cogsPct: 45.0,
      sgaPct: 33.5,
      laborPct: 12.0,
      rdPct: 1.5,
      adPct: 6.0,
      opMarginPct: 21.5,
      extraNote: '週刊少年ジャンプ発の世界的マンガIP、デジタルアプリ（ジャンプ+）および海外ライセンス収入。',
      enExtraNote: 'Global mega manga IP catalog born in Shonen Jump, with digital app (Jump+) and overseas licensing.'
    },
    moats: [
      '『ONE PIECE』『鬼滅の刃』『呪術廻戦』『チェンソーマン』等の世界的メガヒットIP群',
      'デジタルマンガアプリ「少年ジャンプ+」および海外直接配信「MANGA Plus」の独占基盤',
      '純資産2,450億円・利益剰余金2,300億円を誇る完全無借金の超健全財務'
    ],
    enMoats: [
      'Global blockbuster IP franchises including ONE PIECE, Demon Slayer, Jujutsu Kaisen, and SPY×FAMILY',
      'Proprietary direct digital platforms: Shonen Jump+ app and MANGA Plus global distribution',
      'Uncompromising financial fortress with ¥245B in net assets and massive accumulated retained earnings'
    ],
    summary: '『週刊少年ジャンプ』を擁する国内最高峰のマンガ・コンテンツ出版社。世界的ヒットIPを多数保有。',
    enSummary: 'Japan’s premier IP publishing powerhouse behind Weekly Shonen Jump, generating massive global anime and licensing revenues.'
  },

  // 7. 講談社
  {
    id: 'kodansha',
    fiscalPeriodLabel: '2023年11月期 (第85期)',
    enFiscalPeriodLabel: 'FY2023 Full Year Actual',
    name: '講談社 (Kodansha)',
    enName: 'Kodansha Ltd.',
    shortName: '講談社',
    enShortName: 'Kodansha',
    type: 'unlisted',
    typeLabel: '未上場メガ出版',
    enTypeLabel: 'Unlisted Publishing Giant',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    sector: '総合出版 / デジタルIP / エンタメ',
    enSector: 'Publishing / Digital IP / Entertainment',
    url: '/unlisted/kodansha',
    websiteUrl: 'https://www.kodansha.co.jp/',
    scaleLabel: '純資産',
    enScaleLabel: 'Net Assets',
    scaleValueBillion: 1685,
    revenueBillion: 1720,
    operatingIncomeBillion: 205,
    netIncomeBillion: 145,
    operatingMarginPct: 11.9,
    roePct: 8.9,
    equityRatioPct: 68.5,
    employeesCount: '980名 (単体)',
    enEmployeesCount: '980 (Non-consolidated)',
    avgSalary: 1180,
    costAnatomy: {
      cogsPct: 52.0,
      sgaPct: 36.1,
      laborPct: 13.5,
      rdPct: 2.0,
      adPct: 7.2,
      opMarginPct: 11.9,
      extraNote: '『進撃の巨人』『ブルーロック』等による北米・欧州でのデジタル版権売上の急伸。',
      enExtraNote: 'Surging digital publishing and anime licensing in North America & Europe driven by Attack on Titan and Blue Lock.'
    },
    moats: [
      '『進撃の巨人』『ブルーロック』『東京卍リベンジャーズ』等のグローバル展開力',
      'デジタル・海外事業売上が紙の出版物を逆転した先進的なIP収益構造',
      '1909年創業の信頼と音羽グループの中核を担うブランド力'
    ],
    enMoats: [
      'Global anime adaptation and licensing prowess (Attack on Titan, Blue Lock, Tokyo Revengers)',
      'Digital and overseas copyright revenues successfully overtaking legacy print publications',
      'Heritage brand prestige and extensive publishing catalog cultivated since 1909'
    ],
    summary: '「おもしろくて、ためになる」を社是とする総合出版大手。海外展開とデジタル化で急成長。',
    enSummary: 'Historic mega publishing company evolving rapidly into a high-margin global IP licensing and digital media titan.'
  },

  // 8. 日本経済新聞社
  {
    id: 'nikkei',
    fiscalPeriodLabel: '2023年12月期 (第152期)',
    enFiscalPeriodLabel: 'FY2023 Full Year Actual',
    name: '日本経済新聞社 (Nikkei)',
    enName: 'Nikkei Inc. (The Nikkei)',
    shortName: '日経新聞',
    enShortName: 'Nikkei',
    type: 'unlisted',
    typeLabel: '未上場メガ新聞',
    enTypeLabel: 'Unlisted Media Giant',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    sector: '経済報道 / 金融情報 / メディア',
    enSector: 'Financial Media & Economic Intelligence',
    url: '/unlisted/nikkei',
    websiteUrl: 'https://www.nikkei.co.jp/',
    scaleLabel: '純資産',
    enScaleLabel: 'Net Assets',
    scaleValueBillion: 2850,
    revenueBillion: 3650,
    operatingIncomeBillion: 220,
    netIncomeBillion: 165,
    operatingMarginPct: 6.0,
    roePct: 5.9,
    equityRatioPct: 65.4,
    employeesCount: '3,050名 (単体)',
    enEmployeesCount: '3,050 (Non-consolidated)',
    avgSalary: 1280,
    costAnatomy: {
      cogsPct: 58.0,
      sgaPct: 36.0,
      laborPct: 24.5,
      rdPct: 3.5,
      adPct: 4.2,
      opMarginPct: 6.0,
      extraNote: '日経電子版（有料会員100万人超）、FT（フィナンシャル・タイムズ）、QUICK情報端末。',
      enExtraNote: 'Nikkei Online (1M+ paid subscribers), Financial Times (FT Group), and QUICK data terminals.'
    },
    moats: [
      '日本のビジネスパーソンに不可欠な「日経電子版」（有料会員数国内No.1）',
      '世界的権威を誇る英『フィナンシャル・タイムズ（FT）』の完全傘下保有',
      '金融情報ベンダー「QUICK」および日経平均株価（Nikkei 225）の指数ライセンス独占'
    ],
    enMoats: [
      'Japan’s indisputable #1 paid business news subscription network (The Nikkei Digital)',
      '100% ownership of the Financial Times (FT Group), establishing premier global financial authority',
      'Proprietary data terminals (QUICK) and exclusive licensing rights to the Nikkei 225 equity benchmark'
    ],
    summary: '日本を代表する経済総合報道・情報グループ。英FTの買収により世界的経済メディアへ飛躍。',
    enSummary: 'Japan’s premier financial and economic media conglomerate, operating The Nikkei, FT, and the Nikkei 225 index.'
  },

  // 9. 朝日新聞社
  {
    id: 'asahi',
    fiscalPeriodLabel: '2024年3月期 (第171期)',
    enFiscalPeriodLabel: 'FY2024 Full Year Actual',
    name: '朝日新聞社 (Asahi)',
    enName: 'The Asahi Shimbun Company',
    shortName: '朝日新聞',
    enShortName: 'Asahi Shimbun',
    type: 'unlisted',
    typeLabel: '未上場メガ新聞',
    enTypeLabel: 'Unlisted Media Giant',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    sector: '新聞報道 / 不動産 / メディア',
    enSector: 'National Newspaper & Prime Real Estate',
    url: '/unlisted/asahi',
    websiteUrl: 'https://www.asahi.com/',
    scaleLabel: '純資産',
    enScaleLabel: 'Net Assets',
    scaleValueBillion: 2480,
    revenueBillion: 2520,
    operatingIncomeBillion: 95,
    netIncomeBillion: 62,
    operatingMarginPct: 3.8,
    roePct: 2.5,
    equityRatioPct: 62.1,
    employeesCount: '3,800名 (単体)',
    enEmployeesCount: '3,800 (Non-consolidated)',
    avgSalary: 1150,
    costAnatomy: {
      cogsPct: 62.0,
      sgaPct: 34.2,
      laborPct: 26.0,
      rdPct: 1.8,
      adPct: 3.5,
      opMarginPct: 3.8,
      extraNote: '中之島フェスティバルタワー等の超一等地不動産賃貸が新聞本業の減収を強力に下支え。',
      enExtraNote: 'High-margin prime urban real estate leasing (Nakanoshima Festival Tower, Ginza) heavily anchors earnings.'
    },
    moats: [
      '大阪・中之島フェスティバルタワーや東京・築地・銀座等の膨大な超一等地不動産ポートフォリオ',
      'テレビ朝日ホールディングス（持分法適用会社・筆頭株主）との強固なメディア同盟',
      '全国高校野球選手権（夏の甲子園）主催権による国民的ブランド認知'
    ],
    enMoats: [
      'Extensive ultra-prime commercial real estate portfolio (Nakanoshima Festival Tower twin towers, Ginza)',
      'Strategic media cornerstone as the largest shareholder (24.7%) of TV Asahi Holdings',
      'Exclusive ownership and national stewardship of the National High School Baseball Championship (Koshien)'
    ],
    summary: '1879年創刊の全国紙。都心一等地の巨大不動産賃貸事業とメディア複合体を形成。',
    enSummary: 'Leading quality national newspaper publisher backed by valuable prime real estate holdings and TV Asahi affiliation.'
  },

  // 10. 日本ビルファンド (NBF)
  {
    id: '8951',
    fiscalPeriodLabel: '2024年6月期 (第46期)',
    enFiscalPeriodLabel: 'FY2024 Full Year Actual',
    name: '日本ビルファンド投資法人 (8951)',
    enName: 'Nippon Building Fund Inc. (8951)',
    shortName: 'NBF',
    enShortName: 'NBF (8951)',
    type: 'reit',
    typeLabel: '東証REIT',
    enTypeLabel: 'TSE REIT',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    sector: 'オフィス特化型REIT',
    enSector: 'Office Specialized REIT',
    url: '/reits/8951',
    websiteUrl: 'https://www.nbf-m.com/',
    scaleLabel: '時価総額',
    enScaleLabel: 'Market Cap',
    scaleValueBillion: 9850,
    revenueBillion: 520,
    operatingIncomeBillion: 265,
    netIncomeBillion: 236,
    operatingMarginPct: 51.0,
    roePct: 6.0,
    equityRatioPct: 54.1,
    employeesCount: '資産運用会社委託',
    enEmployeesCount: 'Asset Mgmt Outsourced',
    avgSalary: undefined,
    costAnatomy: {
      cogsPct: 38.5,
      sgaPct: 10.5,
      laborPct: 3.5,
      rdPct: 0.0,
      adPct: 1.2,
      opMarginPct: 51.0,
      extraNote: '新宿三井ビル、グラントウキョウ等の都心Sクラス超高層ビルによる高稼働・高賃料。',
      enExtraNote: 'High occupancy and premier rents driven by Grade-S skyscrapers (Shinjuku Mitsui Bldg, GranTokyo South).'
    },
    moats: [
      '三井不動産の総合力を活かした東京都心5区（千代田・中央・港・新宿・渋谷）の最高峰オフィスビル網',
      '国内J-REIT時価総額No.1（約1兆円規模）の圧倒的流動性と信用格付け（AA+）',
      '平均稼働率97%超を維持する強固な優良テナントリテンション力'
    ],
    enMoats: [
      'Premier portfolio of Grade-S/A skyscrapers in central Tokyo sponsored by Mitsui Fudosan',
      'Japan #1 REIT market cap (~¥1 trillion) with top-tier credit ratings (JCR: AA+ / R&I: AA+)',
      'Consistently high portfolio occupancy rate (>97.4%) with premier blue-chip tenant retention'
    ],
    summary: '国内最大のオフィス特化型J-REIT。三井不動産がスポンサーで都心超高層ビルを多数保有。',
    enSummary: 'Largest office J-REIT in Japan, investing heavily in prime Tokyo Grade-S skyscrapers sponsored by Mitsui Fudosan.'
  },

  // 11. ジャパンリアルエステイト (JRE)
  {
    id: '8952',
    fiscalPeriodLabel: '2024年3月期 (第45期)',
    enFiscalPeriodLabel: 'FY2024 Full Year Actual',
    name: 'ジャパンリアルエステイト投資法人 (8952)',
    enName: 'Japan Real Estate Investment Corporation (8952)',
    shortName: 'JRE',
    enShortName: 'JRE (8952)',
    type: 'reit',
    typeLabel: '東証REIT',
    enTypeLabel: 'TSE REIT',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    sector: 'オフィス特化型REIT',
    enSector: 'Office Specialized REIT',
    url: '/reits/8952',
    websiteUrl: 'https://www.j-re.co.jp/',
    scaleLabel: '時価総額',
    enScaleLabel: 'Market Cap',
    scaleValueBillion: 7600,
    revenueBillion: 410,
    operatingIncomeBillion: 215,
    netIncomeBillion: 192,
    operatingMarginPct: 52.4,
    roePct: 5.8,
    equityRatioPct: 52.8,
    employeesCount: '資産運用会社委託',
    enEmployeesCount: 'Asset Mgmt Outsourced',
    avgSalary: undefined,
    costAnatomy: {
      cogsPct: 37.8,
      sgaPct: 9.8,
      laborPct: 3.2,
      rdPct: 0.0,
      adPct: 1.0,
      opMarginPct: 52.4,
      extraNote: '大手町パークビル、汐留ビル等の三菱地所パイプライン物件による安定キャッシュフロー。',
      enExtraNote: 'Stable cash flows from prime Mitsubishi Estate pipeline properties (Otemachi Park Bldg, Shiodome).'
    },
    moats: [
      '三菱地所グループの丸の内・大手町再開発パイプライン物件を優先取得できる強み',
      '大手町パークビルディングや汐留ビルディングなど国内最高グレードのオフィスビル資産',
      '分配金利回り4.2%超・NAV倍率0.85倍という高い投資妙味'
    ],
    enMoats: [
      'Priority acquisition pipeline for prime Marunouchi and Otemachi assets sponsored by Mitsubishi Estate',
      'Top-tier flagship properties including Otemachi Park Building and Akasaka Park Building',
      'Attractive yield profile with >4.2% distribution yield and deep-value 0.85x NAV multiple'
    ],
    summary: '三菱地所をスポンサーとする国内屈指のオフィスREIT。丸の内・大手町エリアに強み。',
    enSummary: 'Leading office J-REIT sponsored by Mitsubishi Estate, with concentrated prime assets in Marunouchi and Otemachi.'
  }
];