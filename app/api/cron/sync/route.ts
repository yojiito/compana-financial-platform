import { NextRequest, NextResponse } from 'next/server';
import { executeAutoSyncPipeline, SyncOptions } from '@/lib/auto-sync-engine';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');
    const secret = process.env.CRON_SECRET || 'compana-sync-secret-2026';

    // 認証チェック (ローカル環境 or 認証キー一致)
    const isDev = process.env.NODE_ENV !== 'production';
    const authHeader = request.headers.get('authorization');
    const isAuthorized = 
      isDev || 
      key === secret || 
      authHeader === `Bearer ${secret}`;

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid Cron Secret Key' },
        { status: 401 }
      );
    }

    const batchSize = parseInt(searchParams.get('batchSize') || '500', 10);
    const targetSector = searchParams.get('sector') || undefined;

    const result = await executeAutoSyncPipeline({
      batchSize,
      targetSector,
      updateStockPrices: true,
      updateFinancials: true,
      updateDisclosures: true,
      updateUnlisted: true
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Cron sync failed:', error);
    return NextResponse.json(
      { error: error.message || 'Auto-sync pipeline execution failed' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    let body: SyncOptions = {};
    try {
      body = await request.json();
    } catch (e) {
      // 空のbodyでも許可
    }

    const result = await executeAutoSyncPipeline(body);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Manual trigger sync failed:', error);
    return NextResponse.json(
      { error: error.message || 'Sync failed' },
      { status: 500 }
    );
  }
}
