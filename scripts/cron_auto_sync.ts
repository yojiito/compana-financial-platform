import { executeAutoSyncPipeline } from '../lib/auto-sync-engine';
import { prisma } from '../lib/prisma';

async function main() {
  console.log('====================================================');
  console.log('🔄 compana 全社最新データ定期同期バッチタスク 起動');
  console.log('====================================================\n');

  const startTime = Date.now();

  const result = await executeAutoSyncPipeline({
    batchSize: 0, // 全社対象
    updateStockPrices: true,
    updateFinancials: true,
    updateDisclosures: true,
    updateUnlisted: true
  });

  console.log('\n--- 実行結果サマリー ---');
  console.log(`ステータス: ${result.status === 'SUCCESS' ? '✅ 成功 (SUCCESS)' : '❌ エラー (ERROR)'}`);
  console.log(`対象企業数: ${result.totalCompaniesProcessed.toLocaleString()} 社`);
  console.log(`更新/同期企業数: ${result.updatedCompaniesCount.toLocaleString()} 社`);
  console.log(`最新2025決算検証: ${result.financialsChecked.toLocaleString()} 社`);
  console.log(`未上場官報同期: ${result.unlistedSynced.toLocaleString()} 社`);
  console.log(`所要時間: ${(result.durationMs / 1000).toFixed(2)} 秒`);

  console.log('\n--- 実行ログ詳細 ---');
  result.logs.forEach(log => console.log(log));
  console.log('====================================================\n');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
