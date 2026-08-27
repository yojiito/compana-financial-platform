import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { prisma } from '../lib/prisma';

// 33業種の英語名マッピング
const SECTOR_EN_MAP: Record<string, string> = {
  '水産・農林業': 'Fishery, Agriculture & Forestry',
  '鉱業': 'Mining',
  '建設業': 'Construction',
  '食料品': 'Foods',
  '繊維製品': 'Textiles & Apparels',
  'パルプ・紙': 'Pulp & Paper',
  '化学': 'Chemicals',
  '医薬品': 'Pharmaceutical',
  '石油・石炭製品': 'Oil & Coal Products',
  'ゴム製品': 'Rubber Products',
  'ガラス・土石製品': 'Glass & Ceramics Products',
  '鉄鋼': 'Iron & Steel',
  '非鉄金属': 'Nonferrous Metals',
  '金属製品': 'Metal Products',
  '機械': 'Machinery',
  '電気機器': 'Electric Appliances',
  '輸送用機器': 'Transportation Equipment',
  '精密機器': 'Precision Instruments',
  'その他製品': 'Other Products',
  '電気・ガス業': 'Electric Power & Gas',
  '陸運業': 'Land Transportation',
  '海運業': 'Marine Transportation',
  '空運業': 'Air Transportation',
  '倉庫・運輸関連業': 'Warehousing & Harbor Transportation',
  '情報・通信業': 'Information & Communication',
  '卸売業': 'Wholesale Trade',
  '小売業': 'Retail Trade',
  '銀行業': 'Banks',
  '証券、商品先物取引業': 'Securities & Commodity Futures',
  '保険業': 'Insurance',
  'その他金融業': 'Other Financing Business',
  '不動産業': 'Real Estate',
  'サービス業': 'Services'
};

// 市場区分の正規化マッピング
function normalizeMarket(rawMarket: string): string {
  if (rawMarket.includes('プライム')) return 'プライム';
  if (rawMarket.includes('スタンダード')) return 'スタンダード';
  if (rawMarket.includes('グロース')) return 'グロース';
  if (rawMarket.includes('PRO Market')) return 'PRO Market';
  return rawMarket;
}

async function main() {
  console.log('================================================================');
  console.log('🚀 JPX ALL LISTED COMPANIES COMPREHENSIVE IMPORT PIPELINE');
  console.log('================================================================\n');

  const filePath = path.join(__dirname, 'data_j.xls');
  if (!fs.existsSync(filePath)) {
    throw new Error(`data_j.xls not found at: ${filePath}`);
  }

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rawData: any[] = XLSX.utils.sheet_to_json(sheet);

  console.log(`📊 Total raw rows in JPX dataset: ${rawData.length}`);

  // 普通株式（株式銘柄）のみをフィルタリング（ETF/REIT等を除く）
  const companyRows = rawData.filter((row) => {
    const market = String(row['市場・商品区分'] || '');
    const sector = String(row['33業種区分'] || '');
    // 33業種が有効で、ETFやREITでないもの
    return sector !== '-' && sector !== '' && !market.includes('ETF') && !market.includes('REIT');
  });

  console.log(`✅ Filtered Listed Companies count: ${companyRows.length} companies`);

  const masterList: any[] = [];
  let insertedCount = 0;
  let updatedCount = 0;

  const BATCH_SIZE = 100;
  const total = companyRows.length;

  for (let i = 0; i < total; i += BATCH_SIZE) {
    const chunk = companyRows.slice(i, i + BATCH_SIZE);

    await prisma.$transaction(
      chunk.map((row) => {
        const tickerCode = String(row['コード']).trim();
        const rawName = String(row['銘柄名']).trim().normalize('NFKC').replace(/\s+/g, ' ');
        const sector = String(row['33業種区分']).trim();
        const rawMarket = String(row['市場・商品区分'] || '');
        const market = normalizeMarket(rawMarket);
        const englishSector = SECTOR_EN_MAP[sector] || sector;

        masterList.push({
          tickerCode,
          name: rawName,
          sector,
          market,
          englishSector
        });

        return prisma.company.upsert({
          where: { tickerCode },
          update: {
            // 既存レコードの場合は基本属性のみ安全に同期
            sector,
            englishSector,
            market,
          },
          create: {
            tickerCode,
            name: rawName,
            shortName: rawName,
            sector,
            englishSector,
            market,
            description: `東京証券取引所 ${market}市場上場（証券コード: ${tickerCode} / ${sector}）`,
            englishDescription: `TSE ${market} Listed Company (Ticker: ${tickerCode}, ${englishSector})`,
          }
        });
      })
    );

    const progress = Math.min(i + BATCH_SIZE, total);
    console.log(`⏳ Imported ${progress} / ${total} companies (${((progress / total) * 100).toFixed(1)}%)...`);
  }

  // 静的マスターデータファイル lib/all-jpx-companies-data.ts を生成
  const staticDataPath = path.join(__dirname, '../lib/all-jpx-companies-data.ts');
  const fileHeader = `/**
 * 🇯🇵 JPX Official All Listed Equities Master Dataset
 * 日本取引所グループ（JPX）公認 東証上場全銘柄 (${masterList.length}社) マスター
 * Last Updated: ${new Date().toISOString()}
 */

export interface JpxListedCompanyItem {
  tickerCode: string;
  name: string;
  sector: string;
  market: string;
  englishSector: string;
}

export const JPX_ALL_COMPANIES: JpxListedCompanyItem[] = ${JSON.stringify(masterList, null, 2)};
`;

  fs.writeFileSync(staticDataPath, fileHeader, 'utf8');
  console.log(`\n💾 Generated static master file: lib/all-jpx-companies-data.ts (${(fs.statSync(staticDataPath).size / 1024).toFixed(1)} KB)`);

  const finalDbCount = await prisma.company.count();
  console.log(`\n🎉 FINAL DATABASE COMPANY COUNT: ${finalDbCount} Listed Companies!`);
}

main().finally(() => prisma.$disconnect());
