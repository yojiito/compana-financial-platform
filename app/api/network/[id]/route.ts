import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { 
  NetworkGraphData, 
  NetworkNode, 
  NetworkEdge, 
  MASTER_RELATIONSHIP_DATA, 
  getSubGraphForEntity 
} from '@/lib/relationship-network-data';
import { UNLISTED_INVESTMENTS_DATA } from '@/lib/unlisted-investments-data';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rawId = decodeURIComponent(id);

    // 1. 静的マスターデータに該当が存在する場合、それをベースにしつつDBで拡張
    const staticGraph = getSubGraphForEntity(rawId, 2);
    const nodesMap = new Map<string, NetworkNode>();
    const edgesMap = new Map<string, NetworkEdge>();

    for (const n of staticGraph.nodes) nodesMap.set(n.id, n);
    for (const e of staticGraph.edges) edgesMap.set(e.id, e);

    // 2. 上場企業 (corp-[tickerCode]) の場合
    if (rawId.startsWith('corp-') || /^\d{4}[A-Z]?$/.test(rawId)) {
      const tickerCode = rawId.replace('corp-', '');
      const company = await prisma.company.findUnique({
        where: { tickerCode },
        include: {
          shareholders: {
            take: 10,
            orderBy: { rank: 'asc' }
          }
        }
      });

      if (company) {
        // 自社ノード
        const selfNodeId = `corp-${company.tickerCode}`;
        if (!nodesMap.has(selfNodeId)) {
          const capOku = company.marketCap ? Math.round(company.marketCap / 100000000) : 0;
          nodesMap.set(selfNodeId, {
            id: selfNodeId,
            label: company.name,
            type: 'listed_corp',
            subLabel: `東証${company.market || 'プライム'} ${company.tickerCode} / ${company.sector || '製造業'}`,
            description: company.description || `${company.name}（証券コード: ${company.tickerCode}）。時価総額約${capOku >= 10000 ? (capOku / 10000).toFixed(2) + '兆円' : capOku.toLocaleString() + '億円'}。`,
            linkUrl: `/stocks/${company.tickerCode}`,
            badge: `時価総額 ${capOku >= 10000 ? (capOku / 10000).toFixed(2) + '兆円' : capOku.toLocaleString() + '億円'}`,
            tags: [company.sector || '全産業', company.market || '東証']
          });
        }

        // 代表者・役員
        if (company.representative) {
          const personId = `person-${company.tickerCode}-rep`;
          if (!nodesMap.has(personId)) {
            nodesMap.set(personId, {
              id: personId,
              label: company.representative,
              type: 'person',
              subLabel: `代表取締役 / ${company.name}`,
              description: `${company.name} 代表取締役。経営の最高責任者として企業価値向上を推進。`,
              badge: '代表取締役',
              tags: ['経営陣', '代表取締役']
            });
          }
          const edgeId = `e-${personId}-${selfNodeId}`;
          if (!edgesMap.has(edgeId)) {
            edgesMap.set(edgeId, {
              id: edgeId,
              source: personId,
              target: selfNodeId,
              relationType: 'governance',
              label: '代表取締役',
              detail: `${company.representative}氏が${company.name}の代表取締役として経営を統括。`
            });
          }
        }

        // 大株主一覧 ＆ 資本系列
        for (const sh of company.shareholders) {
          const shName = sh.shareholderName.trim();
          const isTrust = shName.includes('信託銀行') || shName.includes('カストディ') || shName.includes('Trust');
          const isEmployee = shName.includes('持株会');
          const isAssetMgmt = shName.includes('資産管理') || shName.includes('事務所') || shName.includes('インターナショナル') || shName.includes('キャピタル');
          const isIndividual = !shName.includes('株式会社') && !shName.includes('信託') && !shName.includes('持株会') && !shName.includes('Bank') && !shName.includes('Trust') && !shName.includes('有限会社') && !shName.includes('合同会社');

          const shNodeId = isIndividual 
            ? `person-sh-${company.tickerCode}-${sh.rank}`
            : `corp-sh-${encodeURIComponent(shName.slice(0, 15))}`;

          if (!nodesMap.has(shNodeId)) {
            nodesMap.set(shNodeId, {
              id: shNodeId,
              label: shName,
              type: isIndividual ? 'person' : 'unlisted_corp',
              subLabel: isTrust ? '機関投資家・信託口' : isEmployee ? '従業員・役員持株会' : isAssetMgmt ? '創業家 資産管理会社' : isIndividual ? '大株主 / 創業者・個人' : '主要大株主・出資元法人',
              description: `${company.name}の大株主（第${sh.rank}位、持株比率: ${sh.holdingRatio}%、保有株数: ${(sh.sharesHeld || 0).toLocaleString()}株）。${sh.changeNote || ''}`,
              badge: `第${sh.rank}位大株主 (${sh.holdingRatio}%)`,
              tags: ['大株主', isIndividual ? '個人株主' : '法人株主']
            });
          }

          const edgeId = `e-${shNodeId}-${selfNodeId}`;
          if (!edgesMap.has(edgeId)) {
            edgesMap.set(edgeId, {
              id: edgeId,
              source: shNodeId,
              target: selfNodeId,
              relationType: isIndividual || isAssetMgmt ? 'governance' : 'capital',
              label: `第${sh.rank}位株主 (${sh.holdingRatio}%)`,
              ratio: sh.holdingRatio,
              detail: `${shName}が${company.name}株式の${sh.holdingRatio}%（${(sh.sharesHeld || 0).toLocaleString()}株）を保有。`
            });
          }
        }
      }
    }

    // 3. 未上場企業 (unlisted-[slug]) の場合
    if (rawId.startsWith('unlisted-')) {
      const slug = rawId.replace('unlisted-', '');
      const unlisted = await prisma.unlistedCompany.findUnique({
        where: { slug },
        include: {
          shareholders: true
        }
      });

      if (unlisted) {
        const selfNodeId = `unlisted-${unlisted.slug}`;
        if (!nodesMap.has(selfNodeId)) {
          nodesMap.set(selfNodeId, {
            id: selfNodeId,
            label: unlisted.name,
            type: 'unlisted_corp',
            subLabel: `未上場 / ${unlisted.industry}`,
            description: unlisted.description || `${unlisted.name}。非公開名門企業。`,
            linkUrl: `/unlisted/${unlisted.slug}`,
            badge: unlisted.capital ? `資本金 ${unlisted.capital}百万円` : '未上場',
            tags: [unlisted.industry, '未上場']
          });
        }

        // 代表者・役員
        if (unlisted.representative) {
          const personId = `person-unlisted-${slug}-rep`;
          if (!nodesMap.has(personId)) {
            nodesMap.set(personId, {
              id: personId,
              label: unlisted.representative,
              type: 'person',
              subLabel: `代表取締役 / ${unlisted.name}`,
              description: `${unlisted.name} 代表取締役。経営を統括。`,
              badge: '代表取締役',
              tags: ['経営陣', '代表取締役']
            });
          }
          const edgeId = `e-${personId}-${selfNodeId}`;
          if (!edgesMap.has(edgeId)) {
            edgesMap.set(edgeId, {
              id: edgeId,
              source: personId,
              target: selfNodeId,
              relationType: 'governance',
              label: '代表取締役',
              detail: `${unlisted.representative}氏が${unlisted.name}の代表取締役として経営を統括。`
            });
          }
        }

        // 未上場企業の出資先ポートフォリオ
        const holdings = UNLISTED_INVESTMENTS_DATA[slug] || [];
        for (const h of holdings) {
          const targetNodeId = h.tickerCode ? `corp-${h.tickerCode}` : `unlisted-${h.id}`;
          if (!nodesMap.has(targetNodeId)) {
            nodesMap.set(targetNodeId, {
              id: targetNodeId,
              label: h.targetName,
              type: h.tickerCode ? 'listed_corp' : 'unlisted_corp',
              subLabel: h.categoryLabel,
              description: h.strategicSynergy || h.purpose,
              linkUrl: h.tickerCode ? `/stocks/${h.tickerCode}` : undefined,
              badge: h.holdingRatioPct ? `出資比率 ${h.holdingRatioPct}%` : '戦略出資先',
              tags: ['出資先', '資本提携']
            });
          }

          const edgeId = `e-${selfNodeId}-${targetNodeId}`;
          if (!edgesMap.has(edgeId)) {
            edgesMap.set(edgeId, {
              id: edgeId,
              source: selfNodeId,
              target: targetNodeId,
              relationType: 'capital',
              label: h.categoryLabel.slice(0, 14),
              ratio: h.holdingRatioPct,
              detail: h.purpose
            });
          }
        }
      }
    }

    const result: NetworkGraphData = {
      nodes: Array.from(nodesMap.values()),
      edges: Array.from(edgesMap.values())
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating network graph:', error);
    return NextResponse.json(
      { error: 'Failed to generate network data' },
      { status: 500 }
    );
  }
}
