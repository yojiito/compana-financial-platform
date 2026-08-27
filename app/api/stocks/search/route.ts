import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INVESTOR_FUNDS_DATA } from '@/lib/investor-funds-data';
import { REIT_LIST } from '@/lib/reits-data';
import { getCompanyName, getSectorName, JAPANESE_TO_ENGLISH_MAP } from '@/lib/company-english-names';

export const dynamic = 'force-dynamic';

// 英語クエリから日本語クエリへの検索エイリアスマップ
const ENGLISH_TO_JAPANESE_SEARCH_MAP: Record<string, string[]> = {
  'blackrock': ['ブラックロック', 'BlackRock'],
  'elliott': ['エリオット', 'Elliott'],
  'oasis': ['オアシス', 'Oasis'],
  'berkshire': ['バークシャー', 'バフェット', 'Berkshire'],
  'buffett': ['バフェット', 'バークシャー', 'Buffett'],
  'master trust': ['マスタートラスト', '日本マスタートラスト'],
  'custody': ['カストディ', '日本カストディ'],
  'jafco': ['ジャフコ', 'JAFCO'],
  'toyota': ['トヨタ', '豊田', 'Toyota'],
  'erikawa': ['襟川', 'コーエーテクモ'],
  'nintendo': ['任天堂', 'Nintendo'],
  'keyence': ['キーエンス', 'Keyence'],
  'sony': ['ソニー', 'Sony'],
  'softbank': ['ソフトバンク', 'SoftBank'],
  'mitsui': ['三井', 'Mitsui'],
  'mitsubishi': ['三菱', 'Mitsubishi'],
  'shueisha': ['集英社', 'Shueisha'],
  'kodansha': ['講談社', 'Kodansha'],
  'smarthr': ['SmartHR', 'スマートHR'],
  'layerx': ['LayerX', 'レイヤーX'],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawQ = searchParams.get('q')?.trim() || '';

  if (!rawQ) {
    return NextResponse.json([]);
  }

  const qLower = rawQ.toLowerCase();
  const searchTerms = [rawQ];

  // 英語エイリアスを追加
  for (const [enKey, jpTerms] of Object.entries(ENGLISH_TO_JAPANESE_SEARCH_MAP)) {
    if (qLower.includes(enKey)) {
      searchTerms.push(...jpTerms);
    }
  }

  // 1. 上場企業検索 (企業名・コード・英文名)
  const listed = await prisma.company.findMany({
    where: {
      OR: searchTerms.flatMap((term) => [
        { tickerCode: { contains: term } },
        { name: { contains: term } },
        { shortName: { contains: term } },
        { englishName: { contains: term } },
      ]),
    },
    take: 6,
    select: {
      tickerCode: true,
      name: true,
      shortName: true,
      englishName: true,
      sector: true,
      market: true,
      currentPrice: true,
      priceChangePct: true,
    },
  });

  // 2. 株主名・大量保有者からの逆引き検索 (MajorShareholder & LargeHoldingReport)
  const shareholderMatches = await prisma.majorShareholder.findMany({
    where: {
      OR: searchTerms.map((term) => ({ shareholderName: { contains: term } })),
    },
    take: 6,
    include: {
      company: {
        select: {
          tickerCode: true,
          name: true,
          shortName: true,
          englishName: true,
          market: true,
          sector: true,
        },
      },
    },
  });

  const largeHoldingMatches = await prisma.largeHoldingReport.findMany({
    where: {
      OR: searchTerms.map((term) => ({ filerName: { contains: term } })),
    },
    take: 6,
    include: {
      company: {
        select: {
          tickerCode: true,
          name: true,
          shortName: true,
          englishName: true,
          market: true,
          sector: true,
        },
      },
    },
  });

  // 3. 未上場企業検索
  const unlisted = await prisma.unlistedCompany.findMany({
    where: {
      OR: searchTerms.flatMap((term) => [
        { name: { contains: term } },
        { shortName: { contains: term } },
        { englishName: { contains: term } },
        { slug: { contains: term } },
      ]),
    },
    take: 4,
    select: {
      id: true,
      slug: true,
      name: true,
      shortName: true,
      englishName: true,
      industry: true,
      latestNetAssets: true,
      latestNetIncome: true,
    },
  });

  // 4. 主要投資ファンド・VC検索 (INVESTOR_FUNDS_DATA)
  const matchingFunds = INVESTOR_FUNDS_DATA.filter((fund) => {
    return searchTerms.some((term) => {
      const tLower = term.toLowerCase();
      return (
        fund.name.toLowerCase().includes(tLower) ||
        fund.enName.toLowerCase().includes(tLower) ||
        fund.shortName.toLowerCase().includes(tLower) ||
        fund.enShortName.toLowerCase().includes(tLower) ||
        fund.representative.toLowerCase().includes(tLower) ||
        fund.enRepresentative.toLowerCase().includes(tLower) ||
        fund.topHoldings.some((h) => h.targetName.toLowerCase().includes(tLower) || (h.enTargetName && h.enTargetName.toLowerCase().includes(tLower)))
      );
    });
  }).slice(0, 3);

  // 5. J-REIT 検索 (REIT_LIST)
  const matchingReits = REIT_LIST.filter((reit) => {
    return searchTerms.some((term) => {
      const tLower = term.toLowerCase();
      return (
        reit.tickerCode.includes(term) ||
        reit.name.toLowerCase().includes(tLower) ||
        reit.shortName.toLowerCase().includes(tLower) ||
        reit.sponsor.toLowerCase().includes(tLower)
      );
    });
  }).slice(0, 3);

  const formattedResults = [
    // 上場企業
    ...listed.map((item) => {
      const enCoName = getCompanyName(item.tickerCode, item.name, true);
      const enSecName = getSectorName(item.sector, true);
      return {
        type: 'listed' as const,
        tickerCode: item.tickerCode,
        enTickerCode: item.tickerCode,
        name: item.name,
        enName: enCoName,
        shortName: item.shortName,
        enShortName: enCoName,
        badge: item.market,
        enBadge: `TSE ${item.market}`,
        subText: item.sector,
        enSubText: enSecName,
        price: item.currentPrice,
        changePct: item.priceChangePct,
        url: `/stocks/${item.tickerCode}`,
      };
    }),

    // 株主検索 (大株主名簿)
    ...shareholderMatches.map((item) => {
      const enCoName = getCompanyName(item.company.tickerCode, item.company.name, true);
      const enHolderName = getCompanyName('', item.shareholderName, true);
      return {
        type: 'shareholder' as const,
        tickerCode: item.company.tickerCode,
        enTickerCode: item.company.tickerCode,
        name: `${item.company.name} (大株主: ${item.shareholderName})`,
        enName: `${enCoName} (Shareholder: ${enHolderName})`,
        shortName: `${item.company.shortName} [保有比率 ${item.holdingRatio}%]`,
        enShortName: `${enCoName} [${item.holdingRatio}%]`,
        badge: '大株主',
        enBadge: 'Major Shareholder',
        subText: `株主: ${item.shareholderName} (順位 ${item.rank}位)`,
        enSubText: `Shareholder: ${enHolderName} (Rank #${item.rank})`,
        price: null,
        changePct: null,
        url: `/stocks/${item.company.tickerCode}`,
      };
    }),

    // 大量保有提出者逆引き
    ...largeHoldingMatches.map((item) => {
      const enCoName = getCompanyName(item.company.tickerCode, item.company.name, true);
      const enFilerName = getCompanyName('', item.filerName, true);
      return {
        type: 'shareholder' as const,
        tickerCode: item.company.tickerCode,
        enTickerCode: item.company.tickerCode,
        name: `${item.company.name} (大量保有: ${item.filerName})`,
        enName: `${enCoName} (5% Filer: ${enFilerName})`,
        shortName: `${item.company.shortName} [保有比率 ${item.holdingRatio}%]`,
        enShortName: `${enCoName} [${item.holdingRatio}%]`,
        badge: '大量保有5%',
        enBadge: '5% Filing',
        subText: `提出者: ${item.filerName} (${item.submitDate})`,
        enSubText: `Filer: ${enFilerName} (${item.submitDate})`,
        price: null,
        changePct: null,
        url: `/stocks/${item.company.tickerCode}`,
      };
    }),

    // 投資ファンド・VC
    ...matchingFunds.map((item) => ({
      type: 'fund' as const,
      tickerCode: 'ファンド',
      enTickerCode: 'Fund',
      name: item.name,
      enName: item.enName,
      shortName: item.shortName,
      enShortName: item.enShortName,
      badge: item.typeLabel,
      enBadge: item.enTypeLabel,
      subText: `代表: ${item.representative} / AUM: ${item.aumLabel}`,
      enSubText: `Leader: ${item.enRepresentative} / AUM: ${item.enAumLabel}`,
      price: null,
      changePct: null,
      url: `/funds/${item.slug}`,
    })),

    // J-REIT
    ...matchingReits.map((item) => {
      const enReitName = getCompanyName(item.tickerCode, item.name, true);
      return {
        type: 'reit' as const,
        tickerCode: item.tickerCode,
        enTickerCode: item.tickerCode,
        name: item.name,
        enName: enReitName,
        shortName: item.shortName,
        enShortName: enReitName,
        badge: '東証REIT',
        enBadge: 'TSE REIT',
        subText: `${item.categoryLabel} (スポンサー: ${item.sponsor})`,
        enSubText: `${item.categoryLabel} (Sponsor: ${item.sponsor})`,
        price: item.unitPrice,
        changePct: item.dividendYieldPct,
        url: `/reits/${item.tickerCode}`,
      };
    }),

    // 未上場企業
    ...unlisted.map((item) => {
      const enCoName = getCompanyName(item.slug, item.name, true);
      const enIndName = getSectorName(item.industry, true);
      return {
        type: 'unlisted' as const,
        tickerCode: '未上場',
        enTickerCode: 'Unlisted',
        name: item.name,
        enName: enCoName,
        shortName: item.shortName,
        enShortName: enCoName,
        badge: '官報決算',
        enBadge: 'Official Gazette',
        subText: item.industry,
        enSubText: enIndName,
        price: null,
        changePct: null,
        url: `/unlisted/${item.slug}`,
      };
    }),
  ];

  // 重複URLの除去
  const seenUrls = new Set<string>();
  const uniqueResults = formattedResults.filter((item) => {
    if (seenUrls.has(item.url)) return false;
    seenUrls.add(item.url);
    return true;
  });

  return NextResponse.json(uniqueResults);
}