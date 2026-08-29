import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Inspecting avgSalary and financial metrics in Company table...');

  const topCapCompanies = await prisma.company.findMany({
    take: 30,
    orderBy: { marketCap: 'desc' },
    select: {
      tickerCode: true,
      name: true,
      avgSalary: true,
      avgAge: true,
      employeesCount: true,
      marketCap: true,
    }
  });

  console.log('Top 30 Market Cap Companies Salary Data:');
  console.table(topCapCompanies.map(c => ({
    code: c.tickerCode,
    name: c.name.slice(0, 12),
    avgSalary: c.avgSalary,
    avgAge: c.avgAge,
    employees: c.employeesCount
  })));

  const topSalaryCompanies = await prisma.company.findMany({
    where: { avgSalary: { not: null } },
    take: 30,
    orderBy: { avgSalary: 'desc' },
    select: {
      tickerCode: true,
      name: true,
      avgSalary: true,
      avgAge: true,
      employeesCount: true,
    }
  });

  console.log('Top 30 Recorded Avg Salaries in DB:');
  console.table(topSalaryCompanies.map(c => ({
    code: c.tickerCode,
    name: c.name.slice(0, 12),
    avgSalary: c.avgSalary,
    avgAge: c.avgAge
  })));

  const nonNullSalaryCount = await prisma.company.count({
    where: { avgSalary: { not: null } }
  });
  const totalCount = await prisma.company.count();

  console.log(`Total companies with non-null salary: ${nonNullSalaryCount} / ${totalCount}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
