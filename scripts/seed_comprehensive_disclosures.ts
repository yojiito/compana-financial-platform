import { prisma } from '../lib/prisma';

const DISCLOSURE_TEMPLATES = [
  { docType: '決算短信', titleSuffix: '通期決算短信〔日本基準〕（連結）', offsetDays: 0 },
  { docType: '有価証券報告書', titleSuffix: '有価証券報告書－第{fy}期', offsetDays: 50 },
  { docType: '適時開示', titleSuffix: '剰余金の配当（増配）に関するお知らせ', offsetDays: 0 },
  { docType: '適時開示', titleSuffix: '自己株式取得に係る事項の決定に関するお知らせ', offsetDays: 10 },
  { docType: '適時開示', titleSuffix: '定時株主総会招集ご通知及び株主総会資料', offsetDays: 40 },
  { docType: '決算説明会', titleSuffix: '通期決算説明会資料・プレゼンテーション', offsetDays: 1 },
];

async function main() {
  console.log('================================================================');
  console.log('📑 SEEDING COMPREHENSIVE DISCLOSURES & IR FILINGS');
  console.log('================================================================\n');

  const topCompanies = await prisma.company.findMany({
    select: { tickerCode: true, name: true },
    take: 100,
  });

  const docsToInsert: any[] = [];
  const years = [2022, 2023, 2024];

  for (const c of topCompanies) {
    for (const yr of years) {
      for (const t of DISCLOSURE_TEMPLATES) {
        const title = `${yr}年3月期 ${t.titleSuffix.replace('{fy}', String(yr - 1940))}`;
        const dateMonth = t.offsetDays > 30 ? '06' : '05';
        const dateDay = String(Math.min(28, (t.offsetDays % 25) + 8)).padStart(2, '0');
        const discloseAt = `${yr}-${dateMonth}-${dateDay} 15:00`;

        docsToInsert.push({
          tickerCode: c.tickerCode,
          discloseAt: discloseAt,
          docType: t.docType,
          title: `${c.name} ${title}`,
          url: `https://www.release.tdnet.info/inbs/${c.tickerCode}_${yr}${dateMonth}${dateDay}.pdf`
        });
      }
    }
  }

  console.log(`Inserting ${docsToInsert.length} timely disclosure documents...`);

  await prisma.disclosureDocument.createMany({
    data: docsToInsert,
  });

  console.log('🎉 COMPREHENSIVE DISCLOSURES SEEDED SUCCESSFULLY!');
}

main().finally(() => prisma.$disconnect());
