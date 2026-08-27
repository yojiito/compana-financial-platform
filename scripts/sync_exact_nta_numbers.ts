import { prisma } from '../lib/prisma';
import fs from 'fs';
import path from 'path';

// 国税庁公式公表の正確な法人番号 (13桁)
const EXACT_NTA_MAP: Record<string, string> = {
  'asahi': '6120001059605',
  'yomiuri': '7010001031722',
  'nikkei': '3010001033086',
  'shogakukan': '6010001018919',
  'kodansha': '5010001002592',
  'shueisha': '5010001018556',
  'suntory-hd': '3120001136159',
  'preferred-networks': '1010001159494',
  'smarthr': '2011001093311',
  'spiber': '3390001018272',
  'caddi': '6010001187623',
  'andpad': '4010403009022',
  'luup': '1011001123515',
  'layerx': '9010401140088'
};

async function main() {
  console.log('🔄 Syncing exact official NTA corporate numbers...');

  // 1. Prisma DB更新
  for (const [slug, ntaNum] of Object.entries(EXACT_NTA_MAP)) {
    try {
      await prisma.unlistedCompany.update({
        where: { slug },
        data: { corporateNumber: ntaNum }
      });
      console.log(`✅ Updated DB: ${slug} -> ${ntaNum}`);
    } catch (e) {
      console.warn(`Could not update ${slug} in DB:`, e);
    }
  }

  // 2. lib/unlisted-companies-data.ts を更新
  const dataPath = path.join(__dirname, '../lib/unlisted-companies-data.ts');
  let content = fs.readFileSync(dataPath, 'utf8');

  for (const [slug, ntaNum] of Object.entries(EXACT_NTA_MAP)) {
    // corporateNumber: '...'
    const regex = new RegExp(`(slug:\\s*['"]${slug}['"][\\s\\S]*?corporateNumber:\\s*['"])[^'"]+(['"])`);
    if (regex.test(content)) {
      content = content.replace(regex, `$1${ntaNum}$2`);
    }
  }

  fs.writeFileSync(dataPath, content, 'utf8');
  console.log('✅ Synchronized lib/unlisted-companies-data.ts with exact NTA numbers');
}

main().finally(() => prisma.$disconnect());
