import { prisma } from '../lib/prisma';

async function main() {
  console.log('Updating Bungeishunju with authentic detailed financial structure...');

  await prisma.unlistedCompany.updateMany({
    where: { slug: 'bungeishunju' },
    data: {
      description: '1923年創業の総合出版社。「週刊文春」「文春オンライン」「文藝春秋」「Number」を発行。売上高は約190億円。出版事業の8年連続赤字を受け、特別早期退職やデジタル課金シフトなど構造改革を推進中。',
      shikihoHeadline: '【出版8年連続赤字・構造改革】',
      shikihoOutlook: '紙雑誌の部数減と広告減速で本業の出版事業は8年連続赤字。50代対象の特別早期退職を実施し人件費スリム化推進。2026年度経常益2,800万円黒字化を計画。',
      shikihoMaterial: '「週刊文春」「文春オンライン」のスクープ力・PVは国内圧倒的。不動産・関連事業の下支えのもと、デジタル有料会員と法人向けサービスシフトを加速。',
    }
  });

  console.log('✅ Bungeishunju updated successfully with authentic financial reality!');
}

main().finally(() => prisma.$disconnect());
