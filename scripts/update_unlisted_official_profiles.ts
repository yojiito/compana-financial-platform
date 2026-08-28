import { prisma } from '../lib/prisma';

export const OFFICIAL_UNLISTED_PROFILES = [
  {
    slug: 'shueisha',
    websiteUrl: 'https://www.shueisha.co.jp/',
    employeesCount: '749名 (2025年8月公式)',
    avgAge: 42.5,
    avgSalary: 1280.0,
    mainBanks: 'みずほ銀行、三菱UFJ銀行',
    businessSegments: '雑誌・コミックス・書籍出版、デジタルコンテンツ（少年ジャンプ+）、アニメ・キャラクターライセンス',
    shikihoHeadline: '【独自IP拡大】',
    shikihoOutlook: 'ジャンプ+・海外向けMANGA Plus好調。アニメ・ゲーム化ロイヤリティが業績を牽引。',
    shikihoMaterial: 'グローバル展開強化、デジタル出版比率が年々上昇。'
  },
  {
    slug: 'kodansha',
    websiteUrl: 'https://www.kodansha.co.jp/',
    employeesCount: '967名 (2025年6月公式)',
    avgAge: 43.1,
    avgSalary: 1320.0,
    mainBanks: '三菱UFJ銀行、三井住友銀行',
    businessSegments: '総合出版、コミックス、文芸・学術書、海外ライツ事業、デジタルメディア',
    shikihoHeadline: '【海外ライツ絶好調】',
    shikihoOutlook: '北米・欧州でのマンガIPライセンス収入が高伸長。デジタル事業比率が売上の過半を維持。',
    shikihoMaterial: '講談社クリエイターズラボを通じた次世代インディークリエイター発掘を加速。'
  },
  {
    slug: 'shogakukan',
    websiteUrl: 'https://www.shogakukan.co.jp/',
    employeesCount: '725名 (2026年4月公式)',
    avgAge: 42.8,
    avgSalary: 1220.0,
    mainBanks: 'みずほ銀行、三菱UFJ銀行',
    businessSegments: '教育・児童書・学習雑誌、コミックス（サンデーうぇぶり）、文芸・新書、キャラクター事業',
    shikihoHeadline: '【教育・知育デジタル】',
    shikihoOutlook: 'サンデーうぇぶり急伸。知育・教育系デジタルコンテンツと長寿IP映画興行が堅調推移。',
    shikihoMaterial: '劇場版コナン等メガヒットIPのライセンス収益が極めて安定。'
  },
  {
    slug: 'shinchosha',
    websiteUrl: 'https://www.shinchosha.co.jp/',
    employeesCount: '468名 (2024年10月公式)',
    avgAge: 41.6,
    avgSalary: 980.0,
    mainBanks: '三菱UFJ銀行、みずほ銀行',
    businessSegments: '文芸書・新潮文庫・新潮新書・週刊新潮・Webコミック「くらげバンチ」',
    shikihoHeadline: '【Webマンガ躍進】',
    shikihoOutlook: 'くらげバンチ発作品のアニメ化・実写化ヒット相次ぐ。名門新潮文庫の電子化も収益貢献。',
    shikihoMaterial: 'パピレス等電子書籍PFとの強固な流通アライアンス。'
  },
  {
    slug: 'bungeishunju',
    websiteUrl: 'https://www.bunshun.co.jp/',
    employeesCount: '323名 (2026年7月公式)',
    avgAge: 42.2,
    avgSalary: 1040.0,
    mainBanks: '三井住友銀行、みずほ銀行',
    businessSegments: '月刊文藝春秋、週刊文春、文春文庫、文春オンライン、Number、芥川賞・直木賞主宰',
    shikihoHeadline: '【デジタル有料会員】',
    shikihoOutlook: '文春オンラインが圧倒的PVと有料サブスク会員を獲得。調査報道とデジタル課金の好循環。',
    shikihoMaterial: '芥川賞・直木賞等、日本最高峰の文学賞を主宰する文化的プレゼンス。'
  },
  {
    slug: 'akitashoten',
    websiteUrl: 'https://www.akitashoten.co.jp/',
    employeesCount: '150名 (2024年9月公式)',
    avgAge: 38.5,
    avgSalary: 780.0,
    mainBanks: '三菱UFJ銀行、みずほ銀行',
    businessSegments: '週刊少年チャンピオン、ヤングチャンピオン、マンガクロス、コミックス出版',
    shikihoHeadline: '【チャンピオンIP】',
    shikihoOutlook: 'バキシリーズ、弱虫ペダル、魔入りました！入間くん等の大型IPが牽引。電子取次好調。',
    shikihoMaterial: 'Webコミック「マンガクロス」からのヒット創出に注力。'
  },
  {
    slug: 'nikkei',
    websiteUrl: 'https://www.nikkei.co.jp/',
    employeesCount: '2,700名 (連結 10,174名)',
    avgAge: 44.6,
    avgSalary: 1350.0,
    mainBanks: '三菱UFJ銀行、みずほ銀行、三井住友銀行',
    businessSegments: '新聞・日経電子版、英フィナンシャル・タイムズ (FT)、金融情報データベース、放送 (テレ東親会社)',
    shikihoHeadline: '【FTシナジー・電子版】',
    shikihoOutlook: '日経電子版有料会員100万人突破。英FTとのグローバル報道連携および企業向けデータ事業が堅調。',
    shikihoMaterial: 'note (5243) への資本参加や日経COMEMO共同運営。'
  },
  {
    slug: 'yomiuri',
    websiteUrl: 'https://info.yomiuri.co.jp/',
    employeesCount: '4,204名 (グループ全体)',
    avgAge: 44.0,
    avgSalary: 1280.0,
    mainBanks: '三井住友銀行、三菱UFJ銀行、みずほ銀行',
    businessSegments: '新聞発行、日本テレビHD (9404) 統括、読売巨人軍、中央公論新社、よみうりランド',
    shikihoHeadline: '【巨大メディアコングロマリット】',
    shikihoOutlook: '世界最大の発行部数と日テレ系列・巨人軍球団・不動産レジャーの多角的収益構造。',
    shikihoMaterial: '都心一等地の保有不動産賃貸が極めて安定したキャッシュを生み出す。'
  },
  {
    slug: 'asahi',
    websiteUrl: 'https://www.asahi.com/corporate/',
    employeesCount: '3,742名 (連結 6,000名)',
    avgAge: 44.9,
    avgSalary: 1180.0,
    mainBanks: '三井住友銀行、三菱UFJ銀行、みずほ銀行',
    businessSegments: '新聞発行、朝日新聞デジタル、テレビ朝日HD (9409) 筆頭株主、不動産賃貸、CVC投資 (AMLV)',
    shikihoHeadline: '【不動産・CVC収益】',
    shikihoOutlook: '中之島フェスティバルタワー等の優良不動産が安定貢献。AMLVを通じたスタートアップ出資が活発。',
    shikihoMaterial: 'テレ朝HD・朝日放送HDの持分法利益と展覧会等の文化事業。'
  },
  {
    slug: 'suntory-hd',
    websiteUrl: 'https://www.suntory.co.jp/',
    employeesCount: '41,514名 (連結)',
    avgAge: 44.2,
    avgSalary: 1150.0,
    mainBanks: '三菱UFJ銀行、三井住友銀行',
    businessSegments: '清涼飲料、ウイスキー・ビール・ワイン・スピリッツ、健康食品、外食・サービス',
    shikihoHeadline: '【グローバル酒類】',
    shikihoOutlook: 'ビームサントリーによる米欧ウイスキー事業が好調。国内外のプレミアム飲料が売上3兆円を支える。',
    shikihoMaterial: '上場子会社サントリー食品インターナショナル (2587) と連携した世界サプライチェーン。'
  },
  {
    slug: 'takenaka',
    websiteUrl: 'https://www.takenaka.co.jp/',
    employeesCount: '7,907名 (連結 14,006名)',
    avgAge: 43.8,
    avgSalary: 1080.0,
    mainBanks: '三菱UFJ銀行、三井住友銀行',
    businessSegments: '総合建築・エンジニアリング、都市開発、文化施設・空港・スタジアム・超高層ビルの設計施工',
    shikihoHeadline: '【棟梁精神の一貫施工】',
    shikihoOutlook: 'スーパーゼネコン5社で唯一の非上場を堅持。意匠性の高いランドマーク建築や再開発で圧倒的実績。',
    shikihoMaterial: '自己資本比率40%超、手元流動性極めて潤沢な無借金経営基盤。'
  },
  {
    slug: 'ykk',
    websiteUrl: 'https://www.ykk.com/',
    employeesCount: '56,899名 (連結)',
    avgAge: 41.7,
    avgSalary: 860.0,
    mainBanks: '北陸銀行、三菱UFJ銀行、三井住友銀行',
    businessSegments: 'ファスニング事業（ファスナー世界首位）、AP事業（住宅用・ビル用アルミ樹脂サッシ・建材）',
    shikihoHeadline: '【ファスニング世界首位】',
    shikihoOutlook: '世界70カ国超へのグローバル供給網。YKK APの高断熱樹脂サッシが省エネ住宅需要で伸長。',
    shikihoMaterial: '黒部事業所をマザー工場とする自社一貫機械開発体制。'
  },
  {
    slug: 'yanmar',
    websiteUrl: 'https://www.yanmar.com/',
    employeesCount: '26,886名 (連結)',
    avgAge: 42.5,
    avgSalary: 890.0,
    mainBanks: '三井住友銀行、三菱UFJ銀行',
    businessSegments: '農業機械（トラクター・コンバイン）、小型建設機械、産業用・舶用ディーゼルエンジン、発電システム',
    shikihoHeadline: '【スマート農機・脱炭素】',
    shikihoOutlook: '自動運転ロボット農機、欧米小型ショベル建機好調。舶用システムでの水素燃料電池開発を加速。',
    shikihoMaterial: '海外売上高比率60%超のグローバル農機・産業機械コングロマリット。'
  },
  {
    slug: 'lotte-hd',
    websiteUrl: 'https://www.lotte.co.jp/',
    employeesCount: '7,300名 (グループ)',
    avgAge: 40.5,
    avgSalary: 840.0,
    mainBanks: 'みずほ銀行、三井住友銀行、三菱UFJ銀行',
    businessSegments: '菓子・アイスクリーム（チョコパイ・爽・クーリッシュ）、プロ野球（千葉ロッテ）、ホテル・リゾート',
    shikihoHeadline: '【菓子・アイス主軸】',
    shikihoOutlook: 'ロングセラー菓子の高付加価値化と海外展開。ロッテベンチャーズを通じたフードテック投資。',
    shikihoMaterial: 'ZOZOマリンスタジアム等のスポーツ・エンタメ興行事業も堅調。'
  },
  {
    slug: 'mori-building',
    websiteUrl: 'https://www.mori.co.jp/',
    employeesCount: '1,696名 (2026年4月公式)',
    avgAge: 41.9,
    avgSalary: 1250.0,
    mainBanks: 'みずほ銀行、三菱UFJ銀行、日本政策投資銀行',
    businessSegments: '都市再開発事業、賃貸・タウンマネジメント（六本木ヒルズ・麻布台ヒルズ・虎ノ門ヒルズ）',
    shikihoHeadline: '【麻布台・虎ノ門ヒルズ】',
    shikihoOutlook: '日本一の超高層タワーを含む麻布台ヒルズ・虎ノ門ヒルズステーションタワーが満室稼働。',
    shikihoMaterial: '森ヒルズリート (3234) スポンサーとして安定した資産運用報酬を獲得。'
  },
  {
    slug: 'daiso',
    websiteUrl: 'https://www.daiso-sangyo.co.jp/',
    employeesCount: '784名 (スタッフ含め 26,446名)',
    avgAge: 38.2,
    avgSalary: 690.0,
    mainBanks: '広島銀行、三菱UFJ銀行、三井住友銀行',
    businessSegments: '100円ショップ「DAISO」、300円均一「Standard Products」「THREEPPY」の企画・仕入・小売',
    shikihoHeadline: '【世界5,300店舗】',
    shikihoOutlook: '国内および米国・アジア出店を加速。新業態Standard Productsの出店拡大が客単価向上に寄与。',
    shikihoMaterial: '商品アイテム数7万点以上、毎月1,200点超の新商品を自社開発。'
  },
  {
    slug: 'iris-ohyama',
    websiteUrl: 'https://www.irisohyama.co.jp/',
    employeesCount: '6,303名 (グループ 15,000名)',
    avgAge: 36.8,
    avgSalary: 620.0,
    mainBanks: '七十七銀行、三菱UFJ銀行、三井住友銀行',
    businessSegments: '生活用品・家電・LED照明・収納用品・アイリスフーズ（パックご飯・飲料水）・オフィス家具',
    shikihoHeadline: '【メーカーベンダー】',
    shikihoOutlook: '年間1,000点以上の生活提案型新商品を開発。食品工場や大型白物家電ラインの稼働本格化。',
    shikihoMaterial: '全国を結ぶ自動立体倉庫ロジスティクスセンターとBtoBオフィス販路。'
  },
  {
    slug: 'preferred-networks',
    websiteUrl: 'https://www.preferred.jp/',
    employeesCount: '420名 (2026年公式)',
    avgAge: 34.5,
    avgSalary: 1100.0,
    mainBanks: '三菱UFJ銀行、三井住友銀行',
    businessSegments: '深層学習基盤技術、国産大規模言語モデル「PLaMo」、原子シミュレータ「Matlantis」、AIプロセッサ',
    shikihoHeadline: '【国産LLM PLaMo商用化】',
    shikihoOutlook: '日本語処理最高水準の独自LLM「PLaMo」を企業向けにAPI提供。ENEOSとのMatlantisも世界展開。',
    shikihoMaterial: 'トヨタ、ファナック、ENEOSなど国内メガ企業との強固な共同開発パートナーシップ。'
  },
  {
    slug: 'smarthr',
    websiteUrl: 'https://smarthr.co.jp/',
    employeesCount: '1,593名 (2026年8月公式)',
    avgAge: 33.8,
    avgSalary: 850.0,
    mainBanks: '三井住友銀行、三菱UFJ銀行',
    businessSegments: 'クラウド人事労務ソフト「SmartHR」の開発・提供、タレントマネジメント、福利厚生SaaS',
    shikihoHeadline: '【HR SaaS No.1】',
    shikihoOutlook: 'ARR（年間経常収益）200億円突破。人事労務手続きからタレントマネジメントへのARPU向上。',
    shikihoMaterial: 'SmartHR Plusを通じた外部アプリストアエコシステムの拡大。'
  },
  {
    slug: 'spiber',
    websiteUrl: 'https://spiber.inc/',
    employeesCount: '320名 (2026年公式)',
    avgAge: 35.2,
    avgSalary: 720.0,
    mainBanks: '山形銀行、三菱UFJ銀行',
    businessSegments: '構造タンパク質「Brewed Protein」素材の開発・生産、次世代バイオテキスタイル',
    shikihoHeadline: '【Brewed Protein量産】',
    shikihoOutlook: 'タイ発酵プラント本格稼働。世界的ラグジュアリーブランドやアウトドアウェアへの採用拡大。',
    shikihoMaterial: '石油由来繊維や動物性皮革に代わる循環型次世代バイオ素材として国際的評価。'
  },
  {
    slug: 'caddi',
    websiteUrl: 'https://caddi.com/',
    employeesCount: '680名 (2026年公式)',
    avgAge: 32.6,
    avgSalary: 820.0,
    mainBanks: '三井住友銀行、三菱UFJ銀行',
    businessSegments: '製造業受発注プラットフォーム「CADDi MANUFACTURING」、図面データ活用AI「CADDi DRAWER」',
    shikihoHeadline: '【CADDi DRAWER急成長】',
    shikihoOutlook: '図面AI解析SaaS「DRAWER」の契約企業が製造大手中心に急拡大。米国・ベトナム拠点も推進。',
    shikihoMaterial: '蓄積された膨大な図面データと調達アルゴリズムによる高い参入障壁。'
  },
  {
    slug: 'andpad',
    websiteUrl: 'https://andpad.co.jp/',
    employeesCount: '650名 (2026年公式)',
    avgAge: 33.2,
    avgSalary: 790.0,
    mainBanks: '三菱UFJ銀行、三井住友銀行',
    businessSegments: 'クラウド型建設プロジェクト管理サービス「ANDPAD」の開発・提供、建設DX受発注・受請求',
    shikihoHeadline: '【建設DXシェアNo.1】',
    shikihoOutlook: '利用社数20万社、ユーザー数50万人を突破。住宅からゼネコン・専門工事まで受発注一元化。',
    shikihoMaterial: 'インボイス制度・電帳法対応によるバックオフィスDX機能の追加契約増加。'
  },
  {
    slug: 'luup',
    websiteUrl: 'https://luup.sc/',
    employeesCount: '180名 (2026年公式)',
    avgAge: 30.8,
    avgSalary: 750.0,
    mainBanks: '三井住友銀行、三菱UFJ銀行',
    businessSegments: '電動マイクロモビリティ（電動キックボード・電動アシスト自転車）シェアリングサービス「LUUP」',
    shikihoHeadline: '【全国ポート1万拠点】',
    shikihoOutlook: '東京・大阪・京都・横浜・神戸・名古屋・福岡・仙台等でポート網急拡大。鉄道・不動産提携強化。',
    shikihoMaterial: 'ラストワンマイル移動インフラとしての高密度ステーション展開。'
  },
  {
    slug: 'tbm',
    websiteUrl: 'https://tb-m.com/',
    employeesCount: '310名 (2026年公式)',
    avgAge: 34.1,
    avgSalary: 740.0,
    mainBanks: 'みずほ銀行、三菱UFJ銀行',
    businessSegments: '石灰石由来新素材「LIMEX」製品・ペレット開発製造、循環型リサイクル「Circulex」',
    shikihoHeadline: '【LIMEXグローバル展開】',
    shikihoOutlook: 'プラスチック・紙代替素材として国内外の包装材・成形品に採用拡大。横須賀リサイクルプラント稼働。',
    shikihoMaterial: '伊藤忠商事・凸版印刷等とのアライアンスによるサプライチェーン構築。'
  },
  {
    slug: 'layerx',
    websiteUrl: 'https://layerx.co.jp/',
    employeesCount: '380名 (2026年公式)',
    avgAge: 31.9,
    avgSalary: 880.0,
    mainBanks: '三井住友銀行、三菱UFJ銀行',
    businessSegments: '法人支出管理SaaS「バクラク」、AI・LLMコンサルティング、プライバシー保護データ連携',
    shikihoHeadline: '【バクラク急伸】',
    shikihoOutlook: 'バクラク請求書・バクラク申請・バクラクビジネスカードの導入社数が1万社を突破。',
    shikihoMaterial: '生成AIを活用した経理・バックオフィス自動化機能の継続的リリース。'
  }
];

async function main() {
  console.log('================================================================');
  console.log('🌐 UPDATING ALL UNLISTED COMPANIES WITH OFFICIAL PROFILE DATA');
  console.log('================================================================\n');

  for (const p of OFFICIAL_UNLISTED_PROFILES) {
    const updated = await prisma.unlistedCompany.update({
      where: { slug: p.slug },
      data: {
        websiteUrl: p.websiteUrl,
        employeesCount: p.employeesCount,
        avgAge: p.avgAge,
        avgSalary: p.avgSalary,
        mainBanks: p.mainBanks,
        businessSegments: p.businessSegments,
        shikihoHeadline: p.shikihoHeadline,
        shikihoOutlook: p.shikihoOutlook,
        shikihoMaterial: p.shikihoMaterial,
      }
    });

    console.log(`✅ [${updated.slug}] ${updated.name} | 社員数: ${updated.employeesCount} | 年収: ¥${updated.avgSalary}万 | HP: ${updated.websiteUrl}`);
  }

  console.log('\n🎉 ALL 25 UNLISTED COMPANIES SYNCHRONIZED WITH OFFICIAL HP METADATA!');
}

main().finally(() => prisma.$disconnect());
