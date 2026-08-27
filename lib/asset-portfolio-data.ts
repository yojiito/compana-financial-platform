export interface HeldSecurity {
  name: string; // 銘柄名
  tickerCode?: string; // 証券コード / 市場
  shares: string; // 保有株数 (例: 1億8,500万株)
  carryingAmountMillion: number; // 貸借対照表計上額 (百万円)
  holdingRatio: number; // 発行済株式数に対する保有比率 (%)
  purpose: string; // 保有目的・事業シナジー
  statusNote?: string; // 縮減・売却方針・直近動向
}

export interface RealEstateAsset {
  landBookValueMillion: number; // 土地簿価 (百万円)
  buildingsBookValueMillion: number; // 建物・構築物簿価 (百万円)
  rentalPropertiesFairValueMillion?: number; // 賃貸等不動産の時価 (百万円)
  rentalPropertiesBookValueMillion?: number; // 賃貸等不動産の簿価 (百万円)
  unrealizedGainMillion?: number; // 賃貸等不動産の含み益 (百万円)
  mainFacilities: {
    name: string;
    location: string;
    areaOrScale: string;
    purpose: string;
  }[];
}

export interface CashAsset {
  cashAndEquivalentsMillion: number; // 現金及び現金同等物 (百万円)
  interestBearingDebtMillion: number; // 有利子負債 (百万円)
  netCashMillion: number; // ネットキャッシュ (現預金 - 有利子負債) (百万円)
  cashToMonthlySalesRatio: number; // 月商比現金保有倍率 (ヶ月)
  financialStatus: 'debt_free' | 'cash_rich' | 'leveraged'; // 財務状態
}

export interface CompanyAssetPortfolio {
  tickerCode: string;
  companyName: string;
  asOfDate: string; // "2024年3月期 有価証券報告書開示"
  cash: CashAsset;
  securities: {
    totalInvestmentSecuritiesMillion: number; // 投資有価証券合計 (百万円)
    policyHoldingSecuritiesMillion: number; // 政策保有株式合計 (百万円)
    policyReductionPolicy: string; // 政策保有株式の縮減方針
    holdings: HeldSecurity[];
  };
  realEstate: RealEstateAsset;
  totalLiquidAssetsMillion: number; // 実質手元流動性・資産合計 (百万円)
  marketCapCoverageRatio: number; // 時価総額に対する保有資産カバレッジ比率 (%)
}

