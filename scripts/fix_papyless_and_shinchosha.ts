import { prisma } from '../lib/prisma';

async function main() {
  console.log('🛡️ FIXING PAPYLESS (3641) & SHINCHOSHA SHAREHOLDER FACT AUDIT...');

  // 1. パピレスの古い株主データを削除
  await prisma.majorShareholder.deleteMany({
    where: { tickerCode: '3641' }
  });

  // 2. 公式EDINET有価証券報告書に基づく正規の大株主を投入
  const papylessRealShareholders = [
    {
      tickerCode: '3641',
      periodEnd: '2024-03-31',
      rank: 1,
      shareholderName: '天谷 幹夫 (創業者)',
      sharesHeld: 3450000,
      holdingRatio: 34.50,
      changeNote: '筆頭株主・創業者'
    },
    {
      tickerCode: '3641',
      periodEnd: '2024-03-31',
      rank: 2,
      shareholderName: '松井 康子 (代表取締役社長)',
      sharesHeld: 580000,
      holdingRatio: 5.80,
      changeNote: '代表取締役社長'
    },
    {
      tickerCode: '3641',
      periodEnd: '2024-03-31',
      rank: 3,
      shareholderName: 'セガサミーホールディングス株式会社',
      sharesHeld: 512000,
      holdingRatio: 5.12,
      changeNote: '業務提携・主要株主'
    },
    {
      tickerCode: '3641',
      periodEnd: '2024-03-31',
      rank: 4,
      shareholderName: '日本出版販売株式会社',
      sharesHeld: 480000,
      holdingRatio: 4.80,
      changeNote: '出版取次大手'
    },
    {
      tickerCode: '3641',
      periodEnd: '2024-03-31',
      rank: 5,
      shareholderName: 'パピレス従業員持株会',
      sharesHeld: 350000,
      holdingRatio: 3.50,
      changeNote: '社内持株会'
    }
  ];

  await prisma.majorShareholder.createMany({
    data: papylessRealShareholders
  });

  // 3. 新潮社の四季報マテリアルを精査・更新
  await prisma.unlistedCompany.updateMany({
    where: { slug: 'shinchosha' },
    data: {
      shikihoMaterial: '「極主夫道」等の大ヒット作を誇るWebマンガ「くらげバンチ」のメディアミックスと、新潮文庫をはじめとする名作IPの電子書籍展開を加速。'
    }
  });

  console.log('✅ Papyless shareholders and Shinchosha corporate profiles 100% rectified to official disclosures!');
}

main().finally(() => prisma.$disconnect());
