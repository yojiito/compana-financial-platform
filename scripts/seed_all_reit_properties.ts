import { PrismaClient } from '@prisma/client';
import { REITS_DATA } from '../lib/reits-data';

const prisma = new PrismaClient();

async function main() {
  console.log(`🚀 Seeding and Synchronizing All ${REITS_DATA.length} J-REITs and Complete Property Portfolios...`);

  let totalReits = 0;
  let totalProperties = 0;

  for (const r of REITS_DATA) {
    // 1. Reit 本体
    const reit = await prisma.reit.upsert({
      where: { code: r.tickerCode },
      create: {
        code: r.tickerCode,
        name: r.name,
        englishName: r.shortName || r.name,
        sponsor: r.sponsor,
        sponsorRatio: 40.0,
        type: r.categoryLabel || '総合型',
        price: r.unitPrice,
        priceChange: r.priceChange,
        priceChangePct: r.priceChangePct,
        distributionYield: r.dividendYieldPct,
        navMultiplier: r.navMultiplier,
        propertiesCount: r.properties.length,
        occupancyRate: r.financials.averageOccupancyRate || 98.5,
        ltv: r.financials.ltvRatio || 42.0,
        description: r.overview || `${r.name}。J-REIT上場投資法人。`
      },
      update: {
        name: r.name,
        englishName: r.shortName || r.name,
        sponsor: r.sponsor,
        price: r.unitPrice,
        priceChange: r.priceChange,
        priceChangePct: r.priceChangePct,
        distributionYield: r.dividendYieldPct,
        navMultiplier: r.navMultiplier,
        propertiesCount: r.properties.length,
        occupancyRate: r.financials.averageOccupancyRate || 98.5,
        ltv: r.financials.ltvRatio || 42.0,
        description: r.overview || `${r.name}。J-REIT上場投資法人。`
      }
    });

    totalReits++;

    // 2. 既存プロパティを削除して最新完全セットを再投入
    await prisma.reitProperty.deleteMany({
      where: { reitCode: r.tickerCode }
    });

    for (const p of r.properties) {
      await prisma.reitProperty.create({
        data: {
          reitCode: r.tickerCode,
          propertyId: p.id,
          name: p.name,
          category: p.category,
          categoryLabel: p.categoryLabel,
          location: p.location,
          areaRegion: p.areaRegion,
          ownershipRatio: p.ownershipRatio,
          ownershipForm: p.ownershipForm,
          acquisitionDate: p.acquisitionDate,
          acquisitionPriceMillion: p.acquisitionPriceMillion,
          appraisalValueOku: Math.round(p.appraisalValueMillion / 100),
          appraisalValueMillion: p.appraisalValueMillion,
          unrealizedGainOku: Math.round(p.unrealizedGainMillion / 100),
          unrealizedGainMillion: p.unrealizedGainMillion,
          unrealizedGainRatio: p.unrealizedGainRatio,
          floorArea: p.totalFloorAreaSqm ? `${p.totalFloorAreaSqm.toLocaleString()}㎡` : undefined,
          floorAreaSqm: p.totalFloorAreaSqm,
          landAreaSqm: p.landAreaSqm,
          occupancyRate: p.occupancyRate,
          tenantsCount: p.tenantsCount,
          builtDate: p.completionDate,
          structure: p.structure,
          keyTenant: p.keyTenant,
          noiYield: p.noiYieldPct,
          seller: p.seller
        }
      });
      totalProperties++;
    }
  }

  console.log(`✅ Completed: Synchronized ${totalReits} J-REITs and ${totalProperties} Complete Property Portfolios!`);
}

main()
  .catch((e) => {
    console.error('Error seeding REIT properties:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
