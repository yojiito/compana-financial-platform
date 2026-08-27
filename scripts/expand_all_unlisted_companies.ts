import { prisma } from '../lib/prisma';
import fs from 'fs';
import path from 'path';

// 新規拡充する日本を代表する重要未上場企業リスト
export const NEW_UNLISTED_ENTITIES = [
  {
    slug: 'takenaka',
    name: '株式会社竹中工務店',
    englishName: 'Takenaka Corporation',
    establishedYear: 1899,
    location: '大阪府大阪市中央区本町4-1-13',
    representative: '佐々木 正人 代表取締役社長',
    corporateNumber: '3120001077469',
    industry: '建設業',
    englishIndustry: 'Construction',
    description: 'スーパーゼネコン5社の一角。1610年創業以来、棟梁精神と高い建築意匠・設計施工技術を誇り、非上場を堅持する日本屈指の名門建築企業。',
    englishDescription: 'One of Japan’s "Big Five" general contractors founded in 1610, renowned for architectural excellence and maintaining private ownership.',
    shareholders: [
      { rank: 1, name: '竹中育英会 / 創業家持株会', type: '財団・創業家', ratio: 0.0, sharesHeld: null, note: '公式出資・非公開会社 (譲渡制限株式)' },
      { rank: 2, name: '竹中工務店社員持株会', type: '従業員持株会', ratio: 0.0, sharesHeld: null, note: '従業員出資・インセンティブ持株' }
    ],
    gazette: [
      { fiscalPeriod: 86, periodEnd: '2025-12-31', gazetteDate: '2026-03-31', totalAssets: 1650000, totalLiabilities: 880000, netAssets: 770000, capitalStock: 50000, netIncome: 28500 }
    ],
    investments: [
      {
        id: 'takenaka-road',
        targetName: '株式会社竹中道路',
        targetEnName: 'Takenaka Civil Engineering & Road Co., Ltd.',
        category: 'group_subsidiary' as const,
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
    ]
  },
  {
    slug: 'ykk',
    name: 'YKK株式会社',
    englishName: 'YKK Corporation',
    establishedYear: 1934,
    location: '東京都千代田区神田和泉町1番地',
    representative: '大谷 裕明 代表取締役社長',
    corporateNumber: '6010001032696',
    industry: '機械・金属製品',
    englishIndustry: 'Machinery & Metal Products',
    description: 'ファスナー世界シェアNo.1のファスニング事業と、窓・アルミサッシ等の建材事業（YKK AP）を世界70カ国以上で展開するグローバル巨大メーカー。',
    englishDescription: 'World #1 global fastening powerhouse (zippers) & architectural products leader (YKK AP) operating across 70+ countries.',
    shareholders: [
      { rank: 1, name: '吉田育英会 / 創業家', type: '財団・創業家', ratio: 0.0, sharesHeld: null, note: '公式出資・非公開会社 (譲渡制限株式)' },
      { rank: 2, name: 'YKK社員持株会', type: '従業員持株会', ratio: 0.0, sharesHeld: null, note: '従業員出資・インセンティブ持株' }
    ],
    gazette: [
      { fiscalPeriod: 89, periodEnd: '2025-03-31', gazetteDate: '2025-06-30', totalAssets: 1020000, totalLiabilities: 380000, netAssets: 640000, capitalStock: 11992, netIncome: 45000 }
    ],
    investments: [
      {
        id: 'ykk-ap',
        targetName: 'YKK AP株式会社',
        targetEnName: 'YKK AP Inc.',
        category: 'group_subsidiary' as const,
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
    ]
  },
  {
    slug: 'yanmar',
    name: 'ヤンマーホールディングス株式会社',
    englishName: 'YANMAR HOLDINGS CO., LTD.',
    establishedYear: 1912,
    location: '大阪府大阪市北区茶屋町1-32',
    representative: '山岡 健人 代表取締役社長',
    corporateNumber: '7120001176440',
    industry: '機械',
    englishIndustry: 'Machinery',
    description: '世界初の小型ディーゼルエンジン実用化以来、トラクター・コンバイン等の農業機械、小型建設機械、舶用システム、発電システムを世界展開。',
    englishDescription: 'Pioneer of the world’s first commercial compact diesel engine; global manufacturer of agricultural machinery, compact construction equipment, and marine propulsion.',
    shareholders: [
      { rank: 1, name: '山岡育英会 / 創業家持株会社', type: '財団・創業家', ratio: 0.0, sharesHeld: null, note: '公式出資・非公開会社 (譲渡制限株式)' }
    ],
    gazette: [
      { fiscalPeriod: 22, periodEnd: '2025-03-31', gazetteDate: '2025-06-30', totalAssets: 1150000, totalLiabilities: 620000, netAssets: 530000, capitalStock: 90, netIncome: 52000 }
    ],
    investments: [
      {
        id: 'yanmar-agri',
        targetName: 'ヤンマーアグリ株式会社',
        targetEnName: 'Yanmar Agri Co., Ltd.',
        category: 'group_subsidiary' as const,
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
    ]
  },
  {
    slug: 'lotte-hd',
    name: '株式会社ロッテホールディングス',
    englishName: 'Lotte Holdings Co., Ltd.',
    establishedYear: 1948,
    location: '東京都新宿区西新宿3-20-1',
    representative: '重光 昭夫 代表取締役会長 / 玉塚 元一 代表取締役社長',
    corporateNumber: '1011101023020',
    industry: '食料品・サービス',
    englishIndustry: 'Foods & Services',
    description: '菓子・アイスクリーム（チョコパイ、爽、クーリッシュ等）大手の株式会社ロッテ、千葉ロッテマリーンズ、ホテル等を統括する持株会社。',
    englishDescription: 'Holding company governing LOTTE confectionery & ice cream (Choco Pie, Coolish), Chiba Lotte Marines, and hotel hospitality.',
    shareholders: [
      { rank: 1, name: '光潤社 / 創業家', type: '持株会社・創業家', ratio: 0.0, sharesHeld: null, note: '公式出資・非公開会社 (譲渡制限株式)' }
    ],
    gazette: [
      { fiscalPeriod: 76, periodEnd: '2025-03-31', gazetteDate: '2025-06-30', totalAssets: 750000, totalLiabilities: 310000, netAssets: 440000, capitalStock: 21700, netIncome: 18000 }
    ],
    investments: [
      {
        id: 'lotte-marines',
        targetName: '株式会社千葉ロッテマリーンズ',
        targetEnName: 'Chiba Lotte Marines Co., Ltd.',
        category: 'group_subsidiary' as const,
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
    ]
  },
  {
    slug: 'mori-building',
    name: '森ビル株式会社',
    englishName: 'Mori Building Co., Ltd.',
    establishedYear: 1959,
    location: '東京都港区六本木6-10-1 六本木ヒルズ森タワー',
    representative: '辻 慎吾 代表取締役社長',
    corporateNumber: '1010401029669',
    industry: '不動産業',
    englishIndustry: 'Real Estate',
    description: '「六本木ヒルズ」「虎ノ門ヒルズ」「麻布台ヒルズ」「表参道ヒルズ」等、東京の都市再生を牽引する日本最高峰の総合都市デベロッパー。',
    englishDescription: 'Premier Japanese urban landscape developer behind Roppongi Hills, Toranomon Hills, and Azabudai Hills.',
    shareholders: [
      { rank: 1, name: '森記念財団 / 創業家', type: '財団・創業家', ratio: 0.0, sharesHeld: null, note: '公式出資・非公開会社 (譲渡制限株式)' }
    ],
    gazette: [
      { fiscalPeriod: 66, periodEnd: '2025-03-31', gazetteDate: '2025-06-30', totalAssets: 2480000, totalLiabilities: 1760000, netAssets: 720000, capitalStock: 79500, netIncome: 46000 }
    ],
    investments: [
      {
        id: 'mori-hills-reit',
        targetName: '森ヒルズリート投資法人 (3234)',
        targetEnName: 'Mori Hills REIT Investment Corporation (3234)',
        tickerCode: '3234',
        category: 'listed_strategic' as const,
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
    ]
  },
  {
    slug: 'shinchosha',
    name: '株式会社新潮社',
    englishName: 'Shinchosha Publishing Co., Ltd.',
    establishedYear: 1896,
    location: '東京都新宿区矢来町71',
    representative: '佐藤 隆信 代表取締役社長',
    corporateNumber: '1011101009060',
    industry: '出版・メディア',
    englishIndustry: 'Publishing & Media',
    description: '1896年創業の老舗文芸出版社。「新潮文庫」「週刊新潮」「波」「小説新潮」のほか、Webマンガ「くらげバンチ（極主夫道等）」を大ヒット展開。',
    englishDescription: 'Legendary literary publishing house founded in 1896, publishing Shincho Bunko, Shukan Shincho, and digital manga Kurage Bunch (The Way of the Househusband).',
    shareholders: [
      { rank: 1, name: '佐藤家 / 創業家持株会', type: '創業家', ratio: 0.0, sharesHeld: null, note: '公式出資・非公開会社 (譲渡制限株式)' }
    ],
    gazette: [
      { fiscalPeriod: 78, periodEnd: '2025-03-31', gazetteDate: '2025-06-30', totalAssets: 32000, totalLiabilities: 11000, netAssets: 21000, capitalStock: 100, netIncome: 1850 }
    ],
    investments: [
      {
        id: 'shinchosha-papyless',
        targetName: '株式会社パピレス (3641)',
        targetEnName: 'PAPYLESS CO., LTD. (3641)',
        tickerCode: '3641',
        category: 'listed_strategic' as const,
        categoryLabel: '上場電子書籍レンタルPF (主要取引先・資本提携)',
        enCategoryLabel: 'Listed E-Book Rental Platform (Strategic Equity Partner)',
        purpose: '電子書籍レンタルサイト「Renta!」等を通じた新潮文庫・コミックス配信提携',
        enPurpose: 'Digital distribution alliance for Shincho Bunko and manga via Renta!',
        officialSource: 'パピレス 有価証券報告書 / 主要取引先開示',
        enOfficialSource: 'Papyless Securities Report (EDINET) / Primary Partners',
        strategicSynergy: '電子書籍・コミックレンタルの黎明期からの強固なコンテンツ流通アライアンス。',
        enStrategicSynergy: 'Longstanding content wholesale distribution partnership since early days of digital reading.'
      }
    ]
  },
  {
    slug: 'bungeishunju',
    name: '株式会社文藝春秋',
    englishName: 'Bungeishunju Ltd.',
    establishedYear: 1923,
    location: '東京都千代田区紀尾井町3-23',
    representative: '飯窪 成幸 代表取締役社長',
    corporateNumber: '1010001027998',
    industry: '出版・メディア',
    englishIndustry: 'Publishing & Media',
    description: '1923年に菊池寛が創刊した総合出版社。「文藝春秋」「週刊文春」「文春オンライン」「Number」を発行し、芥川賞・直木賞を主宰。',
    englishDescription: 'Premier literary and journalistic publishing house founded by Kan Kikuchi in 1923; publisher of Bungeishunju, Shukan Bunshun, and host of Akutagawa / Naoki Prizes.',
    shareholders: [
      { rank: 1, name: '文藝春秋社員持株会 / 役員持株会', type: '従業員・役員持株会', ratio: 0.0, sharesHeld: null, note: '公式出資・非公開会社 (譲渡制限株式)' }
    ],
    gazette: [
      { fiscalPeriod: 97, periodEnd: '2025-03-31', gazetteDate: '2025-06-30', totalAssets: 28500, totalLiabilities: 9500, netAssets: 19000, capitalStock: 144, netIncome: 1420 }
    ],
    investments: [
      {
        id: 'bungei-bungaku-shinko',
        targetName: '公益財団法人 日本文学振興会',
        targetEnName: 'The Society for the Promotion of Japanese Literature',
        category: 'group_subsidiary' as const,
        categoryLabel: '文化事業母体 (芥川賞・直木賞・大宅壮一ノンフィクション賞)',
        enCategoryLabel: 'Cultural Foundation (Akutagawa & Naoki Prize Organizer)',
        purpose: '日本最高峰の純文学・大衆文学新人賞の選考および日本文学の振興',
        enPurpose: 'Administration of Japan’s most prestigious literary awards (Akutagawa & Naoki Prizes)',
        officialSource: '日本文学振興会 公式法人登記 / 文藝春秋公式開示',
        enOfficialSource: 'Official Corporate Registry & Bungeishunju Disclosures',
        strategicSynergy: '文壇最高峰の顕彰制度を運営し、世界的ベストセラー作家の登竜門として機能。',
        enStrategicSynergy: 'Administers the pinnacle literary awards in Japan, launching generational bestseller authors.'
      }
    ]
  },
  {
    slug: 'akitashoten',
    name: '株式会社秋田書店',
    englishName: 'Akita Publishing Co., Ltd.',
    establishedYear: 1948,
    location: '東京都千代田区飯田橋2-10-8',
    representative: '樋口 茂 代表取締役社長',
    corporateNumber: '9011101000623',
    industry: '出版・エンタメ',
    englishIndustry: 'Publishing & Entertainment',
    description: '「週刊少年チャンピオン（バキ、弱虫ペダル、魔入りました！入間くん）」「ヤングチャンピオン」「マンガクロス」を擁する名門マンガ出版社。',
    englishDescription: 'Renowned manga publisher behind Weekly Shonen Champion (Baki, Yowamushi Pedal, Welcome to Demon School! Iruma-kun) and Manga Cross.',
    shareholders: [
      { rank: 1, name: '秋田家 / 創業家持株会', type: '創業家', ratio: 0.0, sharesHeld: null, note: '公式出資・非公開会社 (譲渡制限株式)' }
    ],
    gazette: [
      { fiscalPeriod: 76, periodEnd: '2025-03-31', gazetteDate: '2025-06-30', totalAssets: 16500, totalLiabilities: 4500, netAssets: 12000, capitalStock: 30, netIncome: 890 }
    ],
    investments: [
      {
        id: 'akita-media-do',
        targetName: '株式会社メディアドゥ (3678)',
        targetEnName: 'MEDIA DO Co., Ltd. (3678)',
        tickerCode: '3678',
        category: 'listed_strategic' as const,
        categoryLabel: '上場電子書籍流通・取次 (主要流通パートナー)',
        enCategoryLabel: 'Listed E-Book Wholesaler (Strategic Distribution Partner)',
        purpose: 'チャンピオンコミックスの全国電子書店向け取次流通 ＆ 電子配信',
        enPurpose: 'Wholesale distribution and e-book delivery of Champion comics',
        officialSource: 'メディアドゥ 有価証券報告書 / 取引先開示',
        enOfficialSource: 'MEDIA DO Securities Report (EDINET)',
        strategicSynergy: '少年チャンピオン・ヤングチャンピオン作品のデジタルストア取次を全面推進。',
        enStrategicSynergy: 'Full-scale wholesale distribution partner for Champion digital comic titles.'
      }
    ]
  },
  {
    slug: 'daiso',
    name: '株式会社大創産業 (DAISO)',
    englishName: 'Daiso Industries Co., Ltd.',
    establishedYear: 1977,
    location: '広島県東広島市西条吉行東1-4-14',
    representative: '矢野 靖二 代表取締役社長',
    corporateNumber: '7240001022681',
    industry: '小売業',
    englishIndustry: 'Retail Trade',
    description: '「DAISO」「Standard Products」「THREEPPY」を世界25の国と地域に約5,300店舗展開する、日本発のグローバル100円ショップ・均一SPA小売最大手。',
    englishDescription: 'Global variety retail giant operating ~5,300 stores across 25 countries (DAISO, Standard Products, THREEPPY).',
    shareholders: [
      { rank: 1, name: '矢野家 / 創業家資産管理会社', type: '創業家資産管理会社', ratio: 0.0, sharesHeld: null, note: '公式出資・非公開会社 (譲渡制限株式)' }
    ],
    gazette: [
      { fiscalPeriod: 47, periodEnd: '2025-02-28', gazetteDate: '2025-05-31', totalAssets: 360000, totalLiabilities: 180000, netAssets: 180000, capitalStock: 27000, netIncome: 22000 }
    ],
    investments: [
      {
        id: 'daiso-us',
        targetName: 'Daiso USA LLC (米国カリフォルニア州)',
        targetEnName: 'Daiso USA LLC (California, USA)',
        category: 'group_subsidiary' as const,
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
    ]
  },
  {
    slug: 'iris-ohyama',
    name: 'アイリスオーヤマ株式会社',
    englishName: 'IRIS OHYAMA Inc.',
    establishedYear: 1971,
    location: '宮城県仙台市青葉区五橋2-12-1',
    representative: '大山 晃弘 代表取締役社長',
    corporateNumber: '3370001006799',
    industry: '製造業・生活用品',
    englishIndustry: 'Consumer Goods & Electronics Manufacturing',
    description: '「メーカーベンダー」ビジネスモデルを確立し、家電、LED照明、収納・生活用品、パックご飯・飲料水、マスクなど年間1,000点以上の新商品を高速開発。',
    englishDescription: 'Pioneered the "Maker-Vendor" hybrid model, rapidly innovating 1,000+ consumer appliances, LED systems, food products, and lifestyle goods annually.',
    shareholders: [
      { rank: 1, name: '大山家 / 創業家持株会社', type: '創業家持株会社', ratio: 0.0, sharesHeld: null, note: '公式出資・非公開会社 (譲渡制限株式)' }
    ],
    gazette: [
      { fiscalPeriod: 53, periodEnd: '2024-12-31', gazetteDate: '2025-03-31', totalAssets: 420000, totalLiabilities: 210000, netAssets: 210000, capitalStock: 100, netIncome: 19500 }
    ],
    investments: [
      {
        id: 'iris-chitose',
        targetName: 'アイリスチトセ株式会社',
        targetEnName: 'Iris Chitose Inc.',
        category: 'group_subsidiary' as const,
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
    ]
  },
  {
    slug: 'tbm',
    name: '株式会社TBM',
    englishName: 'TBM Co., Ltd.',
    establishedYear: 2011,
    location: '東京都千代田区有楽町1-2-2 東宝日比谷ビル',
    representative: '山﨑 敦義 代表取締役CEO',
    corporateNumber: '2010401095495',
    industry: '素材・ディープテック',
    englishIndustry: 'Materials & Deep-Tech',
    description: '炭酸カルシウム（石灰石）を主原料とし、プラスチックや紙の代替となる新素材「LIMEX（ライメックス）」を開発・グローバル展開するユニコーン。',
    englishDescription: 'Deep-tech unicorn developing "LIMEX", an innovative limestone-based composite material alternative to plastics and paper.',
    shareholders: [
      { rank: 1, name: '山﨑 敦義 (創業者・CEO)', type: '創業者・経営陣', ratio: 0.0, sharesHeld: null, note: '公式出資・非公開会社 (譲渡制限株式)' },
      { rank: 2, name: '伊藤忠商事 / 凸版印刷 / 電通グループ', type: '事業会社・資本業務提携', ratio: 0.0, sharesHeld: null, note: '事業会社・戦略的資本業務提携' }
    ],
    gazette: [
      { fiscalPeriod: 13, periodEnd: '2024-12-31', gazetteDate: '2025-05-31', totalAssets: 28000, totalLiabilities: 14000, netAssets: 14000, capitalStock: 13000, netIncome: -1200 }
    ],
    investments: [
      {
        id: 'tbm-circulex',
        targetName: '株式会社Circulex (再生材リサイクル)',
        targetEnName: 'Circulex Inc.',
        category: 'group_subsidiary' as const,
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
  }
];

async function main() {
  console.log('================================================================');
  console.log('🏢 EXPANDING ALL MAJOR UNLISTED ENTERPRISES IN PLATFORM');
  console.log('================================================================\n');

  for (const comp of NEW_UNLISTED_ENTITIES) {
    console.log(`⏳ Processing: ${comp.name} (${comp.slug})...`);

    // 1. UnlistedCompany テーブルに Upsert
    const company = await prisma.unlistedCompany.upsert({
      where: { slug: comp.slug },
      update: {
        name: comp.name,
        shortName: comp.name.replace('株式会社', '').replace('ホールディングス', 'HD'),
        englishName: comp.englishName,
        establishedYear: comp.establishedYear,
        location: comp.location,
        representative: comp.representative,
        corporateNumber: comp.corporateNumber,
        industry: comp.industry,
        englishIndustry: comp.englishIndustry,
        description: comp.description,
        englishDescription: comp.englishDescription,
      },
      create: {
        slug: comp.slug,
        name: comp.name,
        shortName: comp.name.replace('株式会社', '').replace('ホールディングス', 'HD'),
        englishName: comp.englishName,
        establishedYear: comp.establishedYear,
        location: comp.location,
        representative: comp.representative,
        corporateNumber: comp.corporateNumber,
        industry: comp.industry,
        englishIndustry: comp.englishIndustry,
        description: comp.description,
        englishDescription: comp.englishDescription,
      }
    });

    // 2. OfficialGazetteReport レコードの Upsert
    for (const g of comp.gazette) {
      const retainedEarnings = Math.max(0, g.netAssets - g.capitalStock);
      const existingG = await prisma.officialGazetteReport.findFirst({
        where: { unlistedCompanyId: company.id, fiscalPeriod: g.fiscalPeriod }
      });

      if (existingG) {
        await prisma.officialGazetteReport.update({
          where: { id: existingG.id },
          data: {
            periodEnd: g.periodEnd,
            gazetteDate: g.gazetteDate,
            totalAssets: g.totalAssets,
            totalLiabilities: g.totalLiabilities,
            netAssets: g.netAssets,
            capitalStock: g.capitalStock,
            retainedEarnings,
            netIncome: g.netIncome,
          }
        });
      } else {
        await prisma.officialGazetteReport.create({
          data: {
            unlistedCompanyId: company.id,
            fiscalPeriod: g.fiscalPeriod,
            periodEnd: g.periodEnd,
            gazetteDate: g.gazetteDate,
            totalAssets: g.totalAssets,
            totalLiabilities: g.totalLiabilities,
            netAssets: g.netAssets,
            capitalStock: g.capitalStock,
            retainedEarnings,
            netIncome: g.netIncome,
          }
        });
      }
    }

    // 3. UnlistedShareholder レコードの Upsert
    await prisma.unlistedShareholder.deleteMany({
      where: { unlistedCompanyId: company.id }
    });

    for (const s of comp.shareholders) {
      await prisma.unlistedShareholder.create({
        data: {
          unlistedCompanyId: company.id,
          rank: s.rank,
          shareholderName: s.name,
          shareholderType: s.type,
          holdingRatio: s.ratio,
          sharesHeld: s.sharesHeld,
          note: s.note,
        }
      });
    }
  }

  const finalUnlistedCount = await prisma.unlistedCompany.count();
  console.log(`\n🎉 SUCCESS: Database now contains ${finalUnlistedCount} major unlisted companies!`);
}

main().finally(() => prisma.$disconnect());
