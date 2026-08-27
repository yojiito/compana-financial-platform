export interface UnlistedHoldingItem {
  id: string;
  targetName: string;
  targetEnName: string;
  tickerCode?: string;
  category: 'listed_strategic' | 'group_subsidiary' | 'cvc_pure_investment';
  categoryLabel: string;
  enCategoryLabel: string;
  purpose: string;
  enPurpose: string;
  holdingRatioPct?: number;
  sharesHeld?: string;
  estimatedValueOku?: number; // 億円
  officialSource: string;
  enOfficialSource: string;
  strategicSynergy: string;
  enStrategicSynergy: string;
}

export const UNLISTED_INVESTMENTS_DATA: Record<string, UnlistedHoldingItem[]> = {
  // ① 株式会社朝日新聞社 (Asahi)
  'asahi': [
    {
      id: 'asahi-tv-asahi',
      targetName: '株式会社テレビ朝日ホールディングス (9409)',
      targetEnName: 'TV Asahi Holdings Corporation (9409)',
      tickerCode: '9409',
      category: 'listed_strategic',
      categoryLabel: '上場持合い ＆ 政策保有 (持分法関連会社)',
      enCategoryLabel: 'Cross-Shareholding & Strategic Equity (Equity-Method Affiliate)',
      purpose: '放送・報道ネットワーク連携 ＆ 相互保有協定',
      enPurpose: 'Broadcast journalism alliance & mutual shareholding covenant',
      holdingRatioPct: 20.21,
      sharesHeld: '21,151,840株',
      estimatedValueOku: 650,
      officialSource: 'テレビ朝日HD 有価証券報告書 (EDINET: E04391) / 大株主の状況',
      enOfficialSource: 'TV Asahi HD Securities Report (EDINET: E04391) / Major Shareholders',
      strategicSynergy: 'ANN系列（All-Nippon News Network）の中核キー局として報道・番組制作で全面連携。有報記載の相互保有協定に基づき安定保有。',
      enStrategicSynergy: 'Core strategic partner in ANN broadcasting network. Maintained under mutual shareholding agreement.'
    },
    {
      id: 'asahi-asahi-broadcasting',
      targetName: '朝日放送グループホールディングス株式会社 (9405)',
      targetEnName: 'Asahi Broadcasting Group Holdings Corporation (9405)',
      tickerCode: '9405',
      category: 'listed_strategic',
      categoryLabel: '上場持合い ＆ 政策保有 (準キー局)',
      enCategoryLabel: 'Strategic Equity (Regional Semi-Key Station)',
      purpose: '関西圏における放送・ニュース配信アライアンス',
      enPurpose: 'Broadcasting & news distribution alliance in Kansai region',
      holdingRatioPct: 15.3,
      sharesHeld: '6,400,000株',
      estimatedValueOku: 60,
      officialSource: '朝日放送グループHD 有価証券報告書 (EDINET: E04381)',
      enOfficialSource: 'Asahi Broadcasting Group HD Securities Report (EDINET: E04381)',
      strategicSynergy: '大阪・中之島を拠点とする関西準キー局との強固な資本提携。',
      enStrategicSynergy: 'Solid cross-capital alliance with Kansai flagship network broadcaster in Osaka Nakanoshima.'
    },
    {
      id: 'asahi-toyo-keizai',
      targetName: '株式会社東洋経済新報社',
      targetEnName: 'Toyo Keizai Inc.',
      category: 'group_subsidiary',
      categoryLabel: '経済出版・メディア資本提携',
      enCategoryLabel: 'Financial Publishing & Strategic Alliance',
      purpose: '経済ニュース・出版分野での協業',
      enPurpose: 'Editorial & economic journalism collaboration',
      officialSource: '公式開示・資本提携発表',
      enOfficialSource: 'Official corporate disclosure & publishing partnership',
      strategicSynergy: '週刊東洋経済や四季報データ等の経済情報ネットワーク連携。',
      enStrategicSynergy: 'Content integration and economic data syndication.'
    }
  ],

  // ② 株式会社読売新聞グループ本社 (Yomiuri)
  'yomiuri': [
    {
      id: 'yomiuri-ntv-hd',
      targetName: '日本テレビホールディングス株式会社 (9404)',
      targetEnName: 'Nippon Television Holdings, Inc. (9404)',
      tickerCode: '9404',
      category: 'listed_strategic',
      categoryLabel: '上場持合い ＆ 政策保有 (筆頭株主・持分法)',
      enCategoryLabel: 'Cross-Shareholding & Strategic Equity (Lead Shareholder)',
      purpose: 'NNN/NNSテレビ放送系列の中核統括 ＆ メディアコングロマリット',
      enPurpose: 'Central governance of NNN/NNS broadcast network & media conglomerate',
      holdingRatioPct: 14.95,
      sharesHeld: '39,400,000株',
      estimatedValueOku: 1050,
      officialSource: '日本テレビHD 有価証券報告書 (EDINET: E04374) / 大株主の状況',
      enOfficialSource: 'Nippon TV HD Securities Report (EDINET: E04374) / Major Shareholders',
      strategicSynergy: '読売新聞東京本社(6.33%)・読売テレビ(6.80%)と合わせ、読売グループ全体で約28%を保有する中核基幹会社。',
      enStrategicSynergy: 'Combined with Yomiuri Tokyo (6.33%) & YTV (6.80%), the Yomiuri Group holds ~28% total equity.'
    },
    {
      id: 'yomiuri-giants',
      targetName: '株式会社読売巨人軍 (読売ジャイアンツ)',
      targetEnName: 'Yomiuri Giants Co., Ltd.',
      category: 'group_subsidiary',
      categoryLabel: '100% 連結子会社 (プロスポーツ)',
      enCategoryLabel: '100% Wholly Owned Subsidiary (Pro Sports)',
      purpose: '日本プロ野球（NPB）名門球団の運営 ＆ 東京ドーム興行',
      enPurpose: 'Ownership and management of NPB flagship baseball franchise',
      holdingRatioPct: 100.0,
      officialSource: '読売新聞グループ公式開示・会社案内',
      enOfficialSource: 'Yomiuri Shimbun Group Official Corporate Profile',
      strategicSynergy: '東京ドームでの巨人戦興行、グッズ、放映権、ファンクラブ事業を統括。',
      enStrategicSynergy: 'Controls game operations, merchandising, broadcasting rights, and fan engagement.'
    },
    {
      id: 'yomiuri-land',
      targetName: '株式会社よみうりランド',
      targetEnName: 'Yomiuriland Co., Ltd.',
      category: 'group_subsidiary',
      categoryLabel: '完全子会社化 (TOB買収・レジャー不動産)',
      enCategoryLabel: 'Wholly Owned (Privatized via TOB / Real Estate & Theme Park)',
      purpose: '遊園地・エンタメ施設および広大な首都圏保有不動産の開発',
      enPurpose: 'Theme park entertainment & prime suburban real estate development',
      holdingRatioPct: 100.0,
      officialSource: 'TOB公開買付届出書 (関東財務局)',
      enOfficialSource: 'Tender Offer Filing (Kanto Local Finance Bureau)',
      strategicSynergy: '三井不動産と連携したTOBにより非公開化し、エンタメ・競馬場・フラワーパーク等の優良資産を一体運営。',
      enStrategicSynergy: 'Privatized via joint TOB with Mitsui Fudosan to integrate prime real estate and entertainment.'
    }
  ],

  // ③ 株式会社日本経済新聞社 (Nikkei)
  'nikkei': [
    {
      id: 'nikkei-tv-tokyo-hd',
      targetName: '株式会社テレビ東京ホールディングス (9413)',
      targetEnName: 'TV TOKYO Holdings Corporation (9413)',
      tickerCode: '9413',
      category: 'listed_strategic',
      categoryLabel: '上場親会社 ＆ 筆頭株主 (持分法・連結)',
      enCategoryLabel: 'Listed Parent & Lead Shareholder (Equity-Method / Affiliated)',
      purpose: 'TXN系列キー局・アニメ・経済報道のグループ中核統合',
      enPurpose: 'Flagship TXN television broadcasting, anime IP & economic journalism',
      holdingRatioPct: 33.35,
      sharesHeld: '9,500,000株',
      estimatedValueOku: 320,
      officialSource: 'テレビ東京HD 有価証券報告書 (EDINET: E24624) / 大株主の状況',
      enOfficialSource: 'TV TOKYO HD Securities Report (EDINET: E24624) / Major Shareholders',
      strategicSynergy: '日経新聞が3割以上の議決権を直接保有する親会社として、WBS（ワールドビジネスサテライト）等の経済報道を共同制作。',
      enStrategicSynergy: 'Direct parent holding over 33% voting power, co-producing flagship financial news including WBS.'
    },
    {
      id: 'nikkei-financial-times',
      targetName: 'The Financial Times Limited (英国FTグループ)',
      targetEnName: 'The Financial Times Limited (UK FT Group)',
      category: 'group_subsidiary',
      categoryLabel: '100% 海外買収子会社 (グローバル経済報道)',
      enCategoryLabel: '100% Overseas Wholly Owned Subsidiary (Global Financial Media)',
      purpose: '世界最高峰の英文経済日刊紙 ＆ デジタル購読網（有料会員130万人）',
      enPurpose: 'World-renowned English financial daily & digital subscription powerhouse (1.3M+ subs)',
      holdingRatioPct: 100.0,
      estimatedValueOku: 1600,
      officialSource: '2015年買収開示 (買収対価: 約8.44億ポンド / 1,600億円)',
      enOfficialSource: 'Official Acquisition Filing 2015 (Purchase Price: £844M / ¥160B)',
      strategicSynergy: '日経とFTの合計デジタル有料会員は250万人超となり、グローバル経済メディアとして世界トップクラスのプレゼンスを確立。',
      enStrategicSynergy: 'Combined global digital subscribers exceed 2.5 million, forming one of the largest financial news platforms globally.'
    },
    {
      id: 'nikkei-quick',
      targetName: '株式会社QUICK',
      targetEnName: 'QUICK Corp.',
      category: 'group_subsidiary',
      categoryLabel: '連結子会社 (金融情報ベンダー)',
      enCategoryLabel: 'Consolidated Subsidiary (Financial Market Data Provider)',
      purpose: 'リアルタイム金融端末・株価指数配信・機関投資家向けデータ基盤',
      enPurpose: 'Real-time financial market terminals, indices & institutional data infrastructure',
      holdingRatioPct: 80.0,
      officialSource: '日経グループ公式有報開示',
      enOfficialSource: 'Nikkei Group Official Financial Disclosure',
      strategicSynergy: '国内金融機関・証券会社に不可欠なマーケット情報端末を提供。日経平均株価（Nikkei 225）の算出・ライセンス管理を担う。',
      enStrategicSynergy: 'Provides mission-critical financial terminals to Japanese institutions and calculates the Nikkei 225 index.'
    }
  ],

  // ④ 株式会社小学館 (Shogakukan)
  'shogakukan': [
    {
      id: 'shogakukan-shueisha',
      targetName: '株式会社集英社',
      targetEnName: 'Shueisha Inc.',
      category: 'group_subsidiary',
      categoryLabel: '主要出資先 ＆ 一ツ橋グループ中核 (設立母体)',
      enCategoryLabel: 'Core Group Investment & Founding Entity',
      purpose: '一ツ橋グループにおけるマンガ・エンタメIP・雑誌出版の共同展開',
      enPurpose: 'Joint comic IP development & magazine publishing across Hitotsubashi Group',
      officialSource: '集英社公式沿革・一ツ橋グループ公認出資関係',
      enOfficialSource: 'Shueisha Official Corporate History & Group Filings',
      strategicSynergy: '1926年に小学館の娯楽出版部門が独立して設立。週刊少年ジャンプ等世界的人気IPを生む集英社の主要出資母体。',
      enStrategicSynergy: 'Founded in 1926 as a spin-off of Shogakukan entertainment division; holds major equity in Shueisha.'
    },
    {
      id: 'shogakukan-hakusensha',
      targetName: '株式会社白泉社',
      targetEnName: 'Hakusensha, Inc.',
      category: 'group_subsidiary',
      categoryLabel: '100% 連結子会社 (少女マンガ・アニメ)',
      enCategoryLabel: '100% Wholly Owned Subsidiary (Shojo Manga & Anime)',
      purpose: '『花とゆめ』『LaLa』『ヤングアニマル』『ベルセルク』等の独自IP出版',
      enPurpose: 'Publishing acclaimed manga titles including Berserk, Hana to Yume, and LaLa',
      holdingRatioPct: 100.0,
      officialSource: '白泉社公式会社概要・グループ統括開示',
      enOfficialSource: 'Hakusensha Official Corporate Disclosures',
      strategicSynergy: '少女マンガ・青年コミック特化の独立レーベルとしてグループ内IP多角化を推進。',
      enStrategicSynergy: 'Operates as specialized shojo and seinen manga publisher within the group.'
    },
    {
      id: 'shogakukan-viz-media',
      targetName: 'VIZ Media, LLC (米国サンフランシスコ)',
      targetEnName: 'VIZ Media, LLC (San Francisco, USA)',
      category: 'group_subsidiary',
      categoryLabel: '共同出資 北米最大手マンガ配給会社',
      enCategoryLabel: 'Joint Venture / Largest Manga Publisher in North America',
      purpose: '北米・欧米英語圏における『名探偵コナン』『NARUTO』『ONE PIECE』等の英語翻訳出版・アニメライセンス配給',
      enPurpose: 'English translation publishing & anime licensing across North America',
      officialSource: 'VIZ Media LLC Official Corporate Filing / 集英社・小学館共同出資',
      enOfficialSource: 'VIZ Media LLC Official Corporate Filings (Jointly owned with Shueisha & ShoPro)',
      strategicSynergy: '小学館・集英社・小学館集英社プロダクション（ShoPro）の3社で共同保有するグローバル展開の最重要ハブ。',
      enStrategicSynergy: 'Primary international distribution hub jointly owned by Shogakukan, Shueisha, and ShoPro.'
    },
    {
      id: 'shogakukan-shopro',
      targetName: '株式会社小学館集英社プロダクション (ShoPro)',
      targetEnName: 'Shogakukan-Shueisha Productions Co., Ltd. (ShoPro)',
      category: 'group_subsidiary',
      categoryLabel: 'グループ中核IPライセンス・キャラクター事業',
      enCategoryLabel: 'Core IP Licensing & Merchandising Subsidiary',
      purpose: '『ポケットモンスター』『名探偵コナン』『ドラえもん』等のアニメ製作委員会主導・教育事業',
      enPurpose: 'Anime production committee management (Pokemon, Conan, Doraemon) & educational media',
      officialSource: 'ShoPro公式会社概要',
      enOfficialSource: 'ShoPro Official Corporate Registry',
      strategicSynergy: '劇場版映画の製作委員会出資およびキャラクター商品化ライセンスを包括管理。',
      enStrategicSynergy: 'Comprehensive management of theatrical anime production and global character merchandising.'
    }
  ],

  // ⑤ 株式会社講談社 (Kodansha)
  'kodansha': [
    {
      id: 'kodansha-king-records',
      targetName: 'キングレコード株式会社 (KING RECORDS)',
      targetEnName: 'King Record Co., Ltd.',
      category: 'group_subsidiary',
      categoryLabel: '中核音楽・アニメ音響子会社 (音羽グループ)',
      enCategoryLabel: 'Core Music & Anime Soundtrack Subsidiary',
      purpose: 'アニメ主題歌・声優アーティスト・劇伴サウンドトラックの自社製作・音楽原盤権保有',
      enPurpose: 'Anime theme song production, voice-actor music & master recording rights',
      officialSource: 'キングレコード公式会社案内・講談社グループ開示',
      enOfficialSource: 'King Records Official Corporate Profile & Kodansha Group Filings',
      strategicSynergy: '『進撃の巨人』『魔法少女リリカルなのは』『エヴァンゲリオン（旧劇）』など数々のアニメ音楽・映像ソフトを内製化。',
      enStrategicSynergy: 'In-house production of hit anime music soundtracks and home video distribution.'
    },
    {
      id: 'kodansha-kobunsha',
      targetName: '株式会社光文社',
      targetEnName: 'Kobunsha Co., Ltd.',
      category: 'group_subsidiary',
      categoryLabel: '音羽グループ中核出版社',
      enCategoryLabel: 'Core Otowa Group Publishing Affiliate',
      purpose: '『VERY』『CLASSY.』『JJ』『FLASH』等の女性誌・写真週刊誌・光文社新書',
      enPurpose: 'Leading fashion magazines (VERY, CLASSY.), photo journalism, and paperback non-fiction',
      officialSource: '光文社公式会社案内',
      enOfficialSource: 'Kobunsha Official Disclosures',
      strategicSynergy: '女性ファッション誌および一般教養書籍における音羽グループの強力なブランド網を構築。',
      enStrategicSynergy: 'Strengthens Otowa Group dominance in women’s lifestyle and non-fiction publishing.'
    },
    {
      id: 'kodansha-usa',
      targetName: 'Kodansha USA Publishing, LLC (米国ニューヨーク)',
      targetEnName: 'Kodansha USA Publishing, LLC (New York, USA)',
      category: 'group_subsidiary',
      categoryLabel: '100% 北米英語圏直営パブリッシャー',
      enCategoryLabel: '100% Direct North American Publishing Hub',
      purpose: '英語圏における講談社IP（進撃の巨人・ブルーロック等）のダイレクト出版・デジタル配信',
      enPurpose: 'Direct English localization, publishing & digital distribution in Western markets',
      holdingRatioPct: 100.0,
      officialSource: '講談社公式リリース・Kodansha USA Corporate Profile',
      enOfficialSource: 'Kodansha Official Release & Kodansha USA Filings',
      strategicSynergy: '現地流通を中抜きし、講談社が100%の版権利益を直接享受するグローバル直販体制。',
      enStrategicSynergy: 'Direct publishing model capturing 100% licensing margin in international markets.'
    }
  ],

  // ⑥ サントリーホールディングス株式会社 (Suntory HD)
  'suntory-hd': [
    {
      id: 'suntory-food-intl',
      targetName: 'サントリー食品インターナショナル株式会社 (2587)',
      targetEnName: 'Suntory Beverage & Food Limited (2587)',
      tickerCode: '2587',
      category: 'listed_strategic',
      categoryLabel: '上場中核親会社 (東証プライム・約60%保有)',
      enCategoryLabel: 'Listed Flagship Subsidiary (~60% Majority Parent)',
      purpose: '『天然水』『BOSS』『伊右衛門』『オランジーナ』等の清涼飲料グローバル展開',
      enPurpose: 'Global non-alcoholic beverage powerhouse (BOSS, Tennensui, Orangina, Lucozade)',
      holdingRatioPct: 59.48,
      sharesHeld: '183,800,000株',
      estimatedValueOku: 9200,
      officialSource: 'サントリー食品インターナショナル 有価証券報告書 (EDINET: E30058)',
      enOfficialSource: 'Suntory Beverage & Food Securities Report (EDINET: E30058)',
      strategicSynergy: '時価総額約1.5兆円の東証プライム上場子会社。サントリーHDの強固なキャッシュフロー源泉。',
      enStrategicSynergy: '¥1.5T market cap subsidiary serving as a primary dividend generator for Suntory HD.'
    },
    {
      id: 'suntory-beam',
      targetName: 'Suntory Global Spirits Inc. (旧 Beam Suntory / 米国シカゴ)',
      targetEnName: 'Suntory Global Spirits Inc. (formerly Beam Suntory / Chicago, USA)',
      category: 'group_subsidiary',
      categoryLabel: '100% 海外買収子会社 (世界第3位のプレミアムスピリッツ)',
      enCategoryLabel: '100% Overseas Wholly Owned Subsidiary (World #3 Premium Spirits)',
      purpose: '『Jim Beam』『Maker’s Mark』『山崎』『白州』『響』等の世界プレミアムウイスキー統括',
      enPurpose: 'Global bourbon & Japanese whisky portfolio (Jim Beam, Maker’s Mark, Yamazaki, Hakushu)',
      holdingRatioPct: 100.0,
      estimatedValueOku: 16000,
      officialSource: '2014年買収開示 (買収対価: 160億ドル / 約1.65兆円)',
      enOfficialSource: '2014 Acquisition Filing ($16.0B / ¥1.65T mega-acquisition)',
      strategicSynergy: '世界第3位の洋酒スピリッツ企業として、北米・欧州・新興国における圧倒的なプレミアム販売網を保有。',
      enStrategicSynergy: 'World’s 3rd largest premium spirits enterprise with unmatched global distribution power.'
    }
  ],

  // ⑦ 株式会社Preferred Networks (PFN)
  'preferred-networks': [
    {
      id: 'pfn-preferred-elements',
      targetName: '株式会社Preferred Elements',
      targetEnName: 'Preferred Elements Inc.',
      category: 'group_subsidiary',
      categoryLabel: '100% LLM・生成AI特化子会社',
      enCategoryLabel: '100% Generative AI & Frontier LLM Subsidiary',
      purpose: '独自国産基盤モデル「PLaMo」およびマルチモーダルAIの研究開発・商用提供',
      enPurpose: 'Research & commercialization of proprietary foundation LLM "PLaMo"',
      holdingRatioPct: 100.0,
      officialSource: 'PFN公式プレスリリース (2023年設立)',
      enOfficialSource: 'PFN Official Press Release (Established 2023)',
      strategicSynergy: 'フルスクラッチ開発の高性能日本語・多言語LLM基盤を企業向けにAPI提供。',
      enStrategicSynergy: 'Commercializes high-efficiency multilingual foundation models built from scratch.'
    },
    {
      id: 'pfn-computational-chem',
      targetName: '株式会社Preferred Computational Chemistry (PFCC)',
      targetEnName: 'Preferred Computational Chemistry, Inc.',
      category: 'group_subsidiary',
      categoryLabel: 'ENEOSとの戦略的合弁会社 (マテリアルズ・インフォマティクス)',
      enCategoryLabel: 'Strategic Joint Venture with ENEOS (Materials Informatics)',
      purpose: '原子シミュレータ「Matlantis」のグローバル展開',
      enPurpose: 'Global distribution of high-speed universal neural network atomistic simulator "Matlantis"',
      officialSource: 'PFN & ENEOS 共同開示',
      enOfficialSource: 'PFN & ENEOS Joint Corporate Release',
      strategicSynergy: '新素材・半導体材料・電池材料の探索計算速度を従来の1万倍〜数千万倍に高速化。',
      enStrategicSynergy: 'Accelerates new material and battery simulation by up to 10,000,000x using deep learning.'
    }
  ],

  // ⑧ 株式会社SmartHR (SmartHR)
  'smarthr': [
    {
      id: 'smarthr-space-cvc',
      targetName: 'SmartHR Space (CVC投資事業 / HRテック純投資ポートフォリオ)',
      targetEnName: 'SmartHR Space (Corporate VC / HR-Tech Pure Investment Portfolio)',
      category: 'cvc_pure_investment',
      categoryLabel: 'CVC純投資 ＆ シナジー出資',
      enCategoryLabel: 'Corporate VC Pure Investment & SaaS Synergy Portfolio',
      purpose: '給与前払い、勤怠管理、福利厚生、エンゲージメント領域のスタートアップ投資',
      enPurpose: 'Strategic growth investments in salary advance, attendance, and HR-tech startups',
      officialSource: 'SmartHR CVC投資実績開示',
      enOfficialSource: 'SmartHR CVC Investment Portfolio Disclosures',
      strategicSynergy: 'SmartHRプラットフォームとのAPI連携およびアプリストア「SmartHR Plus」を通じたエコシステム拡大。',
      enStrategicSynergy: 'Expands the SmartHR Plus App Store ecosystem through strategic API integrations and growth capital.'
    }
  ]
};
