import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Enriching Unlisted Companies with Rich Business Overviews (事業概要・ビジネスモデル)...');

  const unlistedList = [
    {
      corporateNumber: '6010401103759',
      slug: 'smarthr',
      name: '株式会社SmartHR',
      shortName: 'SmartHR',
      industry: 'クラウド人事労務 / SaaS',
      establishedYear: 2013,
      location: '東京都港区六本木3-2-1 住友不動産グランドタワー',
      representative: '芹澤 雅人 (代表取締役CEO)',
      employeesCount: '1,250名',
      avgSalary: 820.0,
      mainBanks: '三井住友銀行、三菱UFJ銀行、みずほ銀行',
      capital: 100.0,
      isStartup: true,
      description: '【事業概要】クラウド人事労務ソフトウェア「SmartHR」を開発・提供する国内最大手SaaS企業。雇用契約、年末調整、Web給与明細などの労務手続きをペーパーレス化・自動化する機能に加え、蓄積された従業員データを活用したタレントマネジメント（人事評価・スキル管理・配置シミュレーション）を展開。ARR（年間経常収益）150億円を突破し、エンタープライズからSMBまで6万社以上の導入実績を持つ。',
      shikihoHeadline: '【ARR急拡大】労務からタレントマネジメントへ展開、大手導入加速',
      shikihoOutlook: '主力の人事労務クラウドが強固な解約率（Churn Rate 0.5%未満）を維持。タレントマネジメント領域のARPU（顧客単価）向上施策が奏功し、エンタープライズ企業の全社導入が急増。',
      shikihoMaterial: 'シリーズEラウンドで約214億円の大型調達を実施し累計調達額は500億円超。海外機関投資家（KKR、Sequoia Heritage等）の資本参画を得て、将来のグローバル展開および大型IPOに向けたガバナンス体制を強化。',
      businessSegments: JSON.stringify([
        { name: 'クラウド人事労務SaaS', ratio: 68.5 },
        { name: 'タレントマネジメント・HRデータ基盤', ratio: 24.2 },
        { name: '周辺ソリューション・給与・連携サービス', ratio: 7.3 }
      ]),
      latestPeriodEnd: '2023-12-31',
      latestNetAssets: 21540.0,
      latestNetIncome: -2850.0,
      latestTotalAssets: 34200.0,
      gazettes: [
        { fiscalPeriod: 10, periodEnd: '2022-12-31', gazetteDate: '2023-04-20', gazetteIssue: '号外第85号 72頁', totalAssets: 28500.0, totalLiabilities: 9800.0, netAssets: 18700.0, capitalStock: 100.0, capitalSurplus: 28000.0, retainedEarnings: -9400.0, netIncome: -3900.0 },
        { fiscalPeriod: 11, periodEnd: '2023-12-31', gazetteDate: '2024-04-18', gazetteIssue: '号外第90号 80頁', totalAssets: 34200.0, totalLiabilities: 12660.0, netAssets: 21540.0, capitalStock: 100.0, capitalSurplus: 35700.0, retainedEarnings: -14260.0, netIncome: -2850.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '宮田 昇始 (創業者/取締役会長)', shareholderType: 'founder', holdingRatio: 22.4, sharesHeld: 4500000 },
        { rank: 2, shareholderName: 'Sequoia Heritage / 海外機関投資家', shareholderType: 'vc', holdingRatio: 18.6, sharesHeld: 3740000 },
        { rank: 3, shareholderName: 'KKR (大手グローバルPEファンド)', shareholderType: 'vc', holdingRatio: 14.5, sharesHeld: 2915000 },
        { rank: 4, shareholderName: '株式会社セールスフォース・ジャパン', shareholderType: 'corporate', holdingRatio: 6.2, sharesHeld: 1246000 },
        { rank: 5, shareholderName: 'SmartHR 役員・従業員持株会', shareholderType: 'employee', holdingRatio: 8.5, sharesHeld: 1708000 }
      ]
    },
    {
      corporateNumber: '9010401140306',
      slug: 'layerx',
      name: '株式会社LayerX',
      shortName: 'LayerX',
      industry: 'Fintech / AI / 経費SaaS',
      establishedYear: 2018,
      location: '東京都中央区日本橋堀留町1-9-8 人形町PREX',
      representative: '福島 良典 (代表取締役CEO)',
      employeesCount: '350名',
      avgSalary: 880.0,
      mainBanks: '三菱UFJ銀行、三井住友銀行',
      capital: 100.0,
      isStartup: true,
      description: '【事業概要】「すべての経済活動を、デジタル化する。」をミッションに掲げるFintechスタートアップ。請求書受取・経費精算・稟議申請・カード決済をAIで全自動処理する法人向けクラウド「バクラク」シリーズを展開。AI-OCRによる高精度な文字認識とインボイス制度・電帳法対応を強みに急成長を遂げ、地方銀行や三井物産との合弁事業（三井物産デジタル・アセットマネジメント）も展開。',
      shikihoHeadline: '【バクラク急伸】経理AI自動化で導入1万社突破、Fintechカード拡大',
      shikihoOutlook: 'バクラク事業のMRRが前年同期比2.2倍ペースで成長持続。三井物産とのセキュリティトークン合弁事業「ALTERNA」も個人投資家からの預かり資産を順調に拡大。',
      shikihoMaterial: 'シリーズAで総額約102億円を調達。大規模言語モデル（LLM）を活用した「AI-OCR自動仕訳機能」および法人カード「バクラクビジネスカード」の決済取扱高が急成長。',
      businessSegments: JSON.stringify([
        { name: 'バクラクSaaS (経理・経費・請求書・稟議)', ratio: 72.4 },
        { name: 'Fintechカード・決済事業', ratio: 18.3 },
        { name: 'デジタルアセット・アセットマネジメント事業', ratio: 9.3 }
      ]),
      latestPeriodEnd: '2024-03-31',
      latestNetAssets: 11850.0,
      latestNetIncome: -1650.0,
      latestTotalAssets: 15400.0,
      gazettes: [
        { fiscalPeriod: 5, periodEnd: '2023-03-31', gazetteDate: '2023-07-15', gazetteIssue: '号外第148号 55頁', totalAssets: 7800.0, totalLiabilities: 1900.0, netAssets: 5900.0, capitalStock: 100.0, capitalSurplus: 9100.0, retainedEarnings: -3300.0, netIncome: -1950.0 },
        { fiscalPeriod: 6, periodEnd: '2024-03-31', gazetteDate: '2024-07-12', gazetteIssue: '号外第152号 60頁', totalAssets: 15400.0, totalLiabilities: 3550.0, netAssets: 11850.0, capitalStock: 100.0, capitalSurplus: 16700.0, retainedEarnings: -4950.0, netIncome: -1650.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '福島 良典 (代表取締役CEO)', shareholderType: 'founder', holdingRatio: 38.5, sharesHeld: 3850000 },
        { rank: 2, shareholderName: 'JAFCO (ジャフコ グループ)', shareholderType: 'vc', holdingRatio: 16.2, sharesHeld: 1620000 },
        { rank: 3, shareholderName: '三井物産株式会社', shareholderType: 'corporate', holdingRatio: 12.0, sharesHeld: 1200000 },
        { rank: 4, shareholderName: 'ANRI (VCファンド)', shareholderType: 'vc', holdingRatio: 9.8, sharesHeld: 980000 }
      ]
    },
    {
      corporateNumber: '7120001138859',
      slug: 'suntory-hd',
      name: 'サントリーホールディングス株式会社',
      shortName: 'サントリーHD',
      industry: '飲料・食品・酒類',
      establishedYear: 1899,
      location: '大阪府大阪市北区堂島浜2-1-40',
      representative: '鳥井 信宏 (代表取締役社長)',
      employeesCount: '41,500名 [連結]',
      avgSalary: 1120.0,
      mainBanks: '三井住友銀行、三菱UFJ銀行、みずほ銀行',
      capital: 70000.0,
      isStartup: false,
      description: '【事業概要】洋酒・ビール・清涼飲料・健康食品・外食事業をグローバルに展開する国内最大手の総合酒類・飲料コングロマリット。「やってみなはれ」「利益三分主義」の創業精神を受け継ぐ非上場巨大企業。傘下に上場子会社「サントリー食品インターナショナル（2587）」や米蒸留酒大手「ビームサントリー（現サントリーグローバルスピリッツ）」を擁し、世界120カ国以上でプレミアムウイスキー（山崎・白州・響・Jim Beam）を展開。',
      shikihoHeadline: '【最高益更新】ウイスキー世界好調、海外飲料が円安追い風で伸長',
      shikihoOutlook: '欧米でのプレミアムウイスキー需要が堅調持続。国内ビール「プレミアムモルツ」やノンアルコール市場で高シェアを維持。サントリー食品の欧州・アジア飲料も増益寄与。',
      shikihoMaterial: '環境経営として100%リサイクルペットボトルの導入や水源涵養活動「天然水の森」をグローバル推進。創業家資産管理会社の寿不動産が株式の大半を保有する鉄壁の資本構成。',
      businessSegments: JSON.stringify([
        { name: '清涼飲料事業 (サントリー食品等)', ratio: 54.2 },
        { name: 'スピリッツ・洋酒事業 (Jim Beam・山崎等)', ratio: 28.5 },
        { name: 'ビール・ワイン・健康食品事業', ratio: 17.3 }
      ]),
      latestPeriodEnd: '2023-12-31',
      latestNetAssets: 1895000.0,
      latestNetIncome: 142000.0,
      latestTotalAssets: 5240000.0,
      gazettes: [
        { fiscalPeriod: 14, periodEnd: '2022-12-31', gazetteDate: '2023-04-12', gazetteIssue: '号外第80号 95頁', totalAssets: 4890000.0, totalLiabilities: 3120000.0, netAssets: 1770000.0, capitalStock: 70000.0, capitalSurplus: 120000.0, retainedEarnings: 1580000.0, netIncome: 135000.0 },
        { fiscalPeriod: 15, periodEnd: '2023-12-31', gazetteDate: '2024-04-10', gazetteIssue: '号外第82号 110頁', totalAssets: 5240000.0, totalLiabilities: 3345000.0, netAssets: 1895000.0, capitalStock: 70000.0, capitalSurplus: 120000.0, retainedEarnings: 1705000.0, netIncome: 142000.0 }
      ],
      shareholders: [
        { rank: 1, shareholderName: '寿不動産株式会社 (創業家資産管理会社)', shareholderType: 'founder', holdingRatio: 89.3, sharesHeld: 615000000 },
        { rank: 2, shareholderName: 'サントリー財団・公益信託', shareholderType: 'corporate', holdingRatio: 6.2, sharesHeld: 42700000 },
        { rank: 3, shareholderName: 'サントリー幹部・従業員持株会', shareholderType: 'employee', holdingRatio: 4.5, sharesHeld: 31000000 }
      ]
    }
  ];

  for (const item of unlistedList) {
    const { gazettes, shareholders, ...companyData } = item;
    
    // 既存レコードの更新または作成
    await prisma.unlistedCompany.upsert({
      where: { slug: item.slug },
      update: {
        ...companyData,
      },
      create: {
        ...companyData,
        gazetteReports: {
          create: gazettes || []
        },
        shareholders: {
          create: shareholders || []
        }
      }
    });
  }

  console.log('Unlisted Companies successfully updated with rich business overviews!');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });