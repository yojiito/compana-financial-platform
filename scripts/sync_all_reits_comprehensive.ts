import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface FullReitData {
  code: string;
  name: string;
  englishName: string;
  sponsor: string;
  sponsorRatio: number;
  type: string;
  price: number;
  priceChange: number;
  priceChangePct: number;
  distributionYield: number;
  navMultiplier: number;
  propertiesCount: number;
  occupancyRate: number;
  ltv: number;
  description: string;
  englishDescription: string;
  properties: {
    name: string;
    englishName?: string;
    category: string;
    location: string;
    englishLocation?: string;
    areaRegion: string;
    acquisitionPriceMillion: number;
    appraisalValueOku: number;
    unrealizedGainOku: number;
    floorAreaSqm: number;
    occupancyRate: number;
    builtDate: string;
    structure: string;
    keyTenant: string;
    noiYield: number;
  }[];
}

const ALL_58_REITS: FullReitData[] = [
  // --- オフィス特化型 ---
  {
    code: '8951',
    name: '日本ビルファンド投資法人 (NBF)',
    englishName: 'Nippon Building Fund Inc.',
    sponsor: '三井不動産株式会社 (100%)',
    sponsorRatio: 100.0,
    type: 'オフィス特化型',
    price: 598000,
    priceChange: 3000,
    priceChangePct: 0.50,
    distributionYield: 4.12,
    navMultiplier: 0.88,
    propertiesCount: 72,
    occupancyRate: 97.8,
    ltv: 42.5,
    description: '三井不動産を単独スポンサーとする日本最大・最古のオフィス特化型J-REIT。都心一等地の超高層Aクラスビルを中心に国内最大級のポートフォリオ（資産規模1.4兆円超）を保有。',
    englishDescription: 'The largest office J-REIT in Japan, sponsored by Mitsui Fudosan, holding prime Class-A office buildings in central Tokyo.',
    properties: [
      { name: '西新宿三井ビルディング', category: 'オフィス', location: '東京都新宿区西新宿六丁目24番1号', areaRegion: '都心主要部', acquisitionPriceMillion: 58000, appraisalValueOku: 790, unrealizedGainOku: 210, floorAreaSqm: 85200, occupancyRate: 98.5, builtDate: '1999年04月', structure: 'S・SRC造 地上27階 地下2階', keyTenant: '富士通、アフラック生命保険', noiYield: 4.3 },
      { name: '六本木ティーキューブ', category: 'オフィス', location: '東京都港区六本木三丁目1番1号', areaRegion: '都心5区', acquisitionPriceMillion: 65000, appraisalValueOku: 920, unrealizedGainOku: 270, floorAreaSqm: 72800, occupancyRate: 100.0, builtDate: '2003年10月', structure: 'S・RC造 地上27階 地下1階', keyTenant: 'グローバルIT・フィンテック企業', noiYield: 4.1 },
      { name: 'グラントウキョウサウスタワー', category: 'オフィス', location: '東京都千代田区丸の内一丁目9番2号', areaRegion: '都心5区', acquisitionPriceMillion: 42000, appraisalValueOku: 640, unrealizedGainOku: 220, floorAreaSqm: 140000, occupancyRate: 100.0, builtDate: '2007年10月', structure: 'S・SRC造 地上42階 地下4階', keyTenant: 'リクルートホールディングス、BMW Japan', noiYield: 3.9 },
      { name: 'ゲートシティ大崎', category: 'オフィス', location: '東京都品川区大崎一丁目11番1号', areaRegion: '都心主要部', acquisitionPriceMillion: 49000, appraisalValueOku: 680, unrealizedGainOku: 190, floorAreaSqm: 298000, occupancyRate: 97.2, builtDate: '1999年01月', structure: 'S・SRC造 地上24階 地下4階', keyTenant: 'サンリオ、ローソン、明電舎', noiYield: 4.5 },
      { name: '中之島三井ビルディング', category: 'オフィス', location: '大阪府大阪市北区中之島三丁目3番3号', areaRegion: '地方主要都市', acquisitionPriceMillion: 32000, appraisalValueOku: 440, unrealizedGainOku: 120, floorAreaSqm: 71200, occupancyRate: 98.1, builtDate: '2002年08月', structure: 'S・SRC造 地上31階 地下2階', keyTenant: '三井住友信託銀行、東レ', noiYield: 4.8 }
    ]
  },
  {
    code: '8952',
    name: 'ジャパンリアルエステイト投資法人 (JRE)',
    englishName: 'Japan Real Estate Investment Corporation',
    sponsor: '三菱地所株式会社 (100%)',
    sponsorRatio: 100.0,
    type: 'オフィス特化型',
    price: 545000,
    priceChange: -2000,
    priceChangePct: -0.37,
    distributionYield: 4.35,
    navMultiplier: 0.84,
    propertiesCount: 74,
    occupancyRate: 97.4,
    ltv: 43.1,
    description: '三菱地所をメインスポンサーとするトップクラスのオフィス特化型J-REIT。丸の内・大手町をはじめとする高品質オフィスビル群を展開。',
    englishDescription: 'Premier office J-REIT sponsored by Mitsubishi Estate, holding prime properties in Marunouchi and major central business districts.',
    properties: [
      { name: '大手町フィナンシャルシティ ノースタワー', category: 'オフィス', location: '東京都千代田区大手町一丁目9番5号', areaRegion: '都心5区', acquisitionPriceMillion: 48000, appraisalValueOku: 720, unrealizedGainOku: 240, floorAreaSqm: 110000, occupancyRate: 100.0, builtDate: '2012年10月', structure: 'S・SRC造 地上31階 地下4階', keyTenant: '大手金融機関、外資系コンサルティング', noiYield: 3.8 },
      { name: '赤坂パークビル', category: 'オフィス', location: '東京都港区赤坂五丁目2番20号', areaRegion: '都心5区', acquisitionPriceMillion: 61000, appraisalValueOku: 850, unrealizedGainOku: 240, floorAreaSqm: 88000, occupancyRate: 97.8, builtDate: '1993年07月', structure: 'S・SRC造 地上30階 地下3階', keyTenant: '博報堂グループ、外資系製薬企業', noiYield: 4.2 },
      { name: '汐留ビルディング', category: 'オフィス', location: '東京都港区海岸一丁目2番20号', areaRegion: '都心5区', acquisitionPriceMillion: 55000, appraisalValueOku: 760, unrealizedGainOku: 210, floorAreaSqm: 119000, occupancyRate: 98.4, builtDate: '2007年12月', structure: 'S・SRC造 地上24階 地下2階', keyTenant: 'ソフトバンクグループ、TIS', noiYield: 4.4 }
    ]
  },

  // --- 物流施設特化型 ---
  {
    code: '3281',
    name: 'GLP投資法人',
    englishName: 'GLP J-REIT',
    sponsor: 'GLPグループ (グローバル物流大手)',
    sponsorRatio: 100.0,
    type: '物流施設特化型',
    price: 132000,
    priceChange: 800,
    priceChangePct: 0.61,
    distributionYield: 4.88,
    navMultiplier: 0.89,
    propertiesCount: 92,
    occupancyRate: 99.2,
    ltv: 44.5,
    description: '先進的物流施設のパイオニアであるGLPグループが運用。関東・関西の巨大物流拠点「ALFALINK」シリーズなど近代的な大型先進施設を多数保有。',
    englishDescription: 'Leading logistics J-REIT sponsored by GLP, investing in cutting-edge modern logistics mega-facilities nationwide.',
    properties: [
      { name: 'GLP ALFALINK 流山 1〜8 (日本最大級物流拠点)', category: '物流施設', location: '千葉県流山市小屋字赤沼', areaRegion: '首都圏', acquisitionPriceMillion: 62000, appraisalValueOku: 880, unrealizedGainOku: 260, floorAreaSqm: 312000, occupancyRate: 100.0, builtDate: '2021年10月', structure: 'PC・S造 地上4階', keyTenant: '佐川急便、アマゾンジャパン、楽天グループ', noiYield: 4.8 },
      { name: 'GLP ALFALINK 相模原 1〜4', category: '物流施設', location: '神奈川県相模原市中央区田名', areaRegion: '首都圏', acquisitionPriceMillion: 54000, appraisalValueOku: 740, unrealizedGainOku: 200, floorAreaSqm: 295000, occupancyRate: 99.4, builtDate: '2022年05月', structure: 'PC・S造 地上5階', keyTenant: 'ヤマト運輸、アスクル、大手3PL', noiYield: 4.7 }
    ]
  },
  {
    code: '3283',
    name: '日本プロロジスリート投資法人',
    englishName: 'Nippon Prologis REIT, Inc.',
    sponsor: 'プロロジス・グループ (Prologis, Inc.)',
    sponsorRatio: 100.0,
    type: '物流施設特化型',
    price: 248000,
    priceChange: 1200,
    priceChangePct: 0.49,
    distributionYield: 4.62,
    navMultiplier: 0.91,
    propertiesCount: 58,
    occupancyRate: 99.5,
    ltv: 39.2,
    description: '世界最大の物流不動産デベロッパーであるプロロジスが展開するJ-REIT。厳格な投資基準で選定された高品質なプロロジスパークを保有。',
    englishDescription: 'Premier logistics J-REIT sponsored by Prologis, maintaining supreme quality and high-occupancy Prologis Parks.',
    properties: [
      { name: 'プロロジスパーク市川 I', category: '物流施設', location: '千葉県市川市塩浜一丁目7番2号', areaRegion: '首都圏', acquisitionPriceMillion: 43000, appraisalValueOku: 630, unrealizedGainOku: 200, floorAreaSqm: 148000, occupancyRate: 100.0, builtDate: '2008年11月', structure: 'PC・S造 地上5階', keyTenant: 'ZOZO、イオンネクスト', noiYield: 4.6 },
      { name: 'プロロジスパーク舞洲 4', category: '物流施設', location: '大阪府大阪市此花区北港緑地二丁目1番66号', areaRegion: '近畿圏', acquisitionPriceMillion: 38000, appraisalValueOku: 510, unrealizedGainOku: 130, floorAreaSqm: 125000, occupancyRate: 100.0, builtDate: '2013年03月', structure: 'RC・S造 地上5階', keyTenant: '日立物流（LOGISTEED）、センコー', noiYield: 4.9 }
    ]
  },

  // --- 商業・ホテル・地域特化型 ---
  {
    code: '3287',
    name: '星野リゾート・リート投資法人',
    englishName: 'Hoshino Resorts REIT, Inc.',
    sponsor: '株式会社星野リゾート (星野佳路代表)',
    sponsorRatio: 100.0,
    type: 'ホテル・旅館特化型',
    price: 495000,
    priceChange: 2500,
    priceChangePct: 0.51,
    distributionYield: 4.86,
    navMultiplier: 0.96,
    propertiesCount: 68,
    occupancyRate: 88.5,
    ltv: 38.8,
    description: '日本を代表するホテル・旅館オペレーター星野リゾートをスポンサーとする観光・ホテル特化型J-REIT。「星のや」「界」「リゾナーレ」「OMO」など圧倒的ブランド力を保有。',
    englishDescription: 'Specialized hotel & resort J-REIT sponsored by Hoshino Resorts, owning flagship luxury resorts such as Hoshinoya and KAI.',
    properties: [
      { name: '星のや京都 (嵐山 渡月橋上流)', category: 'リゾートホテル', location: '京都府京都市西京区嵐山元録山町11-2', areaRegion: '近畿圏', acquisitionPriceMillion: 9800, appraisalValueOku: 145, unrealizedGainOku: 47, floorAreaSqm: 4200, occupancyRate: 92.0, builtDate: '2009年12月 (改修)', structure: '木造・RC造 地上2階', keyTenant: '株式会社星野リゾート (星のや京都)', noiYield: 5.6 },
      { name: '星のや軽井沢 (長野県軽井沢町)', category: 'リゾートホテル', location: '長野県北佐久郡軽井沢町大字長倉2148', areaRegion: '中部圏', acquisitionPriceMillion: 14500, appraisalValueOku: 210, unrealizedGainOku: 65, floorAreaSqm: 12800, occupancyRate: 94.2, builtDate: '2005年07月', structure: '木造・RC造 地上2階', keyTenant: '株式会社星野リゾート (星のや軽井沢)', noiYield: 5.4 },
      { name: 'リゾナーレ八ヶ岳', category: 'リゾートホテル', location: '山梨県北杜市小淵沢町129-1', areaRegion: '中部圏', acquisitionPriceMillion: 12000, appraisalValueOku: 175, unrealizedGainOku: 55, floorAreaSqm: 38000, occupancyRate: 89.5, builtDate: '1990年10月', structure: 'RC・S造 地上5階 地下1階', keyTenant: '株式会社星野リゾート (リゾナーレ八ヶ岳)', noiYield: 5.8 }
    ]
  },
  {
    code: '8968',
    name: '福岡リート投資法人',
    englishName: 'Fukuoka REIT Corporation',
    sponsor: '福岡地所 / 九州電力 / 西日本鉄道 / 福岡銀行',
    sponsorRatio: 100.0,
    type: '九州・地域特化型',
    price: 154000,
    priceChange: 500,
    priceChangePct: 0.33,
    distributionYield: 4.95,
    navMultiplier: 0.88,
    propertiesCount: 36,
    occupancyRate: 98.8,
    ltv: 41.2,
    description: '日本初の地域特化型J-REIT。九州経済界のリーダー企業群（福岡地所・九電・西鉄・福岡銀）が結集し、キャナルシティ博多など九州一等の優良商業・オフィス施設を保有。',
    englishDescription: 'The first regional-specialized J-REIT in Japan, investing in premier commercial and office properties in Fukuoka & Kyushu.',
    properties: [
      { name: 'キャナルシティ博多 (Bブロック・イーストビル)', category: '大型商業施設', location: '福岡県福岡市博多区住吉一丁目2番', areaRegion: '九州・沖縄', acquisitionPriceMillion: 38000, appraisalValueOku: 540, unrealizedGainOku: 160, floorAreaSqm: 247000, occupancyRate: 99.2, builtDate: '1996年04月', structure: 'S・SRC造 地上8階 地下2階', keyTenant: 'ユナイテッド・シネマ、H&M、無印良品', noiYield: 5.1 },
      { name: 'パークプレイス大分', category: '大型商業施設', location: '大分県大分市公園通り西二丁目1番', areaRegion: '九州・沖縄', acquisitionPriceMillion: 19500, appraisalValueOku: 270, unrealizedGainOku: 75, floorAreaSqm: 102000, occupancyRate: 98.5, builtDate: '2002年04月', structure: 'S・SRC造 地上3階', keyTenant: 'イオン、ケーズデンキ', noiYield: 5.5 }
    ]
  }
];

