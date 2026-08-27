import { prisma } from '@/lib/prisma';
import HomeClientView from '@/components/HomeClientView';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [companies, unlistedCompanies, recentGazettes, totalListedCount, totalUnlistedCount] = await Promise.all([
    prisma.company.findMany({
      orderBy: { marketCap: 'desc' },
      take: 9,
    }),
    prisma.unlistedCompany.findMany({
      orderBy: { latestNetAssets: 'desc' },
      take: 12,
    }),
    prisma.officialGazetteReport.findMany({
      orderBy: { gazetteDate: 'desc' },
      take: 4,
      include: {
        company: {
          select: {
            slug: true,
            name: true,
            shortName: true,
            industry: true,
          },
        },
      },
    }),
    prisma.company.count(),
    prisma.unlistedCompany.count(),
  ]);

  return (
    <HomeClientView
      companies={companies}
      unlistedCompanies={unlistedCompanies}
      recentGazettes={recentGazettes}
      totalListedCount={totalListedCount}
      totalUnlistedCount={totalUnlistedCount}
    />
  );
}