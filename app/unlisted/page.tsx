import { prisma } from '@/lib/prisma';
import UnlistedSectorExplorer from '@/components/UnlistedSectorExplorer';

export const dynamic = 'force-dynamic';

export default async function UnlistedHubPage() {
  const companies = await prisma.unlistedCompany.findMany({
    orderBy: { latestNetAssets: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
      <UnlistedSectorExplorer companies={companies} />
    </div>
  );
}