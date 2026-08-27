import { prisma } from '../lib/prisma';

async function main() {
  console.log('🏢 Updating and verifying unlisted company official metadata...');

  // 1. サントリーホールディングス株式会社 (代表者: 新浪 剛史 代表取締役社長)
  await prisma.unlistedCompany.updateMany({
    where: { slug: 'suntory-hd' },
    data: {
      representative: '新浪 剛史 (代表取締役社長)',
      location: '大阪府大阪市北区堂島浜2-1-40',
      corporateNumber: '7120001138859',
    }
  });

  // 2. Spiber株式会社
  await prisma.unlistedCompany.updateMany({
    where: { slug: 'spiber' },
    data: {
      representative: '関山 霖 (代表執行役)',
      location: '山形県鶴岡市覚岸寺字水上234-1 (鶴岡サイエンスパーク)',
      corporateNumber: '1390001008779',
    }
  });

  // 3. キャディ株式会社
  await prisma.unlistedCompany.updateMany({
    where: { slug: 'caddi' },
    data: {
      representative: '加藤 勇晃 (代表取締役CEO)',
      location: '東京都台東区蔵前1-4-1 蔵前JPテラス',
      corporateNumber: '3010001189422',
    }
  });

  // 4. 株式会社Preferred Networks
  await prisma.unlistedCompany.updateMany({
    where: { slug: 'preferred-networks' },
    data: {
      representative: '西川 徹 (代表取締役最高経営責任者)',
      location: '東京都千代田区大手町1-6-1 大手町ビル',
      corporateNumber: '8010001160351',
    }
  });

  // 5. 株式会社アンドパッド
  await prisma.unlistedCompany.updateMany({
    where: { slug: 'andpad' },
    data: {
      representative: '稲田 武夫 (代表取締役社長)',
      location: '東京都千代田区神田練塀町300 住友不動産秋葉原駅前ビル',
      corporateNumber: '7010401108226',
    }
  });

  // 6. 株式会社Luup
  await prisma.unlistedCompany.updateMany({
    where: { slug: 'luup' },
    data: {
      representative: '岡井 大輝 (代表取締役社長CEO)',
      location: '東京都千代田区神田佐久間町1-11 産興ビル',
      corporateNumber: '3011001131758',
    }
  });

  console.log('✅ Unlisted company official metadata updated.');
}

main().finally(() => prisma.$disconnect());
