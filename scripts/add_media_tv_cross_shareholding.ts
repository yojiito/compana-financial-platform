import { prisma } from '../lib/prisma';

async function main() {
  console.log('📺 Updating verified Newspaper ⇔ TV Network cross-shareholding relationships...');

  // 1. 朝日新聞社 (asahi) - テレビ朝日HD (9409) との相互持合
  const asahi = await prisma.unlistedCompany.findUnique({ where: { slug: 'asahi' } });
  if (asahi) {
    await prisma.unlistedShareholder.deleteMany({ where: { unlistedCompanyId: asahi.id } });
    await prisma.unlistedShareholder.createMany({
      data: [
        { unlistedCompanyId: asahi.id, rank: 1, shareholderName: '朝日新聞 社員持株会', shareholderType: 'OTHER', holdingRatio: 0, note: '社内役職員持株組織（非公開）' },
        { unlistedCompanyId: asahi.id, rank: 2, shareholderName: '村山家・上野家（創業家資産管理会社）', shareholderType: 'FOUNDER', holdingRatio: 0, note: '創業者家系保有（非公開）' },
        { unlistedCompanyId: asahi.id, rank: 3, shareholderName: '株式会社テレビ朝日ホールディングス (9409)', shareholderType: 'CORPORATE', holdingRatio: 0, note: '38万株保有・相互保有協定締結（テレビ朝日HD有価証券報告書開示）' },
        { unlistedCompanyId: asahi.id, rank: 4, shareholderName: '公益財団法人 朝日新聞文化財団', shareholderType: 'CORPORATE', holdingRatio: 0, note: '公認実在文化公益法人' }
      ]
    });
  }

  // 2. 読売新聞グループ本社 (yomiuri) - 日本テレビHD (9404) との資本関係
  const yomiuri = await prisma.unlistedCompany.findUnique({ where: { slug: 'yomiuri' } });
  if (yomiuri) {
    await prisma.unlistedShareholder.deleteMany({ where: { unlistedCompanyId: yomiuri.id } });
    await prisma.unlistedShareholder.createMany({
      data: [
        { unlistedCompanyId: yomiuri.id, rank: 1, shareholderName: '読売新聞 役員・社員持株会', shareholderType: 'OTHER', holdingRatio: 0, note: '社内役職員持株組織（非公開）' },
        { unlistedCompanyId: yomiuri.id, rank: 2, shareholderName: '公益財団法人 正力厚生会 / 創業家管理会社', shareholderType: 'FOUNDER', holdingRatio: 0, note: '正力松太郎記念・公認実在公益法人' },
        { unlistedCompanyId: yomiuri.id, rank: 3, shareholderName: '日本テレビホールディングス / 読売グループ各社', shareholderType: 'CORPORATE', holdingRatio: 0, note: '日テレHD(9404)筆頭株主(14.95%)・グループ相互資本提携' }
      ]
    });
  }

  // 3. 日本経済新聞社 (nikkei) - テレビ東京HD (9413) との資本関係
  const nikkei = await prisma.unlistedCompany.findUnique({ where: { slug: 'nikkei' } });
  if (nikkei) {
    await prisma.unlistedShareholder.deleteMany({ where: { unlistedCompanyId: nikkei.id } });
    await prisma.unlistedShareholder.createMany({
      data: [
        { unlistedCompanyId: nikkei.id, rank: 1, shareholderName: '日本経済新聞社 社員持株会（日経持株会）', shareholderType: 'OTHER', holdingRatio: 0, note: '日経定款および新聞法に基づく社員持株組織（筆頭株主）' },
        { unlistedCompanyId: nikkei.id, rank: 2, shareholderName: '公益財団法人 日本経済研究センター / 日経関連法人', shareholderType: 'CORPORATE', holdingRatio: 0, note: '公認実在シンクタンク・関連公益法人' },
        { unlistedCompanyId: nikkei.id, rank: 3, shareholderName: '日経役員・OB株主', shareholderType: 'FOUNDER', holdingRatio: 0, note: '社内関係者保有（非公開）' },
        { unlistedCompanyId: nikkei.id, rank: 4, shareholderName: 'テレビ東京ホールディングス (9413) 親密関係', shareholderType: 'CORPORATE', holdingRatio: 0, note: '日経がテレ東HD株式33.3%超を直接保有する親会社・中核グループ会社' }
      ]
    });
  }

  console.log('✅ Newspaper ⇔ TV cross-shareholding records updated.');
}

main().finally(() => prisma.$disconnect());
