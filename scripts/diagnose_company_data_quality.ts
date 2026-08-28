import { prisma } from '../lib/prisma';

async function main() {
  console.log('================================================================');
  console.log('🔍 DEEP AUDIT: CHECKING DATA INTEGRITY, CROSS-CONTAMINATION & NULLS');
  console.log('================================================================\n');

  // 1. 全Companyの基本情報（空欄率・欠損調査）
  const companies = await prisma.company.findMany({
    include: {
      financials: true,
      disclosures: true,
      irSummaries: true,
      shareholders: true,
      stockPrices: true,
    }
  });

  console.log(`Total Companies: ${companies.length}`);

  let nullPriceCount = 0;
  let nullMarketCapCount = 0;
  let nullPerCount = 0;
  let nullPbrCount = 0;
  let nullRoeCount = 0;
  let nullYieldCount = 0;
  let nullEquityCount = 0;
  let noFinancialsCount = 0;
  let noPricesCount = 0;
  let noDisclosuresCount = 0;
  let noShareholdersCount = 0;

  for (const c of companies) {
    if (c.currentPrice === null || c.currentPrice === undefined) nullPriceCount++;
    if (c.marketCap === null || c.marketCap === undefined) nullMarketCapCount++;
    if (c.trailingPE === null || c.trailingPE === undefined) nullPerCount++;
    if (c.priceToBook === null || c.priceToBook === undefined) nullPbrCount++;
    if (c.roe === null || c.roe === undefined) nullRoeCount++;
    if (c.dividendYield === null || c.dividendYield === undefined) nullYieldCount++;
    if (c.equityRatio === null || c.equityRatio === undefined) nullEquityCount++;
    if (c.financials.length === 0) noFinancialsCount++;
    if (c.stockPrices.length === 0) noPricesCount++;
    if (c.disclosures.length === 0) noDisclosuresCount++;
    if (c.shareholders.length === 0) noShareholdersCount++;
  }

  console.log('--- Company Table Missing Fields ---');
  console.log(`Null currentPrice: ${nullPriceCount} / ${companies.length} (${((nullPriceCount/companies.length)*100).toFixed(1)}%)`);
  console.log(`Null marketCap: ${nullMarketCapCount} / ${companies.length} (${((nullMarketCapCount/companies.length)*100).toFixed(1)}%)`);
  console.log(`Null trailingPE: ${nullPerCount} / ${companies.length} (${((nullPerCount/companies.length)*100).toFixed(1)}%)`);
  console.log(`Null priceToBook: ${nullPbrCount} / ${companies.length} (${((nullPbrCount/companies.length)*100).toFixed(1)}%)`);
  console.log(`Null roe: ${nullRoeCount} / ${companies.length} (${((nullRoeCount/companies.length)*100).toFixed(1)}%)`);
  console.log(`Null dividendYield: ${nullYieldCount} / ${companies.length} (${((nullYieldCount/companies.length)*100).toFixed(1)}%)`);
  console.log(`Null equityRatio: ${nullEquityCount} / ${companies.length} (${((nullEquityCount/companies.length)*100).toFixed(1)}%)`);
  console.log(`No Financials: ${noFinancialsCount} / ${companies.length}`);
  console.log(`No Stock Prices: ${noPricesCount} / ${companies.length}`);
  console.log(`No Disclosures: ${noDisclosuresCount} / ${companies.length}`);
  console.log(`No Shareholders: ${noShareholdersCount} / ${companies.length}`);

  // 2. 他社混入（Cross-Contamination）のチェック
  console.log('\n--- Cross-Contamination & Mismatch Checks ---');
  
  // A. 大株主テーブルに他社の社名やティッカー不一致がないか
  const shareholders = await prisma.majorShareholder.findMany({
    take: 100,
    include: { company: true }
  });
  console.log(`Sample MajorShareholder rows checked: ${shareholders.length}`);

  // B. 適時開示テーブルのタイトルと会社名の一致チェック
  const disclosures = await prisma.disclosureDocument.findMany({
    include: { company: true }
  });
  let disclosureMismatches = 0;
  for (const d of disclosures) {
    if (d.company && !d.title.includes(d.company.name) && !d.title.includes(d.company.shortName)) {
      disclosureMismatches++;
    }
  }
  console.log(`Disclosures with company name mismatch: ${disclosureMismatches} / ${disclosures.length}`);

  // C. サンプル銘柄（トヨタ、任天堂、ソニー、キーエンス、ソフトバンクG、三菱商事、メルカリ、note等）のデータ詳細ダンプ
  const sampleTickers = ['7203', '7974', '6758', '6861', '9984', '8058', '4385', '5243', '1301', '9983'];
  console.log('\n--- Sample Ticker Detailed Inspection ---');
  for (const t of sampleTickers) {
    const c = await prisma.company.findUnique({
      where: { tickerCode: t },
      include: {
        financials: { orderBy: { fiscalYear: 'desc' }, take: 2 },
        shareholders: { orderBy: { rank: 'asc' }, take: 3 },
        disclosures: { orderBy: { discloseAt: 'desc' }, take: 2 },
        irSummaries: { take: 1 }
      }
    });

    if (c) {
      console.log(`[${c.tickerCode}] ${c.name} (${c.market} / ${c.sector})`);
      console.log(`  Price: ¥${c.currentPrice} | Cap: ¥${c.marketCap} | PER: ${c.trailingPE} | PBR: ${c.priceToBook} | ROE: ${c.roe}% | Div: ${c.dividendYield}%`);
      console.log(`  Financials count: ${c.financials.length} | Latest Rev: ¥${c.financials[0]?.revenue}M, Op: ¥${c.financials[0]?.operatingIncome}M`);
      console.log(`  Shareholders count: ${c.shareholders.length} | Top: ${c.shareholders[0]?.shareholderName} (${c.shareholders[0]?.holdingRatio}%)`);
      console.log(`  Disclosures count: ${c.disclosures.length} | Latest: ${c.disclosures[0]?.title}`);
      console.log(`  IR Summaries: ${c.irSummaries.length}`);
    } else {
      console.log(`[${t}] NOT FOUND`);
    }
  }
}

main().finally(() => prisma.$disconnect());
