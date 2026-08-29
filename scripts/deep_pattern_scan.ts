import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Comprehensive scan for any remaining mock/repeating patterns in all 3,903 companies...');

  const companies = await prisma.company.findMany({
    select: {
      tickerCode: true,
      name: true,
      avgSalary: true,
      avgAge: true,
      employeesCount: true,
      headquarters: true,
      representative: true,
      establishedYear: true
    }
  });

  // ① 年収・年齢の重複パターン
  const salaryPatterns: { [key: string]: number } = {};
  // ② 本社所在地の重複パターン
  const hqPatterns: { [key: string]: number } = {};
  // ③ 従業員数の重複パターン
  const empPatterns: { [key: string]: number } = {};
  // ④ 設立年の重複パターン
  const estPatterns: { [key: string]: number } = {};

  for (const c of companies) {
    if (c.avgSalary !== null) {
      const k = `${c.avgSalary}万円 / ${c.avgAge}歳`;
      salaryPatterns[k] = (salaryPatterns[k] || 0) + 1;
    }
    if (c.headquarters) {
      hqPatterns[c.headquarters] = (hqPatterns[c.headquarters] || 0) + 1;
    }
    if (c.employeesCount) {
      empPatterns[c.employeesCount] = (empPatterns[c.employeesCount] || 0) + 1;
    }
    if (c.establishedYear) {
      estPatterns[c.establishedYear] = (estPatterns[c.establishedYear] || 0) + 1;
    }
  }

  console.log('\n--- 🚨 Suspicious Repeating Salary Patterns (count >= 5) ---');
  for (const [k, count] of Object.entries(salaryPatterns).filter(([_, c]) => c >= 5)) {
    console.log(`[${k}]: ${count} companies`);
  }

  console.log('\n--- 🚨 Suspicious Repeating Headquarters (count >= 5) ---');
  for (const [k, count] of Object.entries(hqPatterns).filter(([_, c]) => c >= 5)) {
    console.log(`[${k}]: ${count} companies`);
  }

  console.log('\n--- 🚨 Suspicious Repeating Employees Count (count >= 5) ---');
  for (const [k, count] of Object.entries(empPatterns).filter(([_, c]) => c >= 5)) {
    console.log(`[${k}]: ${count} companies`);
  }

  console.log('\n--- 🚨 Suspicious Repeating Established Years (count >= 20) ---');
  for (const [k, count] of Object.entries(estPatterns).filter(([_, c]) => c >= 20)) {
    console.log(`[${k}年]: ${count} companies`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
