export interface CostItem {
  name: string;
  ratio: number; // 売上高に対する比率 (%)
  amountMillion: number; // 百万円
  description: string;
}

export interface ProfitAnatomy {
  tickerCode: string;
  companyName: string;
  fiscalYear: string; // "2024年3月期"
  revenueMillion: number; // 売上高 (百万円)
  cogsRatio: number; // 売上原価率 (%)
  cogsMillion: number; // 売上原価 (百万円)
  grossMarginRatio: number; // 売上総利益率 (%)
  sgaRatio: number; // 販管費率 (%)
  sgaMillion: number; // 販管費 (百万円)
  operatingMarginRatio: number; // 営業利益率 (%)
  operatingIncomeMillion: number; // 営業利益 (百万円)
  
  // 販管費・原価の詳細コスト内訳
  costBreakdown: {
    laborCostRatio: number; // 人件費比率 (売上高比 %)
    laborCostMillion: number; // 人件費 (百万円)
    laborCostNote: string; // 人件費の特徴 (平均年収・1人あたり営業利益)
    rdCostRatio: number; // 研究開発費比率 (売上高比 %)
    rdCostMillion: number; // 研究開発費 (百万円)
    advertisingCostRatio: number; // 広告宣伝費比率 (売上高比 %)
    advertisingCostMillion: number; // 広告宣伝費 (百万円)
    otherSgaRatio: number; // その他販管費比率 (%)
  };

  // 営業外収益・経常利益（投資・資産運用益の解剖）
  nonOperating: {
    nonOperatingIncomeMillion: number; // 営業外収益 (百万円)
    nonOperatingExpensesMillion: number; // 営業外費用 (百万円)
    netNonOperatingMillion: number; // 営業外損益 (百万円)
    nonOperatingRatio: number; // 売上高に対する営業外損益比率 (%)
    keyDrivers: string; // 営業外収益の源泉 (有価証券運用益、受取利息配当、為替差益等)
  };

  ordinaryIncomeMillion: number; // 経常利益 (百万円)
  ordinaryMarginRatio: number; // 経常利益率 (%)
  netIncomeMillion: number; // 当期純利益 (百万円)
  netMarginRatio: number; // 当期純利益率 (%)

  // 生産性指標
  productivity: {
    employeesCount: number; // 従業員数 (名)
    revenuePerEmployeeMillion: number; // 1人あたり売上高 (百万円/名)
    operatingIncomePerEmployeeMillion: number; // 1人あたり営業利益 (百万円/名)
    avgAnnualSalaryThousandYen: number; // 平均年間給与 (千円)
  };

  // 儲けのカラクリ深層解説
  secretMechanism: {
    headline: string; // 「なぜこの企業は桁外れに儲かるのか？」の要約見出し
    costControlSecret: string; // 原価・コストを抑え込むカラクリ
    profitEngine: string; // 利益率を極限まで引き上げるメカニズム
    investmentLeverageSecret?: string; // 営業外収益・投資運用のカラクリ (光栄テクモ型等)
  };
}

