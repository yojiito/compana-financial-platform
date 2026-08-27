import { prisma } from '../lib/prisma';

async function main() {
  const count = await prisma.company.count();
  console.log(`Current Company count in DB: ${count}`);
}

main().finally(() => prisma.$disconnect());
