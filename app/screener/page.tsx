import { prisma } from '@/lib/prisma';
import ScreenerClient from '@/components/ScreenerClient';

export const dynamic = 'force-dynamic';

export default async function ScreenerPage() {
  const companies = await prisma.company.findMany({
    orderBy: { marketCap: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <ScreenerClient initialCompanies={companies} />
    </div>
  );
}