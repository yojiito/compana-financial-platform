import { prisma } from '../lib/prisma';

async function main() {
  const allUnlisted = await prisma.unlistedCompany.findMany({
    include: {
      shareholders: true,
    }
  });

  console.log(`Found ${allUnlisted.length} unlisted companies in DB.`);

  for (const c of allUnlisted) {
    console.log(`\n🏢 ${c.name} (${c.slug}): ${c.shareholders.length} shareholders recorded`);
    for (const s of c.shareholders) {
      console.log(`  - Rank ${s.rank}: "${s.shareholderName}" | ${s.holdingRatio}% | ${s.shareholderType}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
