import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const reits = await prisma.reit.findMany({
    orderBy: { code: 'asc' },
    include: {
      _count: {
        select: { properties: true }
      }
    }
  });

  console.log(`Found ${reits.length} REITs in DB:`);
  for (const r of reits) {
    console.log(`- [${r.code}] ${r.name} (${r.type}) | Recorded Count in DB: ${r._count.properties} / Target: ${r.propertiesCount}`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