export const PROFIT_ANATOMIES: { [ticker: string]: ProfitAnatomy } = {
  // ① コーエーテクモホールディングス (3635) - 投資運用による巨額営業外収益の象徴
  '3635': {
    tickerCode: '3635',
    companyName: 'コーエーテクモホールディングス株式会社',
    fiscalYear: '2024年3月期 決算有報ベース',
    revenueMillion: 84584, // 845.8億円
    cogsRatio: 47.2, // 原価率 47.2%
    cogsMillion: 39923,
    grossMarginRatio: 52.8,
    sgaRatio: 19.1, // 販管費率 19.1%
    sgaMillion: 16183,
    operatingMarginRatio: 33.7, // 営業利益率 33.7% (284.7億円)
    operatingIncomeMillion: 28478,
    costBreakdown: {
      laborCostRatio: 18.5,
      laborCostMillion: 15650,
      laborCostNote: 'ゲームクリエイター・エンジニアのインセンティブ連動給与（平均年収約750万円＋業績特別賞与）',
      rdCostRatio: 12.0,
      rdCostMillion: 10150,
      advertisingCostRatio: 6.5,
      advertisingCostMillion: 5500,
      otherSgaRatio: 0.6
    },
    nonOperating: {
      nonOperatingIncomeMillion: 15200, // 営業外収益 152億円 (有価証券売却益・デリバティブ益・受取配当)
      nonOperatingExpensesMillion: 850,
      netNonOperatingMillion: 14350, // ネット営業外収益 +143.5億円
      nonOperatingRatio: 17.0, // 売上高のなんと17%に相当する営業外利益
      keyDrivers: '「女帝」と称される襟川恵子会長による卓越したグローバル有価証券運用（米国テック株、国債、ファンド運用益）'
    },
    ordinaryIncomeMillion: 42828, // 経常利益 428.2億円
    ordinaryMarginRatio: 50.6, // 経常利益率は驚異の 50.6%（営業利益284億 ＋ 運用益143億！）
    netIncomeMillion: 33500,
    netMarginRatio: 39.6,
    productivity: {
      employeesCount: 2250,
      revenuePerEmployeeMillion: 37.6,
      operatingIncomePerEmployeeMillion: 12.6,
      avgAnnualSalaryThousandYen: 7520
    },
    secretMechanism: {
      headline: 'ゲーム本業の高利益率（34%）× 襟川会長の有価証券運用（+143億円）による「経常利益率50%超」の超錬金術',
      costControlSecret: '自社開発ゲームのマルチプラットフォーム（PS5, Switch, Steam, スマホ）展開による開発費用の回収最大化と、外部IP（ゼルダ無双、Fate、ドラクエビルダーズ等）の受託・共同開発による手堅い開発費前受けモデル。',
      profitEngine: '信長の野望・三國志・無双・アトリエシリーズ等の定番IPのDLC販売とスマホライセンス（中国向けIP許諾ロイヤリティは原価ゼロで利益率90%超）。',
      investmentLeverageSecret: '1,300億円超の余裕資金を元手に、襟川恵子会長が自ら陣頭指揮を執る資産運用部門が米国ハイテク株や高格付け債券を機動的に売買。年利10%近いリターンを叩き出し、本業の営業利益（284億円）の上に143億円の営業外利益を上乗せする日本唯一のゲーム投資会社モデル。'
    }
  },

  // ② キーエンス (6861) - 営業利益率51%の完全ファブレス直販マシン
  '6861': {
    tickerCode: '6861',
    companyName: '株式会社キーエンス',
    fiscalYear: '2024年3月期 決算有報ベース',
    revenueMillion: 967288, // 9,672億円
    cogsRatio: 17.8, // 原価率わずか17.8% (売上総利益率 82.2%！)
    cogsMillion: 172177,
    grossMarginRatio: 82.2,
    sgaRatio: 31.0, // 販管費率 31.0% (人件費が中心)
    sgaMillion: 300050,
    operatingMarginRatio: 51.2, // 営業利益率 51.2% (4,950億円)
    operatingIncomeMillion: 495061,
    costBreakdown: {
      laborCostRatio: 15.8,
      laborCostMillion: 152800,
      laborCostNote: '平均年間給与 2,279万円（日本トップクラス）。営業利益の約1/3を社員に業績賞与として還元し高モチベーションを維持',
      rdCostRatio: 3.2,
      rdCostMillion: 30950,
      advertisingCostRatio: 2.1,
      advertisingCostMillion: 20310,
      otherSgaRatio: 9.9
    },
    nonOperating: {
      nonOperatingIncomeMillion: 28500, // 受取利息・有価証券利息
      nonOperatingExpensesMillion: 1200,
      netNonOperatingMillion: 27300,
      nonOperatingRatio: 2.8,
      keyDrivers: '手元現預金6,850億円およびAAA公社債1.6兆円の安全運用による利息・配当収入'
    },
    ordinaryIncomeMillion: 522361, // 経常利益 5,223億円
    ordinaryMarginRatio: 54.0,
    netIncomeMillion: 369634,
    netMarginRatio: 38.2,
    productivity: {
      employeesCount: 10580,
      revenuePerEmployeeMillion: 91.4, // 1人あたり売上 9,140万円
      operatingIncomePerEmployeeMillion: 46.8, // 1人あたり営業利益 4,680万円 (驚異的)
      avgAnnualSalaryThousandYen: 22790
    },
    secretMechanism: {
      headline: '「原価率18%の超高付加価値製品」×「代理店を通さない直販コンサル営業」による営業利益率51%独走',
      costControlSecret: '工場を持たない完全ファブレス体制により、工場建設費・減価償却費・工員固定費を完全ゼロ化。量産は外部協力工場へ委託し、自社は企画・設計・ソフトウェア開発に特化。',
      profitEngine: '新製品の約7割が「世界初・業界初」。顧客工場の潜在課題を現場で発見し、競合が存在しないため値引き競争に巻き込まれず定価販売（売上総利益率82%）。専任営業が即日デモ・即日納品する圧倒的スピードで顧客を囲い込み。',
      investmentLeverageSecret: '完全無借金で蓄積した2.3兆円のキャッシュ・有価証券から年間270億円超の確実な金利・配当収入を得る超手堅い運用。'
    }
  },

  // ③ トヨタ自動車 (7203) - 巨大スケールとトヨタ生産方式（TPS）の原価低減
  '7203': {
    tickerCode: '7203',
    companyName: 'トヨタ自動車株式会社',
    fiscalYear: '2024年3月期 決算有報ベース',
    revenueMillion: 45095325, // 45.09兆円
    cogsRatio: 79.2, // 原価率 79.2% (自動車製造の標準的だがHEV高収益)
    cogsMillion: 35715500,
    grossMarginRatio: 20.8,
    sgaRatio: 8.9, // 販管費率わずか 8.9% (徹底したリーン体制)
    sgaMillion: 4026925,
    operatingMarginRatio: 11.9, // 営業利益率 11.9% (5.35兆円 日本企業史上最高)
    operatingIncomeMillion: 5352900,
    costBreakdown: {
      laborCostRatio: 9.2,
      laborCostMillion: 4148000,
      laborCostNote: 'グループ連結37.5万人の人件費（高効率ラインとカイゼンによる工数削減）',
      rdCostRatio: 2.8,
      rdCostMillion: 1262000,
      advertisingCostRatio: 1.1,
      advertisingCostMillion: 496000,
      otherSgaRatio: 5.0
    },
    nonOperating: {
      nonOperatingIncomeMillion: 1820000, // 持分法投資利益・金融収益
      nonOperatingExpensesMillion: 310000,
      netNonOperatingMillion: 1510000, // 営業外益 +1.51兆円
      nonOperatingRatio: 3.3,
      keyDrivers: '豊田自動織機・アイシン・デンソー等の持分法投資利益およびトヨタファイナンシャルサービスのローン金利利ざや'
    },
    ordinaryIncomeMillion: 6862900, // 経常利益 6.86兆円
    ordinaryMarginRatio: 15.2,
    netIncomeMillion: 4944900,
    netMarginRatio: 11.0,
    productivity: {
      employeesCount: 375235,
      revenuePerEmployeeMillion: 120.2,
      operatingIncomePerEmployeeMillion: 14.3,
      avgAnnualSalaryThousandYen: 8950
    },
    secretMechanism: {
      headline: '年間1,000万台の購買スケール × トヨタ生産方式（TPSカイゼン）× 自社金融の金利マージン',
      costControlSecret: '「ジャスト・イン・タイム（JIT）」による在庫ゼロ化、系列サプライヤーとの共通プラットフォーム（TNGA）による金型・部品共用化で部品調達コストを極限まで低減。',
      profitEngine: '量産25年の実績を持つハイブリッド車（HEV）が、競合EVの減速を背景に北米・世界で大ヒット。電池・インバータの自社量産による低コスト化で、ガソリン車以上の高マージンを獲得。',
      investmentLeverageSecret: '系列部品メーカー（デンソー・豊田自動織機等）からの巨額配当・持分法利益に加え、世界40カ国の自動車ローン・リース金融（トヨタファイナンシャルサービス）から数千億円の金利利ざやが安定計上される複層収益モデル。'
    }
  },

  // ④ 任天堂 (7974) - 原価ゼロのIPロイヤリティと高利益率デジタル販売
  '7974': {
    tickerCode: '7974',
    companyName: '任天堂株式会社',
    fiscalYear: '2024年3月期 決算有報ベース',
    revenueMillion: 1671865, // 1.67兆円
    cogsRatio: 43.1, // 原価率 43.1% (ハードウェア比率が高い中でも低原価)
    cogsMillion: 720573,
    grossMarginRatio: 56.9,
    sgaRatio: 25.3, // 販管費率 25.3%
    sgaMillion: 422392,
    operatingMarginRatio: 31.6, // 営業利益率 31.6% (5,289億円)
    operatingIncomeMillion: 528900,
    costBreakdown: {
      laborCostRatio: 6.8,
      laborCostMillion: 113600,
      laborCostNote: '精鋭7,700名体制（平均年収約985万円）。自社少数精鋭で開発しサードパーティに製造・流通を委託',
      rdCostRatio: 8.2,
      rdCostMillion: 137000,
      advertisingCostRatio: 6.2,
      advertisingCostMillion: 103600,
      otherSgaRatio: 4.1
    },
    nonOperating: {
      nonOperatingIncomeMillion: 153000, // 営業外収益 1,530億円 (為替差益・受取利息・ポケモン持分法利益)
      nonOperatingExpensesMillion: 1100,
      netNonOperatingMillion: 151900, // ネット営業外収益 +1,519億円
      nonOperatingRatio: 9.1, // 売上高の約9%に達する営業外利益
      keyDrivers: '外貨建て手元資産（米ドル等）の円安に伴う巨額の為替差益、1.6兆円の現預金利息、株式会社ポケモンの持分法投資利益'
    },
    ordinaryIncomeMillion: 680800, // 経常利益 6,808億円
    ordinaryMarginRatio: 40.7, // 経常利益率 40.7% (営業利益5,289億 ＋ 営業外1,519億)
    netIncomeMillion: 490600,
    netMarginRatio: 29.3,
    productivity: {
      employeesCount: 7724,
      revenuePerEmployeeMillion: 216.4, // 1人あたり売上 2.16億円
      operatingIncomePerEmployeeMillion: 68.5, // 1人あたり営業利益 6,850万円 (メガテック並)
      avgAnnualSalaryThousandYen: 9850
    },
    secretMechanism: {
      headline: '「自社ファーストパーティソフト比率80%超」×「デジタルDL・DLC販売」×「外貨為替・ポケモン持分益」',
      costControlSecret: 'Switchハードウェアは発売から年数が経つにつれて部品コスト（SoC・液晶）が低減。ハード製造を鴻海等に全面外部委託し固定資産を持たない身軽な体制。',
      profitEngine: '『マリオ』『ゼルダ』等の自社製ソフトはパッケージ原価・中間マージンが極小で粗利率85%超。さらにeショップでのダウンロード販売は流通手数料ゼロ、Nintendo Switch Online会費は原価ゼロの安定ストック収益。',
      investmentLeverageSecret: '1.6兆円の超巨額キャッシュを海外通貨（ドル・ユーロ）で保有するため、円安局面で数百億円〜千億円規模の「為替差益」が自動発生。さらに株式会社ポケモン（出資32%）から毎年数百億円の持分法投資利益が営業外に上乗せ。'
    }
  },

  // ⑤ ソニーグループ (6758) - エンタメ・ゲームサブスクとCMOS半導体の複合収益
  '6758': {
    tickerCode: '6758',
    companyName: 'ソニーグループ株式会社',
    fiscalYear: '2024年3月期 決算有報ベース',
    revenueMillion: 13020760, // 13.02兆円
    cogsRatio: 72.8,
    cogsMillion: 9479113,
    grossMarginRatio: 27.2,
    sgaRatio: 17.9,
    sgaMillion: 2332800,
    operatingMarginRatio: 9.3, // 営業利益 1.20兆円
    operatingIncomeMillion: 1208847,
    costBreakdown: {
      laborCostRatio: 11.2,
      laborCostMillion: 1458000,
      laborCostNote: 'グローバル11.3万人（ハリウッド映画スタジオ、音楽レーベル、半導体技術者）',
      rdCostRatio: 5.6,
      rdCostMillion: 729000,
      advertisingCostRatio: 3.8,
      advertisingCostMillion: 494000,
      otherSgaRatio: 6.6
    },
    nonOperating: {
      nonOperatingIncomeMillion: 145000,
      nonOperatingExpensesMillion: 75000,
      netNonOperatingMillion: 70000,
      nonOperatingRatio: 0.5,
      keyDrivers: 'エムスリー等の持分法投資利益、保有有価証券運用益、金融子会社シナジー'
    },
    ordinaryIncomeMillion: 1278847, // 経常利益 1.28兆円
    ordinaryMarginRatio: 9.8,
    netIncomeMillion: 970560,
    netMarginRatio: 7.5,
    productivity: {
      employeesCount: 113000,
      revenuePerEmployeeMillion: 115.2,
      operatingIncomePerEmployeeMillion: 10.7,
      avgAnnualSalaryThousandYen: 11020
    },
    secretMechanism: {
      headline: 'PS Plus課金 ＆ 音楽ストリーミングの「超高収益リカーリング（継続課金）」× CMOSセンサー世界首位の独占力',
      costControlSecret: 'ハードウェア単体での利益に依存せず、PS5を普及台数ベース（インストールベース）として位置づけ、その上で動くデジタル課金で回収するモデル。',
      profitEngine: 'PlayStation Plus月額課金、サードパーティ製ゲームの決済手数料（約30%）、Spotify等の音楽ストリーミングから入る楽曲使用料（原価ゼロで高マージン）。',
      investmentLeverageSecret: 'Epic GamesやBilibili、KADOKAWA等への戦略出資を通じて、IP映画化・ゲーム化の独占優先権を確保しつつ含み益を最大化。'
    }
  },

  // ⑥ ソフトバンクグループ (9984) - レバレッジと持株会社型投資ポートフォリオ
  '9984': {
    tickerCode: '9984',
    companyName: 'ソフトバンクグループ株式会社',
    fiscalYear: '2024年3月期 決算有報ベース',
    revenueMillion: 6756400, // 6.75兆円
    cogsRatio: 48.5,
    cogsMillion: 3276854,
    grossMarginRatio: 51.5,
    sgaRatio: 38.9,
    sgaMillion: 2628246,
    operatingMarginRatio: 12.6,
    operatingIncomeMillion: 851300,
    costBreakdown: {
      laborCostRatio: 12.5,
      laborCostMillion: 844550,
      laborCostNote: '英Armの先端チップ設計エンジニアおよびグローバル投資プロフェッショナル報酬',
      rdCostRatio: 6.2,
      rdCostMillion: 418896,
      advertisingCostRatio: 3.5,
      advertisingCostMillion: 236474,
      otherSgaRatio: 16.7
    },
    nonOperating: {
      nonOperatingIncomeMillion: 1240000, // 投資損益・派生金融商品益
      nonOperatingExpensesMillion: 890000, // 巨額の社債利息・借入金利
      netNonOperatingMillion: 350000,
      nonOperatingRatio: 5.2,
      keyDrivers: 'Arm上場益・株式評価益、国内通信子会社からの配当金（年間約1,600億円）'
    },
    ordinaryIncomeMillion: 1201300,
    ordinaryMarginRatio: 17.8,
    netIncomeMillion: 820000,
    netMarginRatio: 12.1,
    productivity: {
      employeesCount: 63000,
      revenuePerEmployeeMillion: 107.2,
      operatingIncomePerEmployeeMillion: 13.5,
      avgAnnualSalaryThousandYen: 13200
    },
    secretMechanism: {
      headline: '英Armの半導体知的所有権（ロイヤリティ）× 28兆円のNAV（保有株価値）をテコにした借入レバレッジ',
      costControlSecret: '投資先企業のオペレーションは各社経営陣に委ね、持株会社単体は数百名の少数精鋭プロ集団で低固定費運営。',
      profitEngine: '世界中のスマホ・サーバーに組み込まれるArmアーキテクチャの出荷ライセンス料（出荷台数に応じたロイヤリティ収入は粗利90%以上）。',
      investmentLeverageSecret: '国内通信事業（9434）とT-Mobileから毎年数千億円の安定配当キャッシュフローを吸い上げ、それを元手に社債を発行して世界中のAIスタートアップへ巨額投資するダイナミックな資本錬金術。'
    }
  },

  // ⑦ ファーストリテイリング (9983) - SPAサプライチェーン完全自動化と直営マージン
  '9983': {
    tickerCode: '9983',
    companyName: '株式会社ファーストリテイリング',
    fiscalYear: '2024年8月期 決算有報ベース',
    revenueMillion: 3103836, // 3.10兆円
    cogsRatio: 47.4, // 原価率 47.4% (売上総利益率 52.6%)
    cogsMillion: 1471218,
    grossMarginRatio: 52.6,
    sgaRatio: 36.5, // 販管費率 36.5% (店舗人件費・物流費・家賃)
    sgaMillion: 1131688,
    operatingMarginRatio: 16.1, // 営業利益率 16.1% (5,009億円 アパレル世界最高峰)
    operatingIncomeMillion: 500930,
    costBreakdown: {
      laborCostRatio: 14.8,
      laborCostMillion: 459367,
      laborCostNote: 'グローバル直営店スタッフ・本部スタッフ（初任給30万円への引き上げと成果主義昇給）',
      rdCostRatio: 0.8,
      rdCostMillion: 24830,
      advertisingCostRatio: 3.4,
      advertisingCostMillion: 105530,
      otherSgaRatio: 17.5
    },
    nonOperating: {
      nonOperatingIncomeMillion: 65000, // 受取利息・為替差益
      nonOperatingExpensesMillion: 9500,
      netNonOperatingMillion: 55500,
      nonOperatingRatio: 1.8,
      keyDrivers: '1.2兆円を超える手元現預金の金利運用益および外貨資産の為替差益'
    },
    ordinaryIncomeMillion: 556430, // 経常利益 5,564億円
    ordinaryMarginRatio: 17.9,
    netIncomeMillion: 371900,
    netMarginRatio: 12.0,
    productivity: {
      employeesCount: 59800,
      revenuePerEmployeeMillion: 51.9,
      operatingIncomePerEmployeeMillion: 8.4,
      avgAnnualSalaryThousandYen: 9590
    },
    secretMechanism: {
      headline: '「SPA（製造小売）による問屋・中間マージン完全排除」×「東レ協業による高機能定番素材」×「RFID全自動物流」',
      costControlSecret: '定番商品に絞り込み、東レ等の素材メーカーと年単位で長期大量契約。全商品にRFIDタグを装着し、倉庫ピッキング・レジ会計を自動化して物流・店舗人件費を大幅削減。',
      profitEngine: 'トレンド服ではなくヒートテック・エアリズム等の「通年・定番ベーシックウェア」のため値引き廃棄ロスが極端に少なく、定価販売比率が極めて高い（粗利率52.6%）。',
      investmentLeverageSecret: 'ネットキャッシュ9,000億円という圧倒的無借金キャッシュリッチのため、金利上昇局面で毎年数百億円の受取利息が自動加算される盤石の財務体質。'
    }
  }
};