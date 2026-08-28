import { prisma } from '../lib/prisma';
import fs from 'fs';
import path from 'path';

async function scanDb() {
  console.log('=== DATABASE DEEP SCAN FOR PAPYLESS / SHINCHOSHA ===\n');

  // 1. UnlistedCompany
  const unlisted = await prisma.unlistedCompany.findMany();
  for (const u of unlisted) {
    const str = JSON.stringify(u);
    if (str.includes('パピレス') || str.includes('3641') || str.includes('Papyless')) {
      console.log(`[UnlistedCompany: ${u.name} (${u.slug})] contains Papyless reference:`);
      console.log(JSON.stringify(u, null, 2));
    }
  }

  // 2. UnlistedShareholder
  const uShareholders = await prisma.unlistedShareholder.findMany();
  for (const s of uShareholders) {
    const str = JSON.stringify(s);
    if (str.includes('パピレス') || str.includes('3641') || str.includes('新潮社')) {
      console.log(`[UnlistedShareholder]`, JSON.stringify(s, null, 2));
    }
  }

  // 3. UnlistedCapitalEvent
  const uEvents = await prisma.unlistedCapitalEvent.findMany();
  for (const e of uEvents) {
    const str = JSON.stringify(e);
    if (str.includes('パピレス') || str.includes('3641') || str.includes('新潮社')) {
      console.log(`[UnlistedCapitalEvent]`, JSON.stringify(e, null, 2));
    }
  }

  // 4. MajorShareholder
  const mShareholders = await prisma.majorShareholder.findMany({
    where: {
      OR: [
        { tickerCode: '3641' },
        { shareholderName: { contains: '新潮社' } }
      ]
    }
  });
  console.log('\n[MajorShareholder for 3641 or 新潮社]:', JSON.stringify(mShareholders, null, 2));

  // 5. LargeHoldingReport
  const lHoldings = await prisma.largeHoldingReport.findMany({
    where: {
      OR: [
        { tickerCode: '3641' },
        { filerName: { contains: '新潮社' } }
      ]
    }
  });
  console.log('\n[LargeHoldingReport for 3641 or 新潮社]:', JSON.stringify(lHoldings, null, 2));
}

function scanFiles(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanFiles(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('パピレス') && content.includes('新潮社')) {
        console.log(`[FILE MATCH: ${fullPath}] contains both パピレス and 新潮社`);
      }
    }
  }
}

async function main() {
  await scanDb();
  console.log('\n=== FILE SCAN ===');
  scanFiles(path.resolve('.'));
}

main().finally(() => prisma.$disconnect());
