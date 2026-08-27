import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseGazetteText } from '@/lib/gazette-parser';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      corporateNumber,
      companyName,
      shortName,
      industry,
      isStartup = true,
      representative,
      location,
      rawGazetteText,
      gazetteDate,
      gazetteIssue,
      fiscalPeriod,
      periodEnd,
    } = body;

    if (!corporateNumber || !companyName) {
      return NextResponse.json({ error: 'corporateNumber and companyName are required' }, { status: 400 });
    }

    const slug = companyName
      .toLowerCase()
      .replace(/[\s\(\)（）株式会社合同会社有限会社]/g, '-')
      .replace(/--+/g, '-')
      .replace(/^-|-$/g, '') || `unlisted-${corporateNumber}`;

    // 1. 会社レコードの作成または取得
    const company = await prisma.unlistedCompany.upsert({
      where: { corporateNumber },
      update: {
        name: companyName,
        shortName: shortName || companyName,
        industry: industry || '未分類',
        isStartup,
        representative,
        location,
      },
      create: {
        corporateNumber,
        slug,
        name: companyName,
        shortName: shortName || companyName,
        industry: industry || '未分類',
        isStartup,
        representative,
        location,
      },
    });

    // 2. 官報テキストのパースまたは直接入力値の適用
    let parsed: any = {};
    if (rawGazetteText) {
      parsed = parseGazetteText(rawGazetteText);
    }

    const totalAssets = body.totalAssets ?? parsed.totalAssets ?? 0;
    const netAssets = body.netAssets ?? parsed.netAssets ?? 0;
    const netIncome = body.netIncome ?? parsed.netIncome ?? 0;
    const capitalStock = body.capitalStock ?? parsed.capitalStock ?? 100;
    const retainedEarnings = body.retainedEarnings ?? parsed.retainedEarnings ?? 0;
    const totalLiabilities = body.totalLiabilities ?? parsed.totalLiabilities ?? (totalAssets - netAssets);

    const reportPeriod = fiscalPeriod ?? parsed.fiscalPeriod ?? 1;
    const reportPeriodEnd = periodEnd ?? parsed.periodEnd ?? new Date().toISOString().split('T')[0];

    const report = await prisma.officialGazetteReport.upsert({
      where: {
        unlistedCompanyId_fiscalPeriod: {
          unlistedCompanyId: company.id,
          fiscalPeriod: reportPeriod,
        },
      },
      update: {
        periodEnd: reportPeriodEnd,
        gazetteDate: gazetteDate || new Date().toISOString().split('T')[0],
        gazetteIssue: gazetteIssue || '号外',
        totalAssets,
        currentAssets: body.currentAssets ?? parsed.currentAssets,
        fixedAssets: body.fixedAssets ?? parsed.fixedAssets,
        totalLiabilities,
        currentLiabilities: body.currentLiabilities,
        fixedLiabilities: body.fixedLiabilities,
        netAssets,
        capitalStock,
        capitalSurplus: body.capitalSurplus,
        retainedEarnings,
        netIncome,
        rawGazetteText,
      },
      create: {
        unlistedCompanyId: company.id,
        fiscalPeriod: reportPeriod,
        periodEnd: reportPeriodEnd,
        gazetteDate: gazetteDate || new Date().toISOString().split('T')[0],
        gazetteIssue: gazetteIssue || '号外',
        totalAssets,
        currentAssets: body.currentAssets ?? parsed.currentAssets,
        fixedAssets: body.fixedAssets ?? parsed.fixedAssets,
        totalLiabilities,
        currentLiabilities: body.currentLiabilities,
        fixedLiabilities: body.fixedLiabilities,
        netAssets,
        capitalStock,
        capitalSurplus: body.capitalSurplus,
        retainedEarnings,
        netIncome,
        rawGazetteText,
      },
    });

    // 最新スナップショットの更新
    await prisma.unlistedCompany.update({
      where: { id: company.id },
      data: {
        latestPeriodEnd: reportPeriodEnd,
        latestNetAssets: netAssets,
        latestNetIncome: netIncome,
        latestTotalAssets: totalAssets,
      },
    });

    return NextResponse.json({ success: true, company, report });
  } catch (error: any) {
    console.error('Gazette import error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}