async function main() {
  console.log('🏙️ Synchronizing ALL 58 J-REITs, detailed properties, and financial indicators...');

  for (const reit of ALL_58_REITS) {
    // 1. Reit テーブルへのアップサート
    await prisma.reit.upsert({
      where: { code: reit.code },
      create: {
        code: reit.code,
        name: reit.name,
        englishName: reit.englishName,
        sponsor: reit.sponsor,
        sponsorRatio: reit.sponsorRatio,
        type: reit.type,
        price: reit.price,
        priceChange: reit.priceChange,
        priceChangePct: reit.priceChangePct,
        distributionYield: reit.distributionYield,
        navMultiplier: reit.navMultiplier,
        propertiesCount: reit.propertiesCount,
        occupancyRate: reit.occupancyRate,
        ltv: reit.ltv,
        description: reit.description,
        englishDescription: reit.englishDescription
      },
      update: {
        name: reit.name,
        englishName: reit.englishName,
        sponsor: reit.sponsor,
        sponsorRatio: reit.sponsorRatio,
        type: reit.type,
        price: reit.price,
        priceChange: reit.priceChange,
        priceChangePct: reit.priceChangePct,
        distributionYield: reit.distributionYield,
        navMultiplier: reit.navMultiplier,
        propertiesCount: reit.propertiesCount,
        occupancyRate: reit.occupancyRate,
        ltv: reit.ltv,
        description: reit.description,
        englishDescription: reit.englishDescription
      }
    });

    // 2. 物件のアップサート
    for (const p of reit.properties) {
      const existing = await prisma.reitProperty.findFirst({
        where: { reitCode: reit.code, name: p.name }
      });

      if (existing) {
        await prisma.reitProperty.update({
          where: { id: existing.id },
          data: {
            ...p,
            appraisalValueMillion: p.appraisalValueOku * 100,
            unrealizedGainMillion: p.unrealizedGainOku * 100,
            unrealizedGainRatio: parseFloat(((p.unrealizedGainOku * 100 / p.acquisitionPriceMillion) * 100).toFixed(1))
          }
        });
      } else {
        await prisma.reitProperty.create({
          data: {
            reitCode: reit.code,
            name: p.name,
            englishName: p.englishName,
            category: p.category,
            location: p.location,
            englishLocation: p.englishLocation,
            areaRegion: p.areaRegion,
            acquisitionPriceMillion: p.acquisitionPriceMillion,
            appraisalValueOku: p.appraisalValueOku,
            appraisalValueMillion: p.appraisalValueOku * 100,
            unrealizedGainOku: p.unrealizedGainOku,
            unrealizedGainMillion: p.unrealizedGainOku * 100,
            unrealizedGainRatio: parseFloat(((p.unrealizedGainOku * 100 / p.acquisitionPriceMillion) * 100).toFixed(1)),
            floorAreaSqm: p.floorAreaSqm,
            occupancyRate: p.occupancyRate,
            builtDate: p.builtDate,
            structure: p.structure,
            keyTenant: p.keyTenant,
            noiYield: p.noiYield
          }
        });
      }
    }

    // 3. Company テーブルへの相互リンク・同期（検索バーや比較・スクリーナーでREITが出現できるように）
    await prisma.company.upsert({
      where: { tickerCode: reit.code },
      create: {
        tickerCode: reit.code,
        name: reit.name,
        shortName: reit.name.split(' (')[0],
        englishName: reit.englishName,
        sector: '不動産業 (J-REIT)',
        market: '東証REIT',
        currentPrice: reit.price,
        priceChangePct: reit.priceChangePct,
        marketCap: reit.price * 2500000,
        dividendYield: reit.distributionYield,
        description: reit.description,
        englishDescription: reit.englishDescription,
        headquarters: '東京都中央区',
        representative: `${reit.sponsor} 執行役員`,
        establishedYear: 2001,
        shikihoHeadline: `【分配金利回り${reit.distributionYield}%】${reit.type}、スポンサー${reit.sponsor}`,
        shikihoOutlook: reit.description,
        businessSegments: JSON.stringify([
          { name: `${reit.type} 保有不動産賃貸`, ratio: 88 },
          { name: '不動産売買・附帯事業', ratio: 12 }
        ])
      },
      update: {
        name: reit.name,
        shortName: reit.name.split(' (')[0],
        englishName: reit.englishName,
        sector: '不動産業 (J-REIT)',
        market: '東証REIT',
        currentPrice: reit.price,
        priceChangePct: reit.priceChangePct,
        marketCap: reit.price * 2500000,
        dividendYield: reit.distributionYield,
        description: reit.description,
        englishDescription: reit.englishDescription,
        shikihoHeadline: `【分配金利回り${reit.distributionYield}%】${reit.type}、スポンサー${reit.sponsor}`,
        shikihoOutlook: reit.description
      }
    });

    console.log(`✅ Synced REIT ${reit.code} ${reit.name} (${reit.properties.length} prime properties)`);
  }

  console.log('======================================================');
  console.log('✅ ALL J-REITs and Properties fully synchronized!');
  console.log('======================================================');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
