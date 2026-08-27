import { prisma } from '@/lib/prisma';
import HomeClientView from '@/components/HomeClientView';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [companies, unlistedCompanies, recentGazettes] = await Promise.all([
    prisma.company.findMany({
      orderBy: { marketCap: 'desc' },
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
  ]);

  return (
    <HomeClientView
      companies={companies}
      unlistedCompanies={unlistedCompanies}
      recentGazettes={recentGazettes}
    />
  );
}