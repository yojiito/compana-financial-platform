import { prisma } from '../lib/prisma';

async function main() {
  console.log('=== 1. パピレス (3641) の大株主一覧 ===');
  const papyless = await prisma.company.findUnique({
    where: { tickerCode: '3641' },
    include: {
      shareholders: { orderBy: { rank: 'asc' } }
    }
  });
  console.log(JSON.stringify(papyless, null, 2));

  console.log('\n=== 2. 新潮社 (shinchosha) の株主・出資先データ ===');
  const shinchosha = await prisma.unlistedCompany.findFirst({
    where: { slug: 'shinchosha' },
    include: {
      shareholders: true,
      capitalEvents: true
    }
  });
  console.log(JSON.stringify(shinchosha, null, 2));
}

main().finally(() => prisma.$disconnect());
