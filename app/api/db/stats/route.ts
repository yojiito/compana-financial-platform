import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [
      companiesCount,
      financialsCount,
      shareholdersCount,
      unlistedCount,
      gazetteCount,
      reitsCount,
      propertiesCount,
      maDealsCount,
      timelineEventsCount,
      fundsCount,
      fundHoldingsCount,
    ] = await Promise.all([
      prisma.company.count(),
      prisma.financialReport.count(),
      prisma.majorShareholder.count(),
      prisma.unlistedCompany.count(),
      prisma.officialGazetteReport.count(),
      prisma.reit.count(),
      prisma.reitProperty.count(),
      prisma.maDeal.count(),
      prisma.maTimelineEvent.count(),
      prisma.fund.count(),
      prisma.fundHolding.count(),
    ]);

    return NextResponse.json({
      status: 'healthy',
      database: process.env.DATABASE_URL?.startsWith('postgres') ? 'PostgreSQL (Supabase/Neon)' : 'SQLite (Local)',
      counts: {
        listedCompanies: companiesCount,
        financialReports: financialsCount,
        majorShareholders: shareholdersCount,
        unlistedCompanies: unlistedCount,
        officialGazetteReports: gazetteCount,
        reits: reitsCount,
        reitProperties: propertiesCount,
        maDeals: maDealsCount,
        maTimelineEvents: timelineEventsCount,
        investorFunds: fundsCount,
        fundHoldings: fundHoldingsCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}