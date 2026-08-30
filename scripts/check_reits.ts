import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Inspecting REITs and Properties in database...');

  const reits = await prisma.reit.findMany({
    include: {
      _count: {
        select: { properties: true }
      }
    }
  });

  console.log(`Total REITs in DB: ${reits.length}`);
  console.table(reits.map(r => ({
    code: r.code,
    name: r.name,
    sponsor: r.sponsor,
    type: r.type,
    yield: `${r.distributionYield}%`,
    nav: r.navMultiplier,
    propertiesInDB: r._count.properties,
    recordedPropCount: r.propertiesCount
  })));

  const totalProps = await prisma.reitProperty.count();
  console.log(`Total REIT Properties in DB: ${totalProps}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
