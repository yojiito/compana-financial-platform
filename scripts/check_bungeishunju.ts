import { prisma } from '../lib/prisma';

async function main() {
  const company = await prisma.unlistedCompany.findFirst({
    where: {
      OR: [
        { slug: 'bungeishunju' },
        { name: { contains: '文藝春秋' } }
      ]
    },
    include: {
      gazetteReports: true,
      shareholders: true,
      capitalEvents: true
    }
  });

  console.log('=== 株式会社文藝春秋 (Unlisted Record) ===');
  console.log(JSON.stringify(company, null, 2));
}

main().finally(() => prisma.$disconnect());
