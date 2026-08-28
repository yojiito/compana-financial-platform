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
      id: 'asahi-media-lab-ventures',
      targetName: '朝日メディアラボベンチャーズ (AMLV 1号・2号ファンド)',
      targetEnName: 'Asahi Media Lab Ventures (AMLV Funds I & II)',
      category: 'cvc_pure_investment',
      categoryLabel: '公式CVCベンチャー投資ファンド (総額53億円超)',
      enCategoryLabel: 'Official Corporate VC Funds (¥5.3B+ AUM)',
      purpose: 'シード〜アーリーステージのテクノロジー・SaaS・メディアDXスタートアップ純投資',
      enPurpose: 'Early-stage tech, SaaS, DX & media venture investments',
      officialSource: '朝日メディアラボベンチャーズ公式開示 (累計63社投資実績)',
      enOfficialSource: 'Asahi Media Lab Ventures Official Disclosures (63+ portfolio investments)',
      strategicSynergy: 'Firework（動画DX）、PETOKOTO（ペットテック）、ミナカラ（オンライン薬局）、Clear（SAKE100）など国内外63社に出資。',
      enStrategicSynergy: 'Active early-stage investments across 63+ startups including Firework, Petokoto, Minacolor, and Clear.'
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
      id: 'nikkei-note',
      targetName: 'note株式会社 (5243)',
      targetEnName: 'note inc. (5243)',
      tickerCode: '5243',
      category: 'listed_strategic',
      categoryLabel: '上場クリエイターPF (資本業務提携・主要株主)',
      enCategoryLabel: 'Listed Creator Platform (Strategic Equity Partner)',
      purpose: '2018年資本業務提携 ＆「日経COMEMO」共同運営・クリエイター連携',
      enPurpose: 'Strategic capital alliance since 2018; co-operation of NIKKEI COMEMO',
      holdingRatioPct: 3.97,
      sharesHeld: '約600,000株',
      estimatedValueOku: 18,
      officialSource: 'note株式会社 有価証券報告書 (EDINET: E38144) / 大量保有開示',
      enOfficialSource: 'note inc. Securities Report (EDINET: E38144) / Major Shareholder Filings',
      strategicSynergy: 'ビジネスリーダー向けコラムプラットフォーム「COMEMO by NIKKEI」の運営や日経電子版とのアライアンスを推進。',
      enStrategicSynergy: 'Strategic partner co-operating the opinion network "COMEMO by NIKKEI" alongside Nikkei Digital.'
    },
    {
      id: 'nikkei-kepple',
      targetName: '株式会社ケップル (Kepple)',
      targetEnName: 'Kepple Inc.',
      category: 'cvc_pure_investment',
      categoryLabel: 'スタートアップ情報基盤・資本業務提携',
      enCategoryLabel: 'Startup Market Intelligence & Strategic Equity',
      purpose: '未上場スタートアップ・VC投資データベースの共同開発 ＆ 日経テレコン連携',
      enPurpose: 'Co-development of private startup investment database & Nikkei Telecom integration',
      officialSource: '日経新聞 ＆ ケップル 資本業務提携公式開示',
      enOfficialSource: 'Nikkei & Kepple Official Capital & Business Alliance Disclosure',
      strategicSynergy: '国内最大の未上場スタートアップ資金調達・財務データベースを共同推進。',
      enStrategicSynergy: 'Jointly operates Japan’s premier private company and funding intelligence database.'
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
      id: 'shogakukan-media-do',
      targetName: '株式会社メディアドゥ (3678)',
      targetEnName: 'MEDIA DO Co., Ltd. (3678)',
      tickerCode: '3678',
      category: 'listed_strategic',
      categoryLabel: '上場電子書籍流通・取次 (第4位主要株主)',
      enCategoryLabel: 'Listed E-Book Wholesaler (4th Largest Shareholder)',
      purpose: '国内シェア7割の電子書籍取次プラットフォームとの流通・電子コミック配信提携',
      enPurpose: 'Core digital comic wholesale & distribution alliance with 70% market share leader',
      holdingRatioPct: 3.72,
      sharesHeld: '610,000株',
      estimatedValueOku: 15,
      officialSource: 'メディアドゥ 有価証券報告書 (EDINET: E30129) / 大株主の状況',
      enOfficialSource: 'MEDIA DO Securities Report (EDINET: E30129) / Major Shareholders',
      strategicSynergy: '小学館コミックス（コナン、サンデーうぇぶり等）の全国電子書店への取次流通における最重要パートナー。',
      enStrategicSynergy: 'Essential distribution partner handling wholesale of Shogakukan digital titles across all e-book stores.'
    },
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
    }
  ],

  // ⑤ 株式会社講談社 (Kodansha)
  'kodansha': [
    {
      id: 'kodansha-media-do',
      targetName: '株式会社メディアドゥ (3678)',
      targetEnName: 'MEDIA DO Co., Ltd. (3678)',
      tickerCode: '3678',
      category: 'listed_strategic',
      categoryLabel: '上場電子書籍流通・取次 (第5位主要株主)',
      enCategoryLabel: 'Listed E-Book Wholesaler (5th Largest Shareholder)',
      purpose: '電子コミック・雑誌のデジタル取次流通ネットワーク強化',
      enPurpose: 'Digital comic and magazine wholesale distribution infrastructure',
      holdingRatioPct: 3.58,
      sharesHeld: '590,000株',
      estimatedValueOku: 14,
      officialSource: 'メディアドゥ 有価証券報告書 (EDINET: E30129) / 大株主の状況',
      enOfficialSource: 'MEDIA DO Securities Report (EDINET: E30129) / Major Shareholders',
      strategicSynergy: 'マガジン系コミックス等の電子配信を全電子書店（Kindle、コミックシーモア、ebookjapan等）へ円滑取次。',
      enStrategicSynergy: 'Critical digital supply chain handling wholesale distribution across all major retail platforms.'
    },
    {
      id: 'kodansha-creators-lab',
      targetName: '講談社クリエイターズラボ (Creators’ Lab / Webtoon投資)',
      targetEnName: 'Kodansha Creators’ Lab (IP & Webtoon Studio Investments)',
      category: 'cvc_pure_investment',
      categoryLabel: '公式IPアクセラレーター ＆ Webtoon投資',
      enCategoryLabel: 'Official IP Accelerator & Webtoon Studio Venture Fund',
      purpose: '縦スクロールマンガ制作会社（SORAJIMA等）やインディーゲームクリエイターへの出資・資金助成',
      enPurpose: 'Growth equity in vertical Webtoon studios (SORAJIMA) and indie game development',
      officialSource: '講談社クリエイターズラボ公式開示・出資リリース',
      enOfficialSource: 'Kodansha Creators’ Lab Official Investment Disclosures',
      strategicSynergy: 'グローバル縦スクロールマンガ市場（韓国・中国・北米対抗）への先行投資と次世代ゲームIPの創出。',
      enStrategicSynergy: 'Direct venture investment capturing next-generation global vertical-scroll manga and gaming IP.'
    },
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
    }
  ],

  // ⑥ 株式会社集英社 (Shueisha)
  'shueisha': [
    {
      id: 'shueisha-media-do',
      targetName: '株式会社メディアドゥ (3678)',
      targetEnName: 'MEDIA DO Co., Ltd. (3678)',
      tickerCode: '3678',
      category: 'listed_strategic',
      categoryLabel: '上場電子書籍流通・取次 (主要資本提携)',
      enCategoryLabel: 'Listed E-Book Wholesaler (Strategic Equity Partner)',
      purpose: '『少年ジャンプ』『ヤングジャンプ』等の電子コミック取次流通・海外配信連携',
      enPurpose: 'Digital distribution & wholesale of Weekly Shonen Jump titles',
      holdingRatioPct: 2.93,
      sharesHeld: '480,000株',
      estimatedValueOku: 12,
      officialSource: '集英社 ＆ メディアドゥ 資本業務提携開示 (2017年)',
      enOfficialSource: 'Shueisha & MEDIA DO Capital Alliance Filing (2017)',
      strategicSynergy: 'ジャンプ作品等の電子書店向けディストリビューションおよび海外多言語配信の技術提携。',
      enStrategicSynergy: 'Distribution infrastructure supporting Jump digital comics and global multi-language delivery.'
    },
    {
      id: 'shueisha-games-xr',
      targetName: '株式会社集英社ゲームズ / 集英社XR',
      targetEnName: 'SHUEISHA GAMES Inc. / SHUEISHA XR',
      category: 'cvc_pure_investment',
      categoryLabel: 'グループ新事業・ゲーム＆メタバース開発投資',
      enCategoryLabel: 'New Business & Metaverse / Game Development Investment Hub',
      purpose: 'クリエイター発掘、インディーゲームパブリッシング、AR/VRエンタメ技術開発',
      enPurpose: 'Creator scouting, indie game publishing & AR/VR entertainment technology',
      officialSource: '集英社ゲームズ公式設立開示 (2022年)',
      enOfficialSource: 'SHUEISHA GAMES Official Establishment Disclosure (2022)',
      strategicSynergy: '世界トップクラスのマンガIPを自社主導でコンソール・Steam・モバイルゲームへ展開。',
      enStrategicSynergy: 'Drives proprietary global game development based on legendary Shonen Jump franchises.'
    },
    {
      id: 'shueisha-viz-media',
      targetName: 'VIZ Media, LLC (米国サンフランシスコ)',
      targetEnName: 'VIZ Media, LLC (San Francisco, USA)',
      category: 'group_subsidiary',
      categoryLabel: '共同出資 北米最大手マンガ配給会社',
      enCategoryLabel: 'Joint Venture / Largest Manga Publisher in North America',
      purpose: '北米・欧米英語圏における『ONE PIECE』『呪術廻戦』『チェンソーマン』等の英語翻訳出版・「MANGA Plus」連携',
      enPurpose: 'English translation publishing & anime licensing across North America',
      officialSource: 'VIZ Media LLC Official Corporate Filing / 集英社・小学館共同出資',
      enOfficialSource: 'VIZ Media LLC Official Corporate Filings (Jointly owned with Shogakukan)',
      strategicSynergy: '北米マンガ市場で過半数のシェアを誇る英語圏出版事業の基盤。',
      enStrategicSynergy: 'Dominant English-language manga publisher commanding over 50% North American market share.'
    }
  ],

  // ⑦ サントリーホールディングス株式会社 (Suntory HD)
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

  // ⑧ 株式会社Preferred Networks (PFN)
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

  // ⑨ 株式会社SmartHR (SmartHR)
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
  ],

  // ⑩ 株式会社竹中工務店 (Takenaka)
  'takenaka': [
    {
      id: 'takenaka-road',
      targetName: '株式会社竹中道路',
      targetEnName: 'Takenaka Civil Engineering & Road Co., Ltd.',
      category: 'group_subsidiary',
      categoryLabel: '100% 連結子会社 (舗装・土木)',
      enCategoryLabel: '100% Wholly Owned Subsidiary (Paving & Civil Engineering)',
      purpose: '道路舗装・都市土木インフラ工事の施工統括',
      enPurpose: 'Road paving & civil infrastructure construction',
      holdingRatioPct: 100.0,
      officialSource: '竹中工務店グループ公式会社概要',
      enOfficialSource: 'Takenaka Corporation Official Group Disclosures',
      strategicSynergy: '建築本体と外構・道路舗装の一体施工体制を構築。',
      enStrategicSynergy: 'Integrated building construction and civil road infrastructure capabilities.'
    }
  ],

  // ⑪ YKK株式会社 (YKK)
  'ykk': [
    {
      id: 'ykk-ap',
      targetName: 'YKK AP株式会社',
      targetEnName: 'YKK AP Inc.',
      category: 'group_subsidiary',
      categoryLabel: '100% 連結中核子会社 (窓・建材事業)',
      enCategoryLabel: '100% Wholly Owned Subsidiary (Architectural Products)',
      purpose: '断熱アルミ樹脂複合窓・ビルファサード・エクステリア建材の製造販売',
      enPurpose: 'Manufacturing & distribution of insulated windows & commercial facades',
      holdingRatioPct: 100.0,
      officialSource: 'YKKグループ公式開示・有報',
      enOfficialSource: 'YKK Group Official Disclosures',
      strategicSynergy: '国内住宅用サッシ・ビル用建材でトップシェア。売上高5,000億円超の中核事業。',
      enStrategicSynergy: 'Domestic market leader in architectural building products generating ¥500B+ revenue.'
    }
  ],

  // ⑫ ヤンマーホールディングス株式会社 (Yanmar)
  'yanmar': [
    {
      id: 'yanmar-agri',
      targetName: 'ヤンマーアグリ株式会社',
      targetEnName: 'Yanmar Agri Co., Ltd.',
      category: 'group_subsidiary',
      categoryLabel: '100% 連結子会社 (スマート農業・農機)',
      enCategoryLabel: '100% Wholly Owned Subsidiary (Smart Agriculture & Farm Machinery)',
      purpose: '自動運転ロボットトラクター・農業DXソリューションの提供',
      enPurpose: 'Autonomous robotic tractors & agricultural DX solutions',
      holdingRatioPct: 100.0,
      officialSource: 'ヤンマーグループ公式開示',
      enOfficialSource: 'YANMAR Group Corporate Profile',
      strategicSynergy: 'スマート農業・衛星測位連携農機による食農生産性向上を牽引。',
      enStrategicSynergy: 'Leads precision agriculture and autonomous satellite-guided farm robotics.'
    }
  ],

  // ⑬ 株式会社ロッテホールディングス (Lotte HD)
  'lotte-hd': [
    {
      id: 'lotte-marines',
      targetName: '株式会社千葉ロッテマリーンズ',
      targetEnName: 'Chiba Lotte Marines Co., Ltd.',
      category: 'group_subsidiary',
      categoryLabel: '100% 連結子会社 (プロ野球球団運営)',
      enCategoryLabel: '100% Wholly Owned Subsidiary (NPB Pro Baseball Club)',
      purpose: 'パ・リーグ名門球団の運営 ＆ ZOZOマリンスタジアム興行',
      enPurpose: 'Operation of Pacific League pro baseball franchise & ZOZO Marine Stadium events',
      holdingRatioPct: 100.0,
      officialSource: 'ロッテグループ公式会社案内',
      enOfficialSource: 'LOTTE Group Official Corporate Profile',
      strategicSynergy: '球団運営を通じたブランド認知拡大とスタジアムエンタメ事業の展開。',
      enStrategicSynergy: 'Drives national brand affinity and stadium sports entertainment operations.'
    }
  ],

  // ⑭ 森ビル株式会社 (Mori Building)
  'mori-building': [
    {
      id: 'mori-hills-reit',
      targetName: '森ヒルズリート投資法人 (3234)',
      targetEnName: 'Mori Hills REIT Investment Corporation (3234)',
      tickerCode: '3234',
      category: 'listed_strategic',
      categoryLabel: '上場スポンサー ＆ 旗艦J-REIT (100%資産運用委託)',
      enCategoryLabel: 'Listed Sponsor & Flagship J-REIT (100% Asset Management)',
      purpose: '六本木ヒルズ森タワー・愛宕グリーンヒルズ等のコアプレミアム資産の運用',
      enPurpose: 'Asset management of prime office & commercial properties (Roppongi Hills Mori Tower)',
      holdingRatioPct: 100.0,
      officialSource: '森ヒルズリート 有価証券報告書 / スポンサー開示',
      enOfficialSource: 'Mori Hills REIT Securities Report (EDINET) / Sponsor Profile',
      strategicSynergy: '資産規模4,000億円超の都心特化型プレミアムJ-REITの単独スポンサー。',
      enStrategicSynergy: 'Sole sponsor of ¥400B+ premier central Tokyo office REIT.'
    }
  ],

  // ⑮ 株式会社新潮社 (Shinchosha)
  'shinchosha': [
    {
      id: 'shincho-bungei-shinko',
      targetName: '公益財団法人 新潮文芸振興会',
      targetEnName: 'Shinchosha Foundation for the Promotion of Literature',
      category: 'group_subsidiary',
      categoryLabel: '文化事業母体 (三島由紀夫賞・山本周五郎賞・小林秀雄賞)',
      enCategoryLabel: 'Cultural Foundation (Mishima & Yamamoto Prize Organizer)',
      purpose: '日本文学・文芸ドキュメンタリーの顕彰および三島由紀夫賞・山本周五郎賞の選考運営',
      enPurpose: 'Administration of prestigious literary accolades (Mishima Yukio & Yamamoto Shugoro Prizes)',
      officialSource: '新潮文芸振興会 公式法人登記 / 新潮社公式開示',
      enOfficialSource: 'Official Corporate Registry & Shinchosha Disclosures',
      strategicSynergy: '新鋭作家・純文学・大衆小説の最高峰文学賞を主宰し、新潮社の出版ブランドと名作IP創出を牽引。',
      enStrategicSynergy: 'Administers pinnacle literary awards driving Shinchosha’s literary prestige and long-tail IP catalog.'
    }
  ],

  // ⑯ 株式会社文藝春秋 (Bungeishunju)
  'bungeishunju': [
    {
      id: 'bungei-bungaku-shinko',
      targetName: '公益財団法人 日本文学振興会',
      targetEnName: 'The Society for the Promotion of Japanese Literature',
      category: 'group_subsidiary',
      categoryLabel: '文化事業母体 (芥川賞・直木賞・大宅壮一ノンフィクション賞)',
      enCategoryLabel: 'Cultural Foundation (Akutagawa & Naoki Prize Organizer)',
      purpose: '日本最高峰の純文学・大衆文学新人賞の選考および日本文学の振興',
      enPurpose: 'Administration of Japan’s most prestigious literary awards (Akutagawa & Naoki Prizes)',
      officialSource: '日本文学振興会 公式法人登記 / 文藝春秋公式開示',
      enOfficialSource: 'Official Corporate Registry & Bungeishunju Disclosures',
      strategicSynergy: '文壇最高峰の顕彰制度を運営し、世界的ベストセラー作家の登竜門として機能。',
      enStrategicSynergy: 'Administers the pinnacle literary awards in Japan, launching generational bestseller authors.'
    }
  ],

  // ⑰ 株式会社秋田書店 (Akita Shoten)
  'akitashoten': [
    {
      id: 'akita-champion-ip',
      targetName: '秋田書店 コミック・アニメIP製作委員会出資',
      targetEnName: 'Akita Shoten Anime IP Production Consortia',
      category: 'group_subsidiary',
      categoryLabel: '自社出版・アニメ製作委員会出資 (刃牙・弱虫ペダル・魔入間)',
      enCategoryLabel: 'Anime IP Production Committee Investments (Baki, Yowamushi Pedal, Iruma-kun)',
      purpose: '『刃牙シリーズ』『弱虫ペダル』『魔入りました！入間くん』等のアニメ製作出資 ＆ 映像化',
      enPurpose: 'Anime production committee equity & global multi-media adaptation of flagship manga',
      officialSource: '秋田書店公式開示・アニメ製作委員会クレジット',
      enOfficialSource: 'Official Corporate Disclosures & Anime Production Committee Filings',
      strategicSynergy: '週刊少年チャンピオン発のメガヒットIPを自社出資でアニメ化し、グローバル配信・商品化権収益を最大化。',
      enStrategicSynergy: 'Drives global broadcast streaming and licensing revenue through direct production committee equity.'
    }
  ],

  // ⑱ 株式会社大創産業 (DAISO)
  'daiso': [
    {
      id: 'daiso-us',
      targetName: 'Daiso USA LLC (米国カリフォルニア州)',
      targetEnName: 'Daiso USA LLC (California, USA)',
      category: 'group_subsidiary',
      categoryLabel: '100% 海外直営子会社 (北米100店舗超展開)',
      enCategoryLabel: '100% Wholly Owned Overseas Subsidiary (100+ US Stores)',
      purpose: '北米主要都市（カリフォルニア、テキサス、ニューヨーク等）における直営店舗網拡大',
      enPurpose: 'Expansion of retail store network across major US metro regions',
      holdingRatioPct: 100.0,
      officialSource: '大創産業公式リリース・米国法人登記',
      enOfficialSource: 'Daiso Industries Official Disclosures & US Filings',
      strategicSynergy: '全米で急成長する均一価格ジャパニーズライフスタイルショップの直営統括。',
      enStrategicSynergy: 'Oversees rapid retail footprint expansion of affordable Japanese lifestyle products across the US.'
    }
  ],

  // ⑲ アイリスオーヤマ株式会社 (IRIS OHYAMA)
  'iris-ohyama': [
    {
      id: 'iris-chitose',
      targetName: 'アイリスチトセ株式会社',
      targetEnName: 'Iris Chitose Inc.',
      category: 'group_subsidiary',
      categoryLabel: '100% 連結子会社 (オフィス・教育施設家具)',
      enCategoryLabel: '100% Wholly Owned Subsidiary (Office & Educational Furniture)',
      purpose: '学校・オフィス・福祉施設向け家具および内装システムの製造販売',
      enPurpose: 'Manufacturing of school desks, office seating & healthcare interior systems',
      holdingRatioPct: 100.0,
      officialSource: 'アイリスオーヤマ公式会社案内',
      enOfficialSource: 'IRIS OHYAMA Official Group Disclosures',
      strategicSynergy: '全国の学校・官公庁・オフィス市場への強固なBtoB販路を構築。',
      enStrategicSynergy: 'Establishes commanding B2B distribution across nationwide schools and public offices.'
    }
  ],

  // ⑳ 株式会社TBM (LIMEX)
  'tbm': [
    {
      id: 'tbm-circulex',
      targetName: '株式会社Circulex (再生材リサイクル)',
      targetEnName: 'Circulex Inc.',
      category: 'group_subsidiary',
      categoryLabel: '100% 連結子会社 (循環型リサイクル)',
      enCategoryLabel: '100% Wholly Owned Subsidiary (Circular Economy Recycling)',
      purpose: '使用済みプラスチックおよびLIMEXのマテリアルリサイクル・高度再資源化',
      enPurpose: 'Material recycling and advanced resource recovery of post-consumer plastics & LIMEX',
      holdingRatioPct: 100.0,
      officialSource: 'TBM公式リリース',
      enOfficialSource: 'TBM Official Press Release',
      strategicSynergy: '横須賀・大崎工場の最先端自動選別リサイクルプラントを運用。',
      enStrategicSynergy: 'Operates state-of-the-art automated optical sorting recycling mega-plants.'
    }
  ]
};
