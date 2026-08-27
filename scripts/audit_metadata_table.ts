import { prisma } from '../lib/prisma';

async function main() {
  const cs = await prisma.unlistedCompany.findMany({
    select: {
      slug: true,
      name: true,
      corporateNumber: true,
      representative: true,
      capital: true,
      establishedYear: true,
      location: true,
      industry: true,
    }
  });

  console.log('--- ALL UNLISTED COMPANIES METADATA ---');
  for (const c of cs) {
    console.log(`[${c.slug}] ${c.name} | CorpNum: ${c.corporateNumber} | Rep: ${c.representative} | Est: ${c.establishedYear} | Cap: ¥${c.capital}M | Loc: ${c.location}`);
  }
}

main().finally(() => prisma.$disconnect());
