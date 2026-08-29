import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Executing Full Master Audit across all 3,903 companies for any remaining dummy/mock patterns...');

  const companies = await prisma.company.findMany();
  console.log(`Auditing ${companies.length} companies in SQLite database...`);

  const dummyRepPattern = /(代表取締役|社長|CEO|代表|堀健栄|山田|テスト)/;
  const dummyAddressPattern = /(日本橋|東京都千代田区1-1|テスト|ダミー)/;
  
  let suspiciousRepCount = 0;
  let defaultSalaryCount = 0; // 750万円などの固定デフォルト
  let defaultEmployeeCount = 0; // 650名などの固定デフォルト
  let missingSegmentsCount = 0;
  let dummySegmentsCount = 0;

  for (const c of companies) {
    // ① 代表者名のチェック
    if (c.representative === '堀健栄 (代表取締役社長)' || c.representative?.includes('テスト') || c.representative?.includes('ダミー')) {
      suspiciousRepCount++;
      console.log(`🚨 Suspicious Representative: [${c.tickerCode}] ${c.name} -> "${c.representative}"`);
    }

    // ② 平均年収のチェック (750.0万円固定になっているもの)
    if (c.avgSalary === 750.0 && c.avgAge === 38.8) {
      defaultSalaryCount++;
    }

    // ③ 従業員数のチェック (650名 (連結: 2,800名) 固定になっているもの)
    if (c.employeesCount === '650名 (連結: 2,800名)' || c.employeesCount === '650名') {
      defaultEmployeeCount++;
    }

    // ④ セグメント情報のチェック ("卸売業 主力事業" などの固定テンプレート)
    if (c.businessSegments?.includes('主力事業') && c.businessSegments?.includes('ソリューション')) {
      dummySegmentsCount++;
    }
  }

  console.log('====================================================');
  console.log('📊 AUDIT SCAN RESULTS:');
  console.log(`- Suspicious / Dummy Representatives: ${suspiciousRepCount}`);
  console.log(`- Default Salary / Age (750万/38.8歳): ${defaultSalaryCount}`);
  console.log(`- Default Employees (650名/2,800名): ${defaultEmployeeCount}`);
  console.log(`- Default Dummy Segments (主力75%/25%): ${dummySegmentsCount}`);
  console.log('====================================================');
}

main()
  .catch((e) => {
    console.error('Audit failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