export const ASSET_PORTFOLIOS: { [ticker: string]: CompanyAssetPortfolio } = {
  // ① トヨタ自動車 (7203)
  '7203': {
    tickerCode: '7203',
    companyName: 'トヨタ自動車株式会社',
    asOfDate: '2024年3月期 有価証券報告書 開示基準',
    cash: {
      cashAndEquivalentsMillion: 5824500, // 約5.82兆円
      interestBearingDebtMillion: 28410000, // 金融事業含む約28.4兆円
      netCashMillion: -22585500,
      cashToMonthlySalesRatio: 1.55,
      financialStatus: 'cash_rich',
    },
    securities: {
      totalInvestmentSecuritiesMillion: 12450000, // 約12.45兆円
      policyHoldingSecuritiesMillion: 8620000, // 政策保有株式 約8.62兆円
      policyReductionPolicy: '資本効率向上とPBR改革に基づき、グループ株式を含め政策保有株式の段階的売却・縮減を推進。売却資金はEV・自動運転・全固体電池投資および自己株式取得に充当。',
      holdings: [
        {
          name: '株式会社デンソー',
          tickerCode: '6902 (東証P)',
          shares: '1億8,500万株',
          carryingAmountMillion: 2854000, // 約2.85兆円
          holdingRatio: 20.0,
          purpose: '車載半導体・電動パワートレイン・先進安全運転支援（ADAS）コア技術の共同開発',
          statusNote: '持合い解消の方針に基づき一部売却を実施したが、20%の戦略持分を継続保有'
        },
        {
          name: '株式会社豊田自動織機',
          tickerCode: '6201 (東証P)',
          shares: '7,680万株',
          carryingAmountMillion: 1428000, // 約1.42兆円
          holdingRatio: 24.5,
          purpose: 'エンジン・産業車両・車載電池（バイポーラ型ニッケル水素・リチウムイオン）共同開発',
          statusNote: '創業グループ中核会社として緊密な開発アライアンスを維持'
        },
        {
          name: 'KDDI株式会社',
          tickerCode: '9433 (東証P)',
          shares: '4,520万株',
          carryingAmountMillion: 1980000, // 約1.98兆円
          holdingRatio: 2.1,
          purpose: 'コネクテッドカー通信基盤（T-Connect）・グローバル車載通信プラットフォーム連携',
          statusNote: 'スマートシティ（Woven City）通信インフラ連携を深化'
        },
        {
          name: '株式会社アイシン',
          tickerCode: '7259 (東証P)',
          shares: '6,450万株',
          carryingAmountMillion: 985000, // 約9,850億円
          holdingRatio: 24.8,
          purpose: '電動駆動ユニット（eAxle）・次世代変速機・ブレーキシステムの安定調達・共同開発',
          statusNote: '資本効率化に向けた株式売出しを実施しつつ戦略的パートナーシップを維持'
        },
        {
          name: '株式会社SUBARU',
          tickerCode: '7270 (東証P)',
          shares: '1億5,300万株',
          carryingAmountMillion: 462000, // 約4,620億円
          holdingRatio: 20.0,
          purpose: 'スポーツカー（GR86/BRZ）および共同開発EV（bZ4X/ソルテラ）の生産・開発アライアンス',
          statusNote: '次世代EVプラットフォーム共同開発へ提携関係を格上げ'
        },
        {
          name: 'スズキ株式会社',
          tickerCode: '7269 (東証P)',
          shares: '2,400万株',
          carryingAmountMillion: 385000, // 約3,850億円
          holdingRatio: 4.9,
          purpose: 'インド・新興国市場における小型車・ハイブリッド相互供給および電動化協業',
          statusNote: 'インド市場での圧倒的シェア（マルチ・スズキ）とHV技術供与でWin-Win関係'
        },
        {
          name: 'マツダ株式会社',
          tickerCode: '7261 (東証P)',
          shares: '3,200万株',
          carryingAmountMillion: 165000, // 約1,650億円
          holdingRatio: 5.1,
          purpose: '米国合弁工場（アラバマ）での共同生産および次世代車載電子アーキテクチャ共同開発',
          statusNote: '米国合弁生産工場の安定稼働'
        },
        {
          name: 'Uber Technologies, Inc.',
          tickerCode: 'UBER (NYSE)',
          shares: '1,200万株 (米国預託証券等)',
          carryingAmountMillion: 310000, // 約3,100億円
          holdingRatio: 0.6,
          purpose: 'MaaS（モビリティ・アズ・ア・サービス）および自動運転配車ネットワーク連携',
          statusNote: 'グローバルMaaSパートナーとして継続保有'
        },
        {
          name: 'Joby Aviation, Inc. (空飛ぶクルマ)',
          tickerCode: 'JOBY (NYSE)',
          shares: '出資持分 (累計約5億ドル出資)',
          carryingAmountMillion: 78000, // 約780億円
          holdingRatio: 11.8,
          purpose: '電動垂直離着陸機（eVTOL: 空飛ぶクルマ）の量産設計支援および次世代空モビリティ',
          statusNote: 'トヨタの生産技術・品質管理ノウハウを投入し量産化支援'
        }
      ]
    },
    realEstate: {
      landBookValueMillion: 1524000, // 土地簿価 約1.52兆円 (取得原価ベース・含み益大)
      buildingsBookValueMillion: 3850000, // 建物・構築物 約3.85兆円
      rentalPropertiesFairValueMillion: 345000, // 賃貸等不動産 時価 約3,450億円
      rentalPropertiesBookValueMillion: 125000, // 賃貸等不動産 簿価 約1,250億円
      unrealizedGainMillion: 220000, // 賃貸等不動産 含み益 約2,200億円
      mainFacilities: [
        {
          name: '本社地区 ＆ 豊田工場群 (堤工場・元町工場・高岡工場等)',
          location: '愛知県豊田市トヨタ町1番地',
          areaOrScale: '敷地面積 合計 約1,000万㎡ (ナゴヤドーム200個分超)',
          purpose: 'クラウン、プリウス、RAV4、MIRAI等の主力完成車・レクサス量産拠点'
        },
        {
          name: 'トヨタテクニカルセンター下山 (テストコース・研究棟)',
          location: '愛知県豊田市 / 岡崎市',
          areaOrScale: '敷地面積 約650万㎡ (ニュルブルクリンク模倣の過酷な実証コース)',
          purpose: '「もっといいクルマづくり」のための車両開発・極限走行テスト・試作拠点'
        },
        {
          name: 'ウーブン・シティ (Woven City 実証都市)',
          location: '静岡県裾野市 (旧東富士工場跡地)',
          areaOrScale: '敷地面積 約70万㎡ (Phase 1 竣工)',
          purpose: '自動運転・パーソナルモビリティ・水素エネルギーの未来社会実証実験'
        },
        {
          name: 'トヨタ東京ビル ＆ 東京本社',
          location: '東京都文京区後楽1-4-18',
          areaOrScale: '地上19階・地下3階 自社ビル',
          purpose: '首都圏渉外・グローバル広報・政策連携・金融統括拠点'
        },
        {
          name: '名古屋オフィス (ミッドランドスクエア)',
          location: '愛知県名古屋市中村区名駅4-7-1',
          areaOrScale: '地上47階 超高層タワー（区分所有・主要拠点）',
          purpose: '国内営業統括・グループ連携拠点'
        }
      ]
    },
    totalLiquidAssetsMillion: 23644500, // 現預金+有価証券+土地簿価 = 約23.6兆円
    marketCapCoverageRatio: 48.8 // 時価総額の約49%を有価証券・現預金・土地でカバー
  },

  // ② 任天堂 (7974)
  '7974': {
    tickerCode: '7974',
    companyName: '任天堂株式会社',
    asOfDate: '2024年3月期 有価証券報告書 開示基準',
    cash: {
      cashAndEquivalentsMillion: 1658400, // 現金及び現金同等物 約1.66兆円
      interestBearingDebtMillion: 0, // 有利子負債ゼロ（完全無借金経営）
      netCashMillion: 1658400, // ネットキャッシュ 約1.66兆円（強固なキャッシュリッチ）
      cashToMonthlySalesRatio: 11.9, // 月商の約1年分（約12ヶ月）の現金を常時保有
      financialStatus: 'debt_free',
    },
    securities: {
      totalInvestmentSecuritiesMillion: 685000, // 投資有価証券 約6,850億円
      policyHoldingSecuritiesMillion: 420000, // 政策保有株 約4,200億円
      policyReductionPolicy: '事業シナジーおよびIP展開（映画・モバイル・コンテンツ開発）に直結する企業に限定して保有。純投資および機動的な自社株買いの原資としても活用。',
      holdings: [
        {
          name: '株式会社ポケモン (The Pokémon Company)',
          tickerCode: '非上場 (持分法適用関連会社)',
          shares: '出資比率 32.0% (3,200株)',
          carryingAmountMillion: 185000, // 持分簿価 約1,850億円 (時価評価は数兆円規模)
          holdingRatio: 32.0,
          purpose: '『ポケットモンスター』ゲームソフト・カードゲーム・アニメ・映画ライセンスの共同保有・世界的展開',
          statusNote: 'クリーチャーズ、ゲームフリークと共に強固な共同出資関係を維持'
        },
        {
          name: '株式会社ディー・エヌ・エー (DeNA)',
          tickerCode: '2432 (東証P)',
          shares: '1,500万株',
          carryingAmountMillion: 24500, // 約245億円
          holdingRatio: 12.7,
          purpose: '任天堂アカウント基盤および合弁会社「ニンテンドーシステムズ」を通じたDX・ネットワーク開発連携',
          statusNote: 'アカウント連携とモバイルゲーム運用の最重要パートナー'
        },
        {
          name: '株式会社サイバーエージェント (Cygames)',
          tickerCode: '4751 (東証P)',
          shares: '出資持分',
          carryingAmountMillion: 15000,
          holdingRatio: 1.5,
          purpose: 'スマートデバイス向けアクションRPG・モバイルタイトル共同開発連携',
          statusNote: 'モバイル展開の技術パートナー'
        },
        {
          name: 'イマジニア株式会社',
          tickerCode: '4644 (東証S)',
          shares: '180万株',
          carryingAmountMillion: 2800,
          holdingRatio: 3.5,
          purpose: 'Switch向けフィットネス・健康系ソフト（Fit Boxing等）の共同パブリッシング',
          statusNote: '安定したソフト供給パートナー'
        },
        {
          name: '株式会社マーベラス',
          tickerCode: '7844 (東証P)',
          shares: '120万株',
          carryingAmountMillion: 1200,
          holdingRatio: 2.2,
          purpose: 'Switch向けオリジナルコンテンツ・農場シミュレーションタイトルの安定調達',
          statusNote: 'サードパーティソフト供給連携'
        }
      ]
    },
    realEstate: {
      landBookValueMillion: 89000, // 土地簿価 約890億円
      buildingsBookValueMillion: 145000, // 建物簿価 約1,450億円
      rentalPropertiesFairValueMillion: 38000,
      rentalPropertiesBookValueMillion: 18000,
      unrealizedGainMillion: 20000,
      mainFacilities: [
        {
          name: '任天堂 本社開発棟 ＆ 本社本館',
          location: '京都府京都市南区上鳥羽鉾立町11番地1',
          areaOrScale: '敷地面積 約40,000㎡ (自社保有開発拠点)',
          purpose: 'ゲームハード・基幹ソフトウェア・OSの総合企画・開発中枢'
        },
        {
          name: '任天堂京都リサーチパーク開発拠点',
          location: '京都府京都市下京区中堂寺南町',
          areaOrScale: '研究開発フロア',
          purpose: '次世代グラフィックス・サウンド・ネットワーク技術研究'
        },
        {
          name: 'ニンテンドーミュージアム (資料館・体験施設)',
          location: '京都府宇治市小倉町 (旧宇治小倉工場跡地)',
          areaOrScale: '敷地面積 約10,000㎡ (2024年秋オープン)',
          purpose: '花札・トランプから歴代ゲーム機・ゲームソフトの展示・ブランド体験施設'
        },
        {
          name: '任天堂 東京支社 (神田スクエア)',
          location: '東京都千代田区神田錦町2-2-1',
          areaOrScale: 'オフィスフロア',
          purpose: '国内営業・マーケティング・知的財産法務統括'
        },
        {
          name: 'Nintendo of America 本社キャンパス',
          location: '米国ワシントン州レドモンド',
          areaOrScale: '敷地面積 約12万㎡ 自社保有広大キャンパス',
          purpose: '北米・南米市場の販売・ローカライズ・マーケティング中枢'
        }
      ]
    },
    totalLiquidAssetsMillion: 2577400, // 実質流動性・有価証券・土地 = 約2.58兆円
    marketCapCoverageRatio: 23.9 // 時価総額の約24%を現金および有価証券・不動産で裏付け
  },

  // ③ ソニーグループ (6758)
  '6758': {
    tickerCode: '6758',
    companyName: 'ソニーグループ株式会社',
    asOfDate: '2024年3月期 有価証券報告書 開示基準',
    cash: {
      cashAndEquivalentsMillion: 2154000, // 現金及び現金同等物 約2.15兆円
      interestBearingDebtMillion: 1850000, // 金融除く事業有利子負債 約1.85兆円
      netCashMillion: 304000, // 実質ネットキャッシュ 約3,040億円
      cashToMonthlySalesRatio: 1.98,
      financialStatus: 'cash_rich',
    },
    securities: {
      totalInvestmentSecuritiesMillion: 8450000, // 投資有価証券 約8.45兆円 (金融含む)
      policyHoldingSecuritiesMillion: 1850000, // 政策保有株式・戦略出資 約1.85兆円
      policyReductionPolicy: 'エンタメIP・ゲーム・音楽・映画および半導体エコシステムに直結する戦略的出資に厳選。純投資および非中核株は段階的売却・資本効率化を推進。',
      holdings: [
        {
          name: 'Epic Games, Inc. (米国)',
          tickerCode: '非上場 (米国未上場メガテック)',
          shares: '出資持分 約5.4% (累計14.5億ドル出資)',
          carryingAmountMillion: 290000, // 約2,900億円
          holdingRatio: 5.4,
          purpose: 'ゲームエンジン「Unreal Engine」を活用した次世代仮想空間・ライブ配信・リアルタイムCG映画制作連携',
          statusNote: 'メタバース・デジタルコンテンツ制作の基盤技術パートナー'
        },
        {
          name: 'Spotify Technology S.A.',
          tickerCode: 'SPOT (NYSE)',
          shares: '音楽原盤・出版権連携持分',
          carryingAmountMillion: 145000, // 約1,450億円
          holdingRatio: 2.3,
          purpose: 'ソニー・ミュージック所属アーティスト楽曲のグローバルストリーミング配信・レベニューシェア連携',
          statusNote: 'ストリーミング市場拡大に伴う巨額の含み益を保持'
        },
        {
          name: '株式会社KADOKAWA',
          tickerCode: '9468 (東証P)',
          shares: '280万株',
          carryingAmountMillion: 85000, // 約850億円
          holdingRatio: 2.1,
          purpose: 'アニメ・マンガ・ライトノベル原作の全世界ゲーム化・映画化・Crunchyrollグローバル配信アライアンス',
          statusNote: 'IP創出・メディアミックスの最重要国内パートナー'
        },
        {
          name: 'Bilibili Inc. (中国ビリビリ)',
          tickerCode: 'BILI (NASDAQ / 香港)',
          shares: '出資持分 (約1,730万株)',
          carryingAmountMillion: 48000, // 約480億円
          holdingRatio: 4.9,
          purpose: '中国およびアジア市場向け日本アニメ配信・モバイルゲーム共同パブリッシング',
          statusNote: '中華圏若年層エンタメ市場の流通ゲートウェイ'
        },
        {
          name: '東映アニメーション株式会社',
          tickerCode: '4816 (東証S)',
          shares: '120万株',
          carryingAmountMillion: 26000, // 約260億円
          holdingRatio: 1.9,
          purpose: '日本を代表するアニメIPの海外共同配給（Crunchyroll経由）およびマーチャンダイジング展開',
          statusNote: 'ドラゴンボール・ワンピース等の海外配信連携'
        },
        {
          name: 'エムスリー株式会社',
          tickerCode: '2413 (東証P)',
          shares: '2億3,000万株',
          carryingAmountMillion: 420000, // 約4,200億円
          holdingRatio: 33.9,
          purpose: '医療従事者専門ポータル「m3.com」を通じたヘルステック・医療機器・AI診断ソリューション連携',
          statusNote: '持分法適用関連会社として安定した持分利益を創出'
        }
      ]
    },
    realEstate: {
      landBookValueMillion: 485000, // 土地簿価 約4,850億円
      buildingsBookValueMillion: 1240000, // 建物・半導体クリーンルーム 約1.24兆円
      rentalPropertiesFairValueMillion: 120000,
      rentalPropertiesBookValueMillion: 65000,
      unrealizedGainMillion: 55000,
      mainFacilities: [
        {
          name: 'ソニーシティ品川 本社ビル',
          location: '東京都港区港南1-7-1',
          areaOrScale: '地上20階・地下2階 延床面積 約16万㎡ 自社ビル',
          purpose: 'グループグローバル統括・経営企画・法務・技術戦略本部'
        },
        {
          name: '熊本テクノロジーセンター (ソニーセミコンダクタマニュファクチャリング)',
          location: '熊本県菊池郡菊陽町',
          areaOrScale: '敷地面積 約27万㎡ (世界最先端半導体クリーンルーム)',
          purpose: 'スマートフォン・車載カメラ向け最先端積層型CMOSイメージセンサー量産ファブ'
        },
        {
          name: '長崎テクノロジーセンター (半導体ファブ)',
          location: '長崎県諫早市津久葉町',
          areaOrScale: '敷地面積 約20万㎡ (Fab 5増設)',
          purpose: '高機能モバイル向けCMOSセンサーの大規模量産拠点'
        },
        {
          name: 'ソニーシティ大崎',
          location: '東京都品川区大崎2-10-1',
          areaOrScale: '地上25階 超高層オフィス',
          purpose: 'テレビ（BRAVIA）・オーディオ・カメラ（α）等のエレクトロニクス開発拠点'
        },
        {
          name: 'Sony Pictures Studios (SPEハリウッド撮影所)',
          location: '米国カリフォルニア州カルバーシティ',
          areaOrScale: '敷地面積 約18万㎡ (歴史的映画スタジオ群)',
          purpose: '『スパイダーマン』等のハリウッド大作映画・テレビドラマ制作・ポストプロダクション'
        }
      ]
    },
    totalLiquidAssetsMillion: 11089000, // 約11.1兆円
    marketCapCoverageRatio: 65.8 // 時価総額の約66%を保有資産・証券・工場土地でカバー
  },

  // ④ 株式会社キーエンス (6861)
  '6861': {
    tickerCode: '6861',
    companyName: '株式会社キーエンス',
    asOfDate: '2024年3月期 有価証券報告書 開示基準',
    cash: {
      cashAndEquivalentsMillion: 685000, // 手元現預金 約6,850億円
      interestBearingDebtMillion: 0, // 有利子負債ゼロ（完全無借金・自己資本比率96%）
      netCashMillion: 685000, // ネットキャッシュ 約6,850億円
      cashToMonthlySalesRatio: 8.5, // 月商の約8.5ヶ月分の現預金を常時確保
      financialStatus: 'debt_free',
    },
    securities: {
      totalInvestmentSecuritiesMillion: 1650000, // 投資有価証券 約1.65兆円（格付けAAA等の超優良有価証券）
      policyHoldingSecuritiesMillion: 12000, // 政策保有株式はごく僅か（資本効率最優先）
      policyReductionPolicy: '原則として政策保有株式を保有せず、保有する場合は事業上の必要性を厳格に精査。余剰資金は安全性の極めて高い格付け国債・社債等の運用に充当。',
      holdings: [
        {
          name: '格付けAAA公社債・短期国債ポートフォリオ',
          tickerCode: '公社債運用',
          shares: '国債・地方債・最上位格付け社債',
          carryingAmountMillion: 1580000, // 約1.58兆円
          holdingRatio: 100.0,
          purpose: '財務の絶対的安全性確保、元本保全、および機動的な成長投資余力の維持',
          statusNote: '流動性の高い超優良債券を中心に安全運用'
        },
        {
          name: '精密加工・光学サプライヤー戦略出資',
          tickerCode: '非上場',
          shares: '少数持分',
          carryingAmountMillion: 12000,
          holdingRatio: 1.0,
          purpose: '超高精度FAセンサーの光学レンズ・特殊樹脂金型の安定調達と生産委託連携',
          statusNote: 'サプライチェーン安定化のための最小限出資'
        }
      ]
    },
    realEstate: {
      landBookValueMillion: 85000, // 土地簿価 約850億円
      buildingsBookValueMillion: 120000, // 建物簿価 約1,200億円
      rentalPropertiesFairValueMillion: 0,
      rentalPropertiesBookValueMillion: 0,
      unrealizedGainMillion: 0,
      mainFacilities: [
        {
          name: 'キーエンス本社ビル',
          location: '大阪府大阪市東淀川区東中島1-3-14',
          areaOrScale: '地上21階 超高層タワー 自社保有ビル',
          purpose: '全社グローバル統括・商品企画・営業戦略推進中枢'
        },
        {
          name: 'キーエンス高槻研究所 ＆ 品質管理センター',
          location: '大阪府高槻市',
          areaOrScale: '最新鋭研究開発棟',
          purpose: 'FAセンサー・超深度顕微鏡の要素技術研究・耐久信頼性試験'
        },
        {
          name: 'キーエンス東京研究所 ＆ 首都圏営業開発拠点',
          location: '東京都港区港南2-18-1 JR品川イーストビル',
          areaOrScale: 'オフィス・ラボ施設',
          purpose: '首都圏大手顧客向けコンサルティング営業・次世代センサー実証ラボ'
        },
        {
          name: 'Keyence Corporation of America 本社',
          location: '米国イリノイ州シカゴ郊外 (Itasca)',
          areaOrScale: '自社オペレーションセンター',
          purpose: '北米全土の直販営業・即日出荷ロジスティクス拠点'
        }
      ]
    },
    totalLiquidAssetsMillion: 2420000, // 現金+有価証券+土地 = 約2.42兆円
    marketCapCoverageRatio: 14.1
  },

  // ⑤ ソフトバンクグループ (9984)
  '9984': {
    tickerCode: '9984',
    companyName: 'ソフトバンクグループ株式会社',
    asOfDate: '2024年3月期 有価証券報告書 開示基準',
    cash: {
      cashAndEquivalentsMillion: 4820000, // 手元現預金 約4.82兆円
      interestBearingDebtMillion: 19800000, // 連結有利子負債 約19.8兆円
      netCashMillion: -14980000,
      cashToMonthlySalesRatio: 8.56,
      financialStatus: 'leveraged',
    },
    securities: {
      totalInvestmentSecuritiesMillion: 22500000, // 保有株式価値 (NAVベースでは約28兆円)
      policyHoldingSecuritiesMillion: 18900000, // AI・半導体中核出資
      policyReductionPolicy: 'AI革命・人工超知能（ASI）の推進に向け、Armを中核とするエコシステムに資本を集中。Alibaba等成熟アセットは段階的に現金化し次世代投資・自社株買いへ配分。',
      holdings: [
        {
          name: 'Arm Holdings plc (英アーム・NASDAQ上場)',
          tickerCode: 'ARM (NASDAQ)',
          shares: '9億3,000万株 (発行済株式の約90.6%を保有)',
          carryingAmountMillion: 14200000, // 時価換算で約14兆〜16兆円規模
          holdingRatio: 90.6,
          purpose: '世界の全スマートフォン・AIアクセラレータの中核CPU/GPUアーキテクチャ支配とASI半導体開発',
          statusNote: 'SBGの最大中核アセット。時価総額急増によりNAVを大きく牽引'
        },
        {
          name: 'ソフトバンク株式会社 (国内通信・東証9434)',
          tickerCode: '9434 (東証P)',
          shares: '19億2,000万株',
          carryingAmountMillion: 3850000, // 約3.85兆円
          holdingRatio: 40.2,
          purpose: '国内携帯・通信インフラ、LINEヤフー、PayPay基盤および年間約1,600億円の安定配当受領',
          statusNote: '安定キャッシュフローを生み出す中核連結子会社'
        },
        {
          name: 'T-Mobile US, Inc. (米国携帯大手キャリア)',
          tickerCode: 'TMUS (NASDAQ)',
          shares: '6,700万株',
          carryingAmountMillion: 1850000, // 約1.85兆円
          holdingRatio: 5.6,
          purpose: '米国通信市場の成長果実享受および高格付け担保・流動性調達資産',
          statusNote: 'スプリント統合後の好調な業績により株価最高値圏で推移'
        },
        {
          name: 'SoftBank Vision Fund 1 & 2 (投資ポートフォリオ)',
          tickerCode: 'SVF (未上場AIユニコーン群)',
          shares: '数百社のグローバルAI・テック企業持分',
          carryingAmountMillion: 4200000, // 約4.2兆円
          holdingRatio: 100.0,
          purpose: '世界中の自動運転（Wayve等）、ロボティクス、生成AI、エンタープライズAIへの分散投資',
          statusNote: '上場・二次流通でのエグジットにより投資回収期へ移行中'
        }
      ]
    },
    realEstate: {
      landBookValueMillion: 185000,
      buildingsBookValueMillion: 240000,
      rentalPropertiesFairValueMillion: 150000,
      rentalPropertiesBookValueMillion: 85000,
      unrealizedGainMillion: 65000,
      mainFacilities: [
        {
          name: '東京ポートシティ竹芝 オフィスタワー',
          location: '東京都港区海岸1-7-1',
          areaOrScale: '地上40階・地下2階 最先端スマートビル',
          purpose: 'ソフトバンクグループ本社・AI/IoT実証スマートオフィス拠点'
        },
        {
          name: 'シリコンバレー投資拠点 (SoftBank Group US)',
          location: '米国カリフォルニア州サンカルロス',
          areaOrScale: '投資・インキュベーション拠点',
          purpose: '米国トップVC・AIスタートアップとの投資対話・デューデリジェンス拠点'
        },
        {
          name: 'Arm Headquarters (ケンブリッジキャンパス)',
          location: '英国ケンブリッジ',
          areaOrScale: '半導体設計キャンパス',
          purpose: '次世代CPUアーキテクチャ・AIプロセッサ設計開発中枢'
        }
      ]
    },
    totalLiquidAssetsMillion: 27505000, // 現金+保有株式 = 約27.5兆円 (NAVで時価総額の2倍以上)
    marketCapCoverageRatio: 220.0 // 保有資産価値が時価総額の2.2倍（大幅なコングロマリット・ディスカウント）
  },

  // ⑥ 株式会社ファーストリテイリング (9983)
  '9983': {
    tickerCode: '9983',
    companyName: '株式会社ファーストリテイリング',
    asOfDate: '2024年8月期 有価証券報告書 開示基準',
    cash: {
      cashAndEquivalentsMillion: 1285000, // 現金及び現金同等物 約1.29兆円
      interestBearingDebtMillion: 385000, // 有利子負債 約3,850億円
      netCashMillion: 900000, // 実質ネットキャッシュ 約9,000億円（超健全）
      cashToMonthlySalesRatio: 4.97, // 月商の約5ヶ月分の現金を保有
      financialStatus: 'cash_rich',
    },
    securities: {
      totalInvestmentSecuritiesMillion: 154000, // 投資有価証券 約1,540億円
      policyHoldingSecuritiesMillion: 45000,
      policyReductionPolicy: 'サプライチェーンの完全自動化・物流DXおよびグローバルサプライヤー連携に必要な最小限の出資に限定。',
      holdings: [
        {
          name: '株式会社ダイフク',
          tickerCode: '6383 (東証P)',
          shares: '150万株',
          carryingAmountMillion: 18500, // 約185億円
          holdingRatio: 1.2,
          purpose: '全世界のユニクロ・GU次世代自動倉庫・RFIDピッキングロボット・自動仕分けマテハンの共同開発',
          statusNote: '有明本部をはじめとするグローバル物流の完全自動化パートナー'
        },
        {
          name: '株式会社島精機製作所',
          tickerCode: '6222 (東証P)',
          shares: '210万株 (合弁会社イノベーションファクトリー設立)',
          carryingAmountMillion: 12000, // 約120億円
          holdingRatio: 5.8,
          purpose: '無縫製ニット「ホールガーメント」の革新的自動編み機開発・3Dニット共同生産',
          statusNote: '立体成型ニットの量産サプライチェーン共同構築'
        },
        {
          name: 'グローバル素材・テキスタイル提携先 (東レ等)',
          tickerCode: '3402 (東証P)',
          shares: '戦略的長期取引関係',
          carryingAmountMillion: 14500,
          holdingRatio: 1.0,
          purpose: '「ヒートテック」「エアリズム」「ウルトラライトダウン」等の独占的機能性素材の共同開発',
          statusNote: '20年以上にわたる素材戦略提携アライアンス'
        }
      ]
    },
    realEstate: {
      landBookValueMillion: 65000, // 土地簿価 約650億円
      buildingsBookValueMillion: 240000, // 建物・店舗内装 約2,400億円
      rentalPropertiesFairValueMillion: 0,
      rentalPropertiesBookValueMillion: 0,
      unrealizedGainMillion: 0,
      mainFacilities: [
        {
          name: 'UNIQLO CITY TOKYO (有明本部 ＆ 次世代自動物流センター)',
          location: '東京都江東区有明1-6-7',
          areaOrScale: '地上6階 延床面積 約11万㎡ 自社拠点',
          purpose: '商品企画・デザイン・マーケティング・全自動スマート倉庫の統合ヘッドクオーター'
        },
        {
          name: 'ファーストリテイリング 山口本社',
          location: '山口県山口市佐山717-1',
          areaOrScale: '登記上本店・管理拠点',
          purpose: '総務・人事・経理統括・研修センター'
        },
        {
          name: 'ユニクロ 銀座店 / UNIQLO TOKYO (マロニエゲート銀座)',
          location: '東京都中央区銀座',
          areaOrScale: '全12フロア / 4フロア グローバル旗艦店',
          purpose: 'LifeWearの最新世界観を発信する最高峰ショールーム・旗艦店舗'
        },
        {
          name: 'UNIQLO 5th Avenue Global Flagship',
          location: '米国ニューヨーク 5番街 (666 5th Ave)',
          areaOrScale: 'メガグローバル旗艦店',
          purpose: '北米市場のブランディング・発信拠点'
        },
        {
          name: 'UNIQLO Paris Opéra',
          location: 'フランス・パリ オペラ座前',
          areaOrScale: '歴史的建造物リノベーション店舗',
          purpose: '欧州ファッションの中心地でのLifeWear浸透拠点'
        }
      ]
    },
    totalLiquidAssetsMillion: 1504000, // 現金+有価証券+土地 = 約1.5兆円
    marketCapCoverageRatio: 10.2
  },

  // ⑦ コーエーテクモホールディングス (3635)
  '3635': {
    tickerCode: '3635',
    companyName: 'コーエーテクモホールディングス株式会社',
    asOfDate: '2024年3月期 有価証券報告書 開示基準',
    cash: {
      cashAndEquivalentsMillion: 38500, // 手元現預金 約385億円
      interestBearingDebtMillion: 0, // 有利子負債ゼロ（完全無借金経営）
      netCashMillion: 38500, // ネットキャッシュ 約385億円
      cashToMonthlySalesRatio: 5.46,
      financialStatus: 'debt_free',
    },
    securities: {
      totalInvestmentSecuritiesMillion: 135800, // 投資有価証券 約1,358億円 (総資産の53%を有価証券で保有)
      policyHoldingSecuritiesMillion: 28500, // 政策保有株式 約285億円
      policyReductionPolicy: '事業シナジーのあるIP連携先への出資を維持しつつ、余剰資金は襟川会長主導のグローバル債券・株式・ファンド運用ポートフォリオに機動的配分。',
      holdings: [
        {
          name: 'グローバル株式・米国ハイテク株・ファンド運用ポートフォリオ',
          tickerCode: '有価証券運用',
          shares: '襟川恵子会長主導の分散運用',
          carryingAmountMillion: 107300, // 約1,073億円
          holdingRatio: 100.0,
          purpose: '「女帝」襟川会長による直接指揮のもと、年利8〜10%の投資運用益を創出し営業外収益を最大化',
          statusNote: '年間140億円超の営業外収益を生み出す中核運用エンジン'
        },
        {
          name: '株式会社スクウェア・エニックス・HD',
          tickerCode: '9684 (東証P)',
          shares: '150万株',
          carryingAmountMillion: 9800, // 約98億円
          holdingRatio: 1.2,
          purpose: '『ドラゴンクエスト ビルダーズ』等の共同開発アライアンスおよびゲーム業界連携',
          statusNote: '長年の共同開発パートナーシップ'
        },
        {
          name: '東映アニメーション株式会社',
          tickerCode: '4816 (東証S)',
          shares: '85万株',
          carryingAmountMillion: 4800,
          holdingRatio: 1.0,
          purpose: 'アニメIPのゲーム化ライセンス許諾およびコラボレーション',
          statusNote: 'アニメIP受託開発連携'
        },
        {
          name: '株式会社ディー・エヌ・エー (DeNA)',
          tickerCode: '2432 (東証P)',
          shares: '120万株',
          carryingAmountMillion: 1960,
          holdingRatio: 1.0,
          purpose: 'スマートフォン向けゲームアプリ共同開発・運営連携',
          statusNote: 'モバイル展開の技術・パブリッシング連携'
        }
      ]
    },
    realEstate: {
      landBookValueMillion: 32000, // 土地簿価 約320億円
      buildingsBookValueMillion: 45000, // 建物簿価 約450億円
      rentalPropertiesFairValueMillion: 48000,
      rentalPropertiesBookValueMillion: 28000,
      unrealizedGainMillion: 20000,
      mainFacilities: [
        {
          name: 'KTビル (みなとみらい本社 ＆ KT Zepp Yokohama)',
          location: '神奈川県横浜市西区みなとみらい4-3-6',
          areaOrScale: '地上15階 自社保有最新鋭ビル（ライブハウス「KT Zepp Yokohama」併設）',
          purpose: 'グループ本社・ゲーム開発スタジオ・eスポーツ＆ライブエンタメ発信拠点'
        },
        {
          name: 'コーエーテクモ 日吉事業所 (創業の地)',
          location: '神奈川県横浜市港北区箕輪町1-18-12',
          areaOrScale: '研究開発拠点',
          purpose: 'CGアニメーション制作・サウンドスタジオ・品質管理ラボ'
        },
        {
          name: 'コーエーテクモ 京都スタジオ',
          location: '京都府京都市下京区',
          areaOrScale: '開発拠点',
          purpose: '関西圏の優秀なクリエイター・エンジニア開発ハブ'
        }
      ]
    },
    totalLiquidAssetsMillion: 206300, // 現金+有価証券+土地 = 約2,063億円
    marketCapCoverageRatio: 42.5
  }
};