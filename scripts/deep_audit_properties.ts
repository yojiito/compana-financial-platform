import { PrismaClient } from '@prisma/client';
import { REIT_LIST } from '../lib/reits-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Deep auditing all properties in DB and lib/reits-data.ts...');

  const dbProperties = await prisma.reitProperty.findMany({
    orderBy: [{ reitCode: 'asc' }, { name: 'asc' }]
  });

  console.log(`Total DB Properties: ${dbProperties.length}`);

  let suspiciousCount = 0;
  for (const p of dbProperties) {
    if (p.name.includes('No.') || p.name.includes('第') && p.name.includes('ビル') && !p.name.includes('三井') && !p.name.includes('三菱')) {
      // 疑わしいパターンの確認
      if (p.name.match(/No\.\d+/)) {
        console.warn(`⚠️ Suspicious synthetic pattern found: [${p.reitCode}] ${p.name}`);
        suspiciousCount++;
      }
    }
  }

  console.log(`Suspicious synthetic properties in DB: ${suspiciousCount}`);

  let listSuspicious = 0;
  let totalListProps = 0;
  for (const r of REIT_LIST) {
    totalListProps += r.properties.length;
    for (const p of r.properties) {
      if (p.name.match(/No\.\d+/)) {
        console.warn(`⚠️ Suspicious pattern in REIT_LIST: [${r.tickerCode}] ${p.name}`);
        listSuspicious++;
      }
    }
  }

  console.log(`Total Properties in REIT_LIST: ${totalListProps}`);
  console.log(`Suspicious in REIT_LIST: ${listSuspicious}`);

  // 各REITごとの物件数サマリー
  console.log('\n--- Real Property Portfolio Summary per REIT ---');
  for (const r of REIT_LIST) {
    if (r.properties.length > 0) {
      console.log(`[${r.tickerCode}] ${r.shortName}: ${r.properties.length} authentic properties (e.g. ${r.properties[0]?.name})`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
