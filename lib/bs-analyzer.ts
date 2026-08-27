/**
 * 企業財務・貸借対照表 (BS) 自動診断エンジン
 * 
 * 単位: 百万円 (100百万円 = 1億円, 1,000,000百万円 = 1兆円)
 */

export interface BsAnalysisResult {
  status: 'critical' | 'warning' | 'healthy' | 'stellar';
  badgeText: string;
  badgeColor: string;
  headline: string;
  comment: string;
  keyPoints: string[];
  isInsolvency: boolean;
}

// 単位ヘルパー (百万円 → 億円 / 兆円)
const formatMillionToOku = (val: number): string => {
  const oku = val / 100;
  if (Math.abs(oku) >= 10000) {
    return `${(oku / 10000).toFixed(2)}兆円`;
  }
  return `${oku.toFixed(1)}億円`;
};

/**
 * 未上場企業・官報決算公告のBS分析
 */
export function analyzeUnlistedGazetteBs(params: {
  companyName: string;
  isStartup: boolean;
  totalAssets: number;
  totalLiabilities: number;
  netAssets: number;
  capitalStock: number;
  capitalSurplus?: number | null;
  retainedEarnings: number;
  netIncome: number;
}): BsAnalysisResult {
  const { totalAssets, netAssets, capitalSurplus, retainedEarnings, netIncome, isStartup } = params;

  // 1. 債務超過判定 (純資産が0未満)
  if (netAssets < 0) {
    return {
      status: 'critical',
      badgeText: '🚨 債務超過 (要警戒)',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      headline: '純資産がマイナスの債務超過状態です',
      comment: `総資産（${formatMillionToOku(totalAssets)}）を上回る負債を抱えており、累積損失により資本が底をついています。事業継続には速やかな追加増資（エクイティ調達）または抜本的な収益改善・コスト削減が不可欠な状況です。`,
      keyPoints: [
        '純資産がマイナス（債務超過）',
        `累積損失（利益剰余金）: ${formatMillionToOku(retainedEarnings)}`,
        '早期のエクイティ調達または事業再生支援が必要',
      ],
      isInsolvency: true,
    };
  }

  const equityRatio = totalAssets > 0 ? (netAssets / totalAssets) * 100 : 0;
  const surplus = capitalSurplus ?? 0;

  // 2. スタートアップの先行投資型（高資本剰余金 ＋ 累積赤字）
  if (isStartup && surplus > 0 && retainedEarnings < 0) {
    const isFunded = netAssets > totalAssets * 0.4;

    if (isFunded) {
      return {
        status: 'healthy',
        badgeText: '🚀 先行投資型 (資本基盤十分)',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
        headline: '豊富な調達資本を背景にした計画的先行投資フェーズ',
        comment: `VC等からの積極的なエクイティ調達（資本剰余金: ${formatMillionToOku(surplus)}）により、自己資本比率${equityRatio.toFixed(1)}%と高い財務余力を維持しています。当期純損失（${formatMillionToOku(Math.abs(netIncome))}）はプロダクト開発やシェア拡大のための計画投資であり、ランウェイ（資金余力）は十分に確保されています。`,
        keyPoints: [
          `自己資本比率 ${equityRatio.toFixed(1)}% (財務体力は健全)`,
          `累積調達資本（資本剰余金）: ${formatMillionToOku(surplus)}`,
          netIncome < 0 ? 'シェア獲得優先の先行投資赤字' : '黒字化を達成',
        ],
        isInsolvency: false,
      };
    } else {
      return {
        status: 'warning',
        badgeText: '⚠️ 資本消費警戒 (追加調達期)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        headline: '累積赤字により純資産が目減り中、次回ラウンド検討期',
        comment: `これまでの調達資本に対し、累積損失（利益剰余金: ${formatMillionToOku(retainedEarnings)}）の割合が高まっており、自己資本比率は${equityRatio.toFixed(1)}%まで低下しています。債務超過には至っていないものの、次の資金調達ラウンド（Series B/C等）や収益性改善への舵切りが重要な局面です。`,
        keyPoints: [
          `自己資本比率 ${equityRatio.toFixed(1)}% (低下傾向)`,
          '累積赤字による資本の消費スピードに注視',
          '次回資金調達またはユニットエコノミクス改善が必要',
        ],
        isInsolvency: false,
      };
    }
  }

  // 3. 一般企業 / 非上場大手：鉄壁の自己資本 (70%以上)
  if (equityRatio >= 70) {
    return {
      status: 'stellar',
      badgeText: '🛡️ 鉄壁の超健全財務',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      headline: '無借金・高自己資本比率を誇る極めて安全な財務構造',
      comment: `自己資本比率${equityRatio.toFixed(1)}%という極めて強固なBSを構築しています。負債依存度が極めて低く、累積利益（利益剰余金: ${formatMillionToOku(retainedEarnings)}）も潤沢に蓄積されており、不況耐性・資金繰り安定性は最高水準です。`,
      keyPoints: [
        `自己資本比率 ${equityRatio.toFixed(1)}% (業界最高水準)`,
        '実質無借金または負債極小',
        '長期的な投資やM&Aにも耐えうる潤沢な内部留保',
      ],
      isInsolvency: false,
    };
  }

  // 4. 一般企業：健全 (40%〜70%)
  if (equityRatio >= 40) {
    return {
      status: 'healthy',
      badgeText: '✅ 健全な財務体質',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      headline: '適度なレバレッジと安定した自己資本バランス',
      comment: `自己資本比率${equityRatio.toFixed(1)}%を維持しており、健全な財務バランスです。営業活動から得られる利益剰余金（${formatMillionToOku(retainedEarnings)}）がしっかりと蓄積されており、企業信用力として安心感があります。`,
      keyPoints: [
        `自己資本比率 ${equityRatio.toFixed(1)}% (良好)`,
        `利益剰余金: ${formatMillionToOku(retainedEarnings)} の黒字蓄積`,
        '財務レバレッジと安全性のバランスが良好',
      ],
      isInsolvency: false,
    };
  }

  // 5. 一般企業：要注視 (0%〜40%)
  return {
    status: 'warning',
    badgeText: '⚠️ 負債依存度高め (レバレッジ型)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    headline: '借入金・負債比率が高く、金利上昇や景気変動に注意',
    comment: `自己資本比率が${equityRatio.toFixed(1)}%と低めで、外部負債への依存度が高い財務構造です。積極的なレバレッジ経営を行っているか、過去の損失により純資産が圧縮されています。キャッシュフロー管理と有利子負債削減が鍵となります。`,
    keyPoints: [
      `自己資本比率 ${equityRatio.toFixed(1)}% (低め)`,
      '負債比率が高いため金利・返済負担に注視',
      '営業キャッシュフローの継続的な創出が必要',
    ],
    isInsolvency: false,
  };
}

