import { PrismaClient } from '@prisma/client';
import { REIT_LIST } from '../lib/reits-data';
import { MA_DEALS_DATABASE } from '../lib/ma-deals-data';
import { INVESTOR_FUNDS_DATA } from '../lib/investor-funds-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Running Integrated Master Seeding Pipeline...');

  // 1. J-REIT ＆ 物件ポートフォリオ (J-REITs & Properties)
  console.log(`📦 Seeding ${REIT_LIST.length} J-REITs...`);
  for (const reit of REIT_LIST) {
    await prisma.reit.upsert({
      where: { code: reit.tickerCode },
      update: {
        name: reit.name,
        englishName: reit.shortName,
        sponsor: reit.sponsor,
        type: reit.categoryLabel,
        price: reit.unitPrice,
        priceChange: reit.priceChange,
        priceChangePct: reit.priceChangePct,
        distributionYield: reit.dividendYieldPct,
        navMultiplier: reit.navMultiplier,
        propertiesCount: reit.properties ? reit.properties.length : 0,
        occupancyRate: reit.properties && reit.properties.length > 0 ? reit.properties[0].occupancyRate : 97.0,
        ltv: reit.financials?.ltvRatio || 40.0,
        description: reit.overview,
      },
      create: {
        code: reit.tickerCode,
        name: reit.name,
        englishName: reit.shortName,
        sponsor: reit.sponsor,
        type: reit.categoryLabel,
        price: reit.unitPrice,
        priceChange: reit.priceChange,
        priceChangePct: reit.priceChangePct,
        distributionYield: reit.dividendYieldPct,
        navMultiplier: reit.navMultiplier,
        propertiesCount: reit.properties ? reit.properties.length : 0,
        occupancyRate: reit.properties && reit.properties.length > 0 ? reit.properties[0].occupancyRate : 97.0,
        ltv: reit.financials?.ltvRatio || 40.0,
        description: reit.overview,
      },
    });
  }

  // 4,000件の保有物件を一括投入
  console.log(`📦 Bulk Seeding all REIT Properties...`);
  await prisma.reitProperty.deleteMany({});
  
  const allPropertyRecords: any[] = [];
  for (const reit of REIT_LIST) {
    if (reit.properties && reit.properties.length > 0) {
      for (const prop of reit.properties) {
        const appraisalOku = prop.appraisalValueMillion ? prop.appraisalValueMillion / 100 : 0;
        const unrealizedOku = prop.unrealizedGainMillion ? prop.unrealizedGainMillion / 100 : 0;
        
        allPropertyRecords.push({
          reitCode: reit.tickerCode,
          propertyId: prop.id,
          name: prop.name,
          englishName: prop.name,
          category: prop.category,
          categoryLabel: prop.categoryLabel,
          location: prop.location,
          areaRegion: prop.areaRegion,
          ownershipRatio: prop.ownershipRatio,
          ownershipForm: prop.ownershipForm,
          acquisitionDate: prop.acquisitionDate,
          acquisitionPriceMillion: prop.acquisitionPriceMillion,
          appraisalValueOku: appraisalOku,
          appraisalValueMillion: prop.appraisalValueMillion,
          unrealizedGainOku: unrealizedOku,
          unrealizedGainMillion: prop.unrealizedGainMillion,
          unrealizedGainRatio: prop.unrealizedGainRatio,
          floorArea: `${prop.totalFloorAreaSqm} ㎡`,
          floorAreaSqm: prop.totalFloorAreaSqm,
          landAreaSqm: prop.landAreaSqm,
          occupancyRate: prop.occupancyRate,
          tenantsCount: prop.tenantsCount,
          builtDate: prop.completionDate,
          structure: prop.structure,
          keyTenant: prop.keyTenant,
          noiYield: prop.noiYieldPct,
          seller: prop.seller,
        });
      }
    }
  }

  // 1000件ずつチャンク分割してBulk Insert
  const chunkSize = 1000;
  for (let i = 0; i < allPropertyRecords.length; i += chunkSize) {
    const chunk = allPropertyRecords.slice(i, i + chunkSize);
    await prisma.reitProperty.createMany({
      data: chunk,
    });
  }
  console.log(`✅ Successfully seeded ${allPropertyRecords.length} properties across 50 REITs!`);

  // 2. M&A ＆ 買収・資本提携ディール (17ディール)
  console.log(`📦 Seeding ${MA_DEALS_DATABASE.length} M&A Deals...`);
  for (const deal of MA_DEALS_DATABASE) {
    await prisma.maDeal.upsert({
      where: { id: deal.id },
      update: {
        announceYear: deal.announceYear,
        closeDate: deal.closeDate,
        exactAnnounceDate: deal.exactAnnounceDate,
        exactCloseDate: deal.exactCloseDate,
        buyerName: deal.buyerName,
        buyerEnName: deal.buyerEnName,
        buyerCode: deal.buyerCode,
        buyerSector: deal.buyerSector,
        buyerEnSector: deal.buyerEnSector,
        targetName: deal.targetName,
        targetEnName: deal.targetEnName,
        targetCountry: deal.targetCountry,
        targetEnCountry: deal.targetEnCountry,
        targetSector: deal.targetSector,
        targetEnSector: deal.targetEnSector,
        dealValueOku: deal.dealValueOku,
        dealValueUsdBillion: deal.dealValueUsdBillion,
        scheme: deal.scheme,
        schemeLabel: deal.schemeLabel,
        enSchemeLabel: deal.enSchemeLabel,
        dealType: deal.dealType,
        dealTypeLabel: deal.dealTypeLabel,
        enDealTypeLabel: deal.enDealTypeLabel,
        goodwillOku: deal.goodwillOku,
        premiumPct: deal.premiumPct,
        stakeBefore: deal.stakeBefore,
        stakeAfter: deal.stakeAfter,
        considerationDetails: deal.considerationDetails,
        enConsiderationDetails: deal.enConsiderationDetails,
        financingMethod: deal.financingMethod,
        enFinancingMethod: deal.enFinancingMethod,
        evEbitdaMultiple: deal.valuationMultiples?.evEbitda,
        perMultiple: deal.valuationMultiples?.per,
        pbrMultiple: deal.valuationMultiples?.pbr,
        officialFilingNumber: deal.officialFilingNumber,
        buyerFA: deal.advisors?.buyerFA,
        targetFA: deal.advisors?.targetFA,
        buyerLegal: deal.advisors?.buyerLegal,
        targetLegal: deal.advisors?.targetLegal,
        strategicObjective: deal.strategicObjective,
        enStrategicObjective: deal.enStrategicObjective,
        outcomeAndPmi: deal.outcomeAndPmi,
        enOutcomeAndPmi: deal.enOutcomeAndPmi,
        statusRating: deal.statusRating,
        statusRatingLabel: deal.statusRatingLabel,
        enStatusRatingLabel: deal.enStatusRatingLabel,
        officialSourceType: deal.officialSourceType,
        keyTags: deal.keyTags.join(','),
      },
      create: {
        id: deal.id,
        announceYear: deal.announceYear,
        closeDate: deal.closeDate,
        exactAnnounceDate: deal.exactAnnounceDate,
        exactCloseDate: deal.exactCloseDate,
        buyerName: deal.buyerName,
        buyerEnName: deal.buyerEnName,
        buyerCode: deal.buyerCode,
        buyerSector: deal.buyerSector,
        buyerEnSector: deal.buyerEnSector,
        targetName: deal.targetName,
        targetEnName: deal.targetEnName,
        targetCountry: deal.targetCountry,
        targetEnCountry: deal.targetEnCountry,
        targetSector: deal.targetSector,
        targetEnSector: deal.targetEnSector,
        dealValueOku: deal.dealValueOku,
        dealValueUsdBillion: deal.dealValueUsdBillion,
        scheme: deal.scheme,
        schemeLabel: deal.schemeLabel,
        enSchemeLabel: deal.enSchemeLabel,
        dealType: deal.dealType,
        dealTypeLabel: deal.dealTypeLabel,
        enDealTypeLabel: deal.enDealTypeLabel,
        goodwillOku: deal.goodwillOku,
        premiumPct: deal.premiumPct,
        stakeBefore: deal.stakeBefore,
        stakeAfter: deal.stakeAfter,
        considerationDetails: deal.considerationDetails,
        enConsiderationDetails: deal.enConsiderationDetails,
        financingMethod: deal.financingMethod,
        enFinancingMethod: deal.enFinancingMethod,
        evEbitdaMultiple: deal.valuationMultiples?.evEbitda,
        perMultiple: deal.valuationMultiples?.per,
        pbrMultiple: deal.valuationMultiples?.pbr,
        officialFilingNumber: deal.officialFilingNumber,
        buyerFA: deal.advisors?.buyerFA,
        targetFA: deal.advisors?.targetFA,
        buyerLegal: deal.advisors?.buyerLegal,
        targetLegal: deal.advisors?.targetLegal,
        strategicObjective: deal.strategicObjective,
        enStrategicObjective: deal.enStrategicObjective,
        outcomeAndPmi: deal.outcomeAndPmi,
        enOutcomeAndPmi: deal.enOutcomeAndPmi,
        statusRating: deal.statusRating,
        statusRatingLabel: deal.statusRatingLabel,
        enStatusRatingLabel: deal.enStatusRatingLabel,
        officialSourceType: deal.officialSourceType,
        keyTags: deal.keyTags.join(','),
      },
    });

    // タイムライン
    if (deal.timeline && deal.timeline.length > 0) {
      for (const evt of deal.timeline) {
        const existing = await prisma.maTimelineEvent.findFirst({
          where: { dealId: deal.id, date: evt.date, event: evt.event },
        });

        if (!existing) {
          await prisma.maTimelineEvent.create({
            data: {
              dealId: deal.id,
              date: evt.date,
              enDate: evt.enDate,
              event: evt.event,
              enEvent: evt.enEvent,
              eventType: evt.type,
            },
          });
        }
      }
    }
  }

  // 3. 投資ファンド ＆ 保有ポートフォリオ (Investor Funds & Portfolios)
  console.log(`📦 Seeding ${INVESTOR_FUNDS_DATA.length} Funds...`);
  for (const fund of INVESTOR_FUNDS_DATA) {
    await prisma.fund.upsert({
      where: { slug: fund.slug },
      update: {
        name: fund.name,
        englishName: fund.enName,
        type: fund.type,
        aum: fund.aumLabel,
        representative: fund.representative,
        strategySummary: fund.strategy,
        enStrategySummary: fund.enStrategy,
      },
      create: {
        slug: fund.slug,
        name: fund.name,
        englishName: fund.enName,
        type: fund.type,
        aum: fund.aumLabel,
        representative: fund.representative,
        strategySummary: fund.strategy,
        enStrategySummary: fund.enStrategy,
      },
    });

    if (fund.topHoldings && fund.topHoldings.length > 0) {
      for (const h of fund.topHoldings) {
        const code = h.tickerCode || h.unlistedSlug || 'UNKNOWN';
        const existing = await prisma.fundHolding.findFirst({
          where: { fundSlug: fund.slug, tickerCode: code },
        });

        if (existing) {
          await prisma.fundHolding.update({
            where: { id: existing.id },
            data: {
              companyName: h.targetName,
              holdingRatio: h.ownershipRatioPct,
              valueOku: h.estimatedValueBillion ? h.estimatedValueBillion * 10 : 0,
              statusNote: h.status,
            },
          });
        } else {
          await prisma.fundHolding.create({
            data: {
              fundSlug: fund.slug,
              tickerCode: code,
              companyName: h.targetName,
              holdingRatio: h.ownershipRatioPct,
              valueOku: h.estimatedValueBillion ? h.estimatedValueBillion * 10 : 0,
              statusNote: h.status,
            },
          });
        }
      }
    }
  }

  console.log('✅ Integrated Master Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });