/**
 * EDINET API v2 連携バッチスクリプト
 * 
 * 使い方:
 *   npx tsx scripts/sync_edinet.ts [YYYY-MM-DD]
 * 
 * 概要:
 *   金融庁 EDINET API から指定日（または本日）に提出された
 *   有価証券報告書・四半期報告書・大量保有報告書を取得し、DBに登録します。
 */

import { prisma } from '../lib/prisma';
import { edinet, EdinetDocumentItem } from '../lib/edinet-client';

async function syncEdinetForDate(targetDate: string) {
  console.log(`[EDINET Sync] Fetching disclosures for date: ${targetDate}`);
  
  const response = await edinet.getDocumentList(targetDate);
  if (!response || !response.results) {
    console.log('[EDINET Sync] No documents found or API key not configured.');
    return;
  }

  console.log(`[EDINET Sync] Retrieved ${response.results.length} total documents from FSA.`);

  let savedCount = 0;

  for (const doc of response.results) {
    if (!doc.secCode) continue;
    const tickerCode = doc.secCode.substring(0, 4);

    const company = await prisma.company.findUnique({
      where: { tickerCode },
    });

    if (company) {
      console.log(`  -> Matching company found: ${company.name} (${tickerCode}) - [${doc.docDescription}]`);

      await prisma.disclosureDocument.create({
        data: {
          docId: doc.docID,
          tickerCode: company.tickerCode,
          discloseAt: doc.submitDateTime,
          docType: getFriendlyDocType(doc.docTypeCode, doc.docDescription),
          title: doc.docDescription,
          url: edinet.getDocumentDownloadUrl(doc.docID, 2),
        },
      });

      if (doc.docDescription.includes('大量保有報告書') || doc.docDescription.includes('変更報告書')) {
        await prisma.largeHoldingReport.create({
          data: {
            docId: doc.docID,
            tickerCode: company.tickerCode,
            submitDate: doc.submitDateTime.split(' ')[0],
            filerName: doc.filerName,
            holdingRatio: 5.0,
            purpose: '提出書類参照',
          },
        });
      }

      savedCount++;
    }
  }

  console.log(`[EDINET Sync] Successfully synced ${savedCount} documents to database.`);
}

function getFriendlyDocType(typeCode: string, description: string): string {
  if (description.includes('有価証券報告書')) return '有価証券報告書';
  if (description.includes('四半期報告書')) return '四半期報告書';
  if (description.includes('決算短信')) return '決算短信';
  if (description.includes('大量保有報告書') || description.includes('変更報告書')) return '大量保有報告書';
  if (description.includes('適時開示')) return '適時開示';
  return '開示書類';
}

const dateArg = process.argv[2] || new Date().toISOString().split('T')[0];
syncEdinetForDate(dateArg)
  .catch(console.error)
  .finally(() => prisma.$disconnect());