/**
 * 上場企業のBS分析 (単位: 百万円)
 */
export function analyzeListedBs(params: {
  companyName: string;
  equityRatio: number | null;
  interestBearingDebt: number | null;
  netAssets: number | null;
  totalAssets: number | null;
  freeCF: number | null;
  operatingIncome: number | null;
}): BsAnalysisResult {
  const { equityRatio, interestBearingDebt, netAssets } = params;

  const eq = equityRatio ?? 0;
  const debt = interestBearingDebt ?? 0;
  const na = netAssets ?? 1;

  if (eq < 0) {
    return {
      status: 'critical',
      badgeText: '🚨 債務超過',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      headline: '上場廃止猶予期間にも関わる深刻な債務超過状態',
      comment: '純資産がマイナスに転落しており、早期の増資や債務免除・事業再生が必要です。',
      keyPoints: ['純資産がマイナス', '上場廃止基準に抵触するリスク'],
      isInsolvency: true,
    };
  }

  if (eq >= 70 && debt === 0) {
    return {
      status: 'stellar',
      badgeText: '💎 超キャッシュリッチ・実質無借金',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      headline: '有利子負債ゼロ・圧倒的な自己資本を誇る鉄壁の財務',
      comment: `自己資本比率${eq}%を誇り、有利子負債は実質ゼロです。本業からの営業キャッシュフローとフリーCFが潤沢であり、倒産リスクが極めて低く、株主還元や大型成長投資の余力も十分です。`,
      keyPoints: [
        `自己資本比率 ${eq}% (鉄壁水準)`,
        '実質無借金経営 (有利子負債 0円)',
        '強固なバランスシートによる高い不況耐性',
      ],
      isInsolvency: false,
    };
  }

  if (eq >= 40) {
    const deRatio = ((debt / na) * 100).toFixed(1);
    return {
      status: 'healthy',
      badgeText: '🛡️ 健全なバランスシート',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
      headline: '安定した自己資本と適正な負債コントロール',
      comment: `自己資本比率${eq}%、D/Eレシオ（有利子負債倍率）${deRatio}%と、安全性と資本効率のバランスが取れた優良なBSです。`,
      keyPoints: [
        `自己資本比率 ${eq}% (製造業・プライム標準をクリア)`,
        `D/Eレシオ ${deRatio}% (安全圏内)`,
      ],
      isInsolvency: false,
    };
  }

  return {
    status: 'warning',
    badgeText: '📊 レバレッジ活用型 (金融・投資主導)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    headline: '借入・社債を活用した積極拡大フェーズ',
    comment: `自己資本比率${eq}%と負債比率が高めのレバレッジ構造です。投資収益率（ROIC/ROE）が調達コスト（金利）を上回っているかが評価の重要ポイントとなります。`,
    keyPoints: [
      `自己資本比率 ${eq}%`,
      '借入金・社債の返済期日と利払い負担に留意',
    ],
    isInsolvency: false,
  };
}