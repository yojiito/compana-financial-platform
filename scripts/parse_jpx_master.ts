import * as XLSX from 'xlsx';
import path from 'path';

const filePath = path.join(__dirname, 'data_j.xls');
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

const rawData: any[] = XLSX.utils.sheet_to_json(sheet);

console.log(`Sheet Name: ${sheetName}`);
console.log(`Total Rows parsed: ${rawData.length}`);
console.log('\nSample Rows (Top 5):');
console.log(JSON.stringify(rawData.slice(0, 5), null, 2));

// 市場区分の内訳
const marketCounts: Record<string, number> = {};
const sectorCounts: Record<string, number> = {};

for (const row of rawData) {
  const market = row['市場・商品区分'] || row['市場区分'] || row['Market/Product Segment'] || 'Unknown';
  const sector = row['33業種区分'] || row['17業種区分'] || row['33 Sector Name'] || 'Unknown';
  
  marketCounts[market] = (marketCounts[market] || 0) + 1;
  sectorCounts[sector] = (sectorCounts[sector] || 0) + 1;
}

console.log('\nMarket Distribution:');
console.log(JSON.stringify(marketCounts, null, 2));

console.log('\nSector Distribution:');
console.log(JSON.stringify(sectorCounts, null, 2));
