export interface SectorCompany {
  name: string;
  enName?: string;
  codeOrSlug: string;
  isUnlisted: boolean;
  revenue: number; // 億円
  operatingIncome: number; // 億円
  opMargin: number; // %
  marketCapOrValuation: number; // 億円
  employees: number; // 名
  keyStrength: string;
  enKeyStrength?: string;
}

export interface SectorData {
  id: string;
  name: string;
  enName: string;
  emoji: string;
  summary: string;
  enSummary: string;
  marketSizeNote: string;
  enMarketSizeNote: string;
  totalMarketSize: number; // 億円
  avgOpMargin: number; // %
  cr3Ratio: number; // % 上位3社集中度
  companies: SectorCompany[];
}

export const SECTORS: SectorData[] = [
  {
    id: 'auto',
    name: '自動車・輸送用機器',
    enName: 'Automobiles & Transportation',
    emoji: '🚗',
    summary: 'EVシフト・SDV（ソフトウェア定義車両）への移行期。ハイブリッド車（HEV）で圧倒的収益力を誇るトヨタを筆頭に、ホンダ・日産が追随。',
    enSummary: 'Transition era towards EV and SDV (Software-Defined Vehicles). Toyota leads global profitability with HEVs, followed by Honda and Nissan.',
    marketSizeNote: '主要大手合計売上高 約88兆円',
    enMarketSizeNote: 'Top Leaders Combined Revenue ~¥88T',
    totalMarketSize: 885000,
    avgOpMargin: 8.4,
    cr3Ratio: 88.2,
    companies: [
      {
        name: 'トヨタ自動車',
        enName: 'Toyota Motor Corporation',
        codeOrSlug: '7203',
        isUnlisted: false,
        revenue: 450953,
        operatingIncome: 53529,
        opMargin: 11.87,
        marketCapOrValuation: 485000,
        employees: 375235,
        keyStrength: 'HEV世界首位、強固なサプライチェーンとグローバル生産力',
        enKeyStrength: 'World #1 in HEVs; unmatched global supply chain & scale.'
      },
      {
        name: '本田技研工業 (ホンダ)',
        enName: 'Honda Motor Co., Ltd.',
        codeOrSlug: '7267',
        isUnlisted: false,
        revenue: 204288,
        operatingIncome: 13819,
        opMargin: 6.76,
        marketCapOrValuation: 89000,
        employees: 197039,
        keyStrength: '二輪世界シェア首位、北米四輪およびF1・航空エンジン技術',
        enKeyStrength: 'World #1 in motorcycles; powerhouse in North American autos & aerospace.'
      },
      {
        name: '日産自動車',
        enName: 'Nissan Motor Co., Ltd.',
        codeOrSlug: '7201',
        isUnlisted: false,
        revenue: 126857,
        operatingIncome: 5687,
        opMargin: 4.48,
        marketCapOrValuation: 23000,
        employees: 131719,
        keyStrength: 'e-POWER技術、EV「リーフ/アリア」の量産ノウハウ',
        enKeyStrength: 'Proprietary e-POWER tech and mass-production EV expertise.'
      },
      {
        name: 'デンソー',
        enName: 'DENSO Corporation',
        codeOrSlug: '6902',
        isUnlisted: false,
        revenue: 71447,
        operatingIncome: 3806,
        opMargin: 5.33,
        marketCapOrValuation: 72000,
        employees: 164572,
        keyStrength: '世界屈指の自動車部品メガサプライヤー、電動化・自動運転コア部品',
        enKeyStrength: 'Global mega Tier-1 supplier leading electrification & ADAS components.'
      },
      {
        name: 'スズキ',
        enName: 'Suzuki Motor Corporation',
        codeOrSlug: '7269',
        isUnlisted: false,
        revenue: 53743,
        operatingIncome: 4656,
        opMargin: 8.66,
        marketCapOrValuation: 39000,
        employees: 70011,
        keyStrength: 'インド乗用車市場でシェア40%超、高収益な小型車・軽自動車',
        enKeyStrength: 'Over 40% passenger car share in India; high-margin compact cars.'
      }
    ]
  },
  {
    id: 'entertainment-game',
    name: 'ゲーム・エンタメ・IPビジネス',
    enName: 'Gaming & IP Entertainment',
    emoji: '🎮',
    summary: '強力なキャラクターIPとコンテンツ資産をテコに、映画・アニメ・グッズ・テーマパークへと多面展開するグローバル成長産業。',
    enSummary: 'Global growth sector leveraging premier character IP across movies, anime, merchandising, and theme parks.',
    marketSizeNote: '主要大手合計売上高 約22兆円',
    enMarketSizeNote: 'Top Leaders Combined Revenue ~¥22T',
    totalMarketSize: 220000,
    avgOpMargin: 19.8,
    cr3Ratio: 74.5,
    companies: [
      {
        name: 'ソニーグループ',
        enName: 'Sony Group Corporation',
        codeOrSlug: '6758',
        isUnlisted: false,
        revenue: 130208,
        operatingIncome: 12088,
        opMargin: 9.28,
        marketCapOrValuation: 175000,
        employees: 113000,
        keyStrength: 'PlayStation生態系、音楽・アニメ（Aniplex）の世界的IP覇権',
        enKeyStrength: 'PlayStation ecosystem, music publishing & global anime IP leadership.'
      },
      {
        name: '任天堂',
        enName: 'Nintendo Co., Ltd.',
        codeOrSlug: '7974',
        isUnlisted: false,
        revenue: 16718,
        operatingIncome: 5289,
        opMargin: 31.63,
        marketCapOrValuation: 104000,
        employees: 7724,
        keyStrength: 'マリオ・ポケモン・ゼルダ等の超強力自社IP、高利益率ハード・ソフト一体モデル',
        enKeyStrength: 'Unmatched proprietary IP (Mario, Pokemon, Zelda) with high-margin hardware/software.'
      },
      {
        name: 'バンダイナムコHD',
        enName: 'Bandai Namco Holdings Inc.',
        codeOrSlug: '7832',
        isUnlisted: false,
        revenue: 10502,
        operatingIncome: 906,
        opMargin: 8.63,
        marketCapOrValuation: 21000,
        employees: 10243,
        keyStrength: 'ガンダム・ワンピース・ドラゴンボール等の世界的トイホビー・ゲーム展開',
        enKeyStrength: 'Global toy, hobby & digital games powerhouse (Gundam, One Piece, Dragon Ball).'
      },
      {
        name: '集英社',
        enName: 'Shueisha Inc.',
        codeOrSlug: 'shueisha',
        isUnlisted: true,
        revenue: 2096,
        operatingIncome: 450,
        opMargin: 21.47,
        marketCapOrValuation: 6500,
        employees: 820,
        keyStrength: '少年ジャンプ発の世界的マンガIP群、MANGA Plusによる海外直接配信',
        enKeyStrength: 'Shonen Jump mega IP catalog; direct global distribution via MANGA Plus.'
      },
      {
        name: 'コーエーテクモHD',
        enName: 'Koei Tecmo Holdings Co., Ltd.',
        codeOrSlug: '3635',
        isUnlisted: false,
        revenue: 846,
        operatingIncome: 285,
        opMargin: 33.68,
        marketCapOrValuation: 5500,
        employees: 2310,
        keyStrength: '「信長の野望」「三國志」等の長寿IP、営業利益率30%超の高収益体質',
        enKeyStrength: 'Evergreen historical strategy franchises; industry-leading >30% operating margins.'
      }
    ]
  },
  {
    id: 'cloud-saas-b2b',
    name: 'クラウドSaaS・B2B・産業DX',
    enName: 'Enterprise Cloud SaaS & DX',
    emoji: '💻',
    summary: '企業の業務効率化・バックオフィス自動化・産業受発注DXを推進する高成長SaaS・AIセクター。',
    enSummary: 'High-growth SaaS & AI sector driving enterprise automation and industrial procurement transformation.',
    marketSizeNote: '主要大手合計売上高 約5.5兆円',
    enMarketSizeNote: 'Top Leaders Combined Revenue ~¥5.5T',
    totalMarketSize: 55000,
    avgOpMargin: 18.5,
    cr3Ratio: 62.0,
    companies: [
      {
        name: 'キーエンス',
        enName: 'Keyence Corporation',
        codeOrSlug: '6861',
        isUnlisted: false,
        revenue: 9672,
        operatingIncome: 4950,
        opMargin: 51.17,
        marketCapOrValuation: 162000,
        employees: 10597,
        keyStrength: 'ファブレス直販体制、驚異の営業利益率50%超、製造業DXの世界的覇者',
        enKeyStrength: 'Direct sales fabless model with >50% operating margins; global factory automation leader.'
      },
      {
        name: 'SmartHR',
        enName: 'SmartHR, Inc.',
        codeOrSlug: 'smarthr',
        isUnlisted: true,
        revenue: 150,
        operatingIncome: 15,
        opMargin: 10.0,
        marketCapOrValuation: 2100,
        employees: 1200,
        keyStrength: '国内クラウド人事労務ソフト圧倒的シェア、エンタープライズ顧客急拡大',
        enKeyStrength: 'Dominant cloud HR & labor management market share in Japan.'
      },
      {
        name: 'LayerX',
        enName: 'LayerX Inc.',
        codeOrSlug: 'layerx',
        isUnlisted: true,
        revenue: 65,
        operatingIncome: 5,
        opMargin: 7.69,
        marketCapOrValuation: 950,
        employees: 350,
        keyStrength: '支出管理SaaS「バクラク」の爆発的普及、AI-OCR・Fintech統合力',
        enKeyStrength: 'Explosive adoption of Bakuraku spend management SaaS with AI OCR & Fintech.'
      }
    ]
  },
  {
    id: 'beverage-food',
    name: '飲料・食品・酒類',
    enName: 'Beverages & Food Conglomerates',
    emoji: '🍻',
    summary: '国内の安定キャッシュフローを基盤に、欧米・アジアでの大型M&Aを通じて世界的メガ飲料グループへと飛躍。',
    enSummary: 'Global beverage giants leveraging robust domestic cash flows to expand aggressively in US & Europe.',
    marketSizeNote: '主要大手合計売上高 約12兆円',
    enMarketSizeNote: 'Top Leaders Combined Revenue ~¥12T',
    totalMarketSize: 120000,
    avgOpMargin: 9.2,
    cr3Ratio: 78.4,
    companies: [
      {
        name: 'サントリーHD',
        enName: 'Suntory Holdings Limited',
        codeOrSlug: 'suntory',
        isUnlisted: true,
        revenue: 32851,
        operatingIncome: 3220,
        opMargin: 9.80,
        marketCapOrValuation: 35000,
        employees: 41846,
        keyStrength: 'ビームサントリー（ジムビーム）買収による世界的スピリッツ展開、ウイスキー「山崎」',
        enKeyStrength: 'Global spirits empire via Beam Suntory acquisition; world-renowned Yamazaki whisky.'
      }
    ]
  },
  {
    id: 'tech-ai-semicon',
    name: '電機・AI・半導体・先端投資',
    enName: 'Tech, AI & Semiconductors',
    emoji: '🤖',
    summary: '生成AI時代の基盤となる先端半導体製造装置、AIチップ設計、超巨大テック投資ファンドが集結。',
    enSummary: 'Next-gen silicon equipment, AI chip architectures, and global super-intelligence investment funds.',
    marketSizeNote: '主要大手合計売上高 約25兆円',
    enMarketSizeNote: 'Top Leaders Combined Revenue ~¥25T',
    totalMarketSize: 250000,
    avgOpMargin: 16.4,
    cr3Ratio: 82.1,
    companies: [
      {
        name: 'ソフトバンクグループ',
        enName: 'SoftBank Group Corp.',
        codeOrSlug: '9984',
        isUnlisted: false,
        revenue: 67565,
        operatingIncome: 9500,
        opMargin: 14.06,
        marketCapOrValuation: 135000,
        employees: 64205,
        keyStrength: 'ARMの90%超保有、世界最大のAI投資ビジョンファンド（SVF）を統括',
        enKeyStrength: 'Controls >90% of ARM; oversees world’s largest AI investment vehicle (SVF).'
      },
      {
        name: 'Preferred Networks',
        enName: 'Preferred Networks, Inc.',
        codeOrSlug: 'pfn',
        isUnlisted: true,
        revenue: 120,
        operatingIncome: -15,
        opMargin: -12.5,
        marketCapOrValuation: 3000,
        employees: 450,
        keyStrength: '独自AI半導体「MN-Core」開発、生成AI基盤モデル「PLaMo」',
        enKeyStrength: 'Custom AI silicon (MN-Core) and proprietary foundation LLM PLaMo.'
      }
    ]
  },
  {
    id: 'retail-apparel',
    name: 'グローバル小売・アパレルSPA・モビリティ',
    enName: 'Global Retail, Apparel & Mobility',
    emoji: '👕',
    summary: '企画・製造・物流・販売を一気通貫で手掛けるSPAモデルにより、世界最高水準のサプライチェーンと高い収益性を実現。',
    enSummary: 'Vertically integrated SPA retail model achieving world-class supply chain efficiency.',
    marketSizeNote: '主要大手合計売上高 約10兆円',
    enMarketSizeNote: 'Top Leaders Combined Revenue ~¥10T',
    totalMarketSize: 100000,
    avgOpMargin: 14.8,
    cr3Ratio: 85.0,
    companies: [
      {
        name: 'ファーストリテイリング',
        enName: 'Fast Retailing Co., Ltd.',
        codeOrSlug: '9983',
        isUnlisted: false,
        revenue: 31038,
        operatingIncome: 5009,
        opMargin: 16.14,
        marketCapOrValuation: 154000,
        employees: 59876,
        keyStrength: '「ユニクロ」「GU」のグローバル展開、高機能素材（ヒートテック等）での圧倒的強み',
        enKeyStrength: 'Global scale of UNIQLO and GU; functional fabric innovations (HEATTECH).'
      }
    ]
  }
];