import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const c = await prisma.company.findUnique({
    where: { tickerCode: '9044' },
    include: { financials: true }
  });

  console.log('Record for 9044:');
  console.log(JSON.stringify(c, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
