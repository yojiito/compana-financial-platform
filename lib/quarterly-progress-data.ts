export interface QuarterlyDataPoint {
  quarter: string; // "2025 1Q", "2026 1Q" 等
  revenueBillion: number; // 四半期売上高 (億円)
  operatingIncomeBillion: number; // 四半期営業利益 (億円)
  netIncomeBillion: number; // 四半期純利益 (億円)
}

export interface CompanyQuarterlyProgress {
  tickerCode: string;
  companyName: string;
  fiscalYear: string; // "2026年3月期"
  latestQuarter: '1Q' | '2Q' | '3Q' | '4Q'; // 現在の最新開示四半期
  announcementDate: string; // "2026年8月上旬"
  
  // 通期会社予想 (億円)
  fullYearForecast: {
    revenueBillion: number;
    operatingIncomeBillion: number;
    ordinaryIncomeBillion: number;
    netIncomeBillion: number;
  };
  
  // 累計実績 (億円)
  cumulativeActual: {
    revenueBillion: number;
    operatingIncomeBillion: number;
    ordinaryIncomeBillion: number;
    netIncomeBillion: number;
  };
  
  // 進捗率 (%)
  progressRate: {
    revenuePct: number;
    operatingIncomePct: number;
    ordinaryIncomePct: number;
    netIncomePct: number;
  };
  
  // 過去3年平均の同一四半期進捗率 (%)
  historicalAverageProgress: {
    revenuePct: number;
    operatingIncomePct: number;
    netIncomePct: number;
  };
  
  // 判定シグナル
  signal: 'strong_upgrade' | 'steady' | 'caution' | 'downward_risk';
  signalReason: string;
  
  // 四半期ごとの推移 (過去4〜8四半期)
  quarterlyBreakdown: QuarterlyDataPoint[];
}

export const QUARTERLY_PROGRESS_DATA: { [ticker: string]: CompanyQuarterlyProgress } = {
  // ① トヨタ自動車 (7203) - 2026年度 1Q (最新)
  '7203': {
    tickerCode: '7203',
    companyName: 'トヨタ自動車株式会社',
    fiscalYear: '2026年3月期',
    latestQuarter: '1Q',
    announcementDate: '2026年8月1日',
    fullYearForecast: {
      revenueBillion: 460000,
      operatingIncomeBillion: 43000,
      ordinaryIncomeBillion: 48000,
      netIncomeBillion: 35700
    },
    cumulativeActual: {
      revenueBillion: 122000,
      operatingIncomeBillion: 12500,
      ordinaryIncomeBillion: 14200,
      netIncomeBillion: 11800
    },
    progressRate: {
      revenuePct: 26.5,
      operatingIncomePct: 29.1,
      ordinaryIncomePct: 29.6,
      netIncomePct: 33.1
    },
    historicalAverageProgress: {
      revenuePct: 24.2,
      operatingIncomePct: 25.5,
      netIncomePct: 25.8
    },
    signal: 'strong_upgrade',
    signalReason: 'ハイブリッド車（HEV）の世界的人気持続と高付加価値SUV・レクサス販売好調により、1Q時点で純利益進捗率33.1%に到達。過去平均（25.8%）を大幅に超過し好調発進。',
    quarterlyBreakdown: [
      { quarter: '2025 1Q', revenueBillion: 118378, operatingIncomeBillion: 13084, netIncomeBillion: 13333 },
      { quarter: '2025 2Q', revenueBillion: 114446, operatingIncomeBillion: 11558, netIncomeBillion: 5738 },
      { quarter: '2025 3Q', revenueBillion: 120412, operatingIncomeBillion: 9850, netIncomeBillion: 8250 },
      { quarter: '2025 4Q', revenueBillion: 106764, operatingIncomeBillion: 8508, netIncomeBillion: 8379 },
      { quarter: '2026 1Q', revenueBillion: 122000, operatingIncomeBillion: 12500, netIncomeBillion: 11800 }
    ]
  },

  // ② ソニーグループ (6758) - 2026年度 1Q (最新)
  '6758': {
    tickerCode: '6758',
    companyName: 'ソニーグループ株式会社',
    fiscalYear: '2026年3月期',
    latestQuarter: '1Q',
    announcementDate: '2026年8月7日',
    fullYearForecast: {
      revenueBillion: 127000,
      operatingIncomeBillion: 13100,
      ordinaryIncomeBillion: 13500,
      netIncomeBillion: 9800
    },
    cumulativeActual: {
      revenueBillion: 31000,
      operatingIncomeBillion: 3100,
      ordinaryIncomeBillion: 3300,
      netIncomeBillion: 2450
    },
    progressRate: {
      revenuePct: 24.4,
      operatingIncomePct: 23.7,
      ordinaryIncomePct: 24.4,
      netIncomePct: 25.0
    },
    historicalAverageProgress: {
      revenuePct: 23.5,
      operatingIncomePct: 23.0,
      netIncomePct: 24.1
    },
    signal: 'steady',
    signalReason: 'PlayStationネットワークサービス（PS Plus）の課金売上増とCMOSイメージセンサのスマホ向け大口出荷が堅調に推移し、計画通り順調な進捗。',
    quarterlyBreakdown: [
      { quarter: '2025 1Q', revenueBillion: 30116, operatingIncomeBillion: 2791, netIncomeBillion: 2102 },
      { quarter: '2025 2Q', revenueBillion: 29056, operatingIncomeBillion: 4451, netIncomeBillion: 3385 },
      { quarter: '2025 3Q', revenueBillion: 37475, operatingIncomeBillion: 4633, netIncomeBillion: 3639 },
      { quarter: '2025 4Q', revenueBillion: 30353, operatingIncomeBillion: 1225, netIncomeBillion: 674 },
      { quarter: '2026 1Q', revenueBillion: 31000, operatingIncomeBillion: 3100, netIncomeBillion: 2450 }
    ]
  },

  // ③ 三菱商事 (8058) - 2026年度 1Q (最新)
  '8058': {
    tickerCode: '8058',
    companyName: '三菱商事株式会社',
    fiscalYear: '2026年3月期',
    latestQuarter: '1Q',
    announcementDate: '2026年8月2日',
    fullYearForecast: {
      revenueBillion: 198000,
      operatingIncomeBillion: 10800,
      ordinaryIncomeBillion: 12500,
      netIncomeBillion: 9800
    },
    cumulativeActual: {
      revenueBillion: 49500,
      operatingIncomeBillion: 2850,
      ordinaryIncomeBillion: 3200,
      netIncomeBillion: 2650
    },
    progressRate: {
      revenuePct: 25.0,
      operatingIncomePct: 26.4,
      ordinaryIncomePct: 25.6,
      netIncomePct: 27.0
    },
    historicalAverageProgress: {
      revenuePct: 24.0,
      operatingIncomePct: 25.0,
      netIncomePct: 25.5
    },
    signal: 'steady',
    signalReason: 'LNGおよび豪州原料炭事業の堅調な市況と、ローソン共同経営など生活流通セグメントの安定収益により、純利益進捗率27.0%と高水準を維持。',
    quarterlyBreakdown: [
      { quarter: '2025 1Q', revenueBillion: 47250, operatingIncomeBillion: 2620, netIncomeBillion: 2450 },
      { quarter: '2025 2Q', revenueBillion: 51200, operatingIncomeBillion: 2850, netIncomeBillion: 2650 },
      { quarter: '2025 3Q', revenueBillion: 52100, operatingIncomeBillion: 2780, netIncomeBillion: 2550 },
      { quarter: '2025 4Q', revenueBillion: 47450, operatingIncomeBillion: 2550, netIncomeBillion: 2150 },
      { quarter: '2026 1Q', revenueBillion: 49500, operatingIncomeBillion: 2850, netIncomeBillion: 2650 }
    ]
  },

  // ④ キーエンス (6861) - 2026年度 1Q (最新)
  '6861': {
    tickerCode: '6861',
    companyName: '株式会社キーエンス',
    fiscalYear: '2026年3月期',
    latestQuarter: '1Q',
    announcementDate: '2026年8月4日',
    fullYearForecast: {
      revenueBillion: 10500,
      operatingIncomeBillion: 5400,
      ordinaryIncomeBillion: 5600,
      netIncomeBillion: 4000
    },
    cumulativeActual: {
      revenueBillion: 2750,
      operatingIncomeBillion: 1400,
      ordinaryIncomeBillion: 1450,
      netIncomeBillion: 1040
    },
    progressRate: {
      revenuePct: 26.2,
      operatingIncomePct: 25.9,
      ordinaryIncomePct: 25.9,
      netIncomePct: 26.0
    },
    historicalAverageProgress: {
      revenuePct: 24.5,
      operatingIncomePct: 24.8,
      netIncomePct: 25.0
    },
    signal: 'steady',
    signalReason: '半導体・EV電池向けの高精度変位センサ・画像処理機器の引き合いが活発。営業利益率50.9%という驚異の高収益体質を堅持。',
    quarterlyBreakdown: [
      { quarter: '2025 1Q', revenueBillion: 2387, operatingIncomeBillion: 1216, netIncomeBillion: 895 },
      { quarter: '2025 2Q', revenueBillion: 2558, operatingIncomeBillion: 1300, netIncomeBillion: 961 },
      { quarter: '2025 3Q', revenueBillion: 2680, operatingIncomeBillion: 1380, netIncomeBillion: 1020 },
      { quarter: '2025 4Q', revenueBillion: 2875, operatingIncomeBillion: 1504, netIncomeBillion: 1124 },
      { quarter: '2026 1Q', revenueBillion: 2750, operatingIncomeBillion: 1400, netIncomeBillion: 1040 }
    ]
  },

  // ⑤ 任天堂 (7974) - 2026年度 1Q (最新)
  '7974': {
    tickerCode: '7974',
    companyName: '任天堂株式会社',
    fiscalYear: '2026年3月期',
    latestQuarter: '1Q',
    announcementDate: '2026年8月2日',
    fullYearForecast: {
      revenueBillion: 16500,
      operatingIncomeBillion: 4500,
      ordinaryIncomeBillion: 5200,
      netIncomeBillion: 3800
    },
    cumulativeActual: {
      revenueBillion: 3850,
      operatingIncomeBillion: 920,
      ordinaryIncomeBillion: 1150,
      netIncomeBillion: 880
    },
    progressRate: {
      revenuePct: 23.3,
      operatingIncomePct: 20.4,
      ordinaryIncomePct: 22.1,
      netIncomePct: 23.2
    },
    historicalAverageProgress: {
      revenuePct: 22.0,
      operatingIncomePct: 21.0,
      netIncomePct: 22.5
    },
    signal: 'steady',
    signalReason: 'Switch後継プラットフォーム発表準備期でありながら、IP映画・グッズ・デジタルコンテンツ販売が下支えし、例年通りの第1四半期進捗率を達成。',
    quarterlyBreakdown: [
      { quarter: '2025 1Q', revenueBillion: 2466, operatingIncomeBillion: 545, netIncomeBillion: 809 },
      { quarter: '2025 2Q', revenueBillion: 2766, operatingIncomeBillion: 670, netIncomeBillion: 277 },
      { quarter: '2025 3Q', revenueBillion: 6250, operatingIncomeBillion: 2150, netIncomeBillion: 1720 },
      { quarter: '2025 4Q', revenueBillion: 5018, operatingIncomeBillion: 1135, netIncomeBillion: 994 },
      { quarter: '2026 1Q', revenueBillion: 3850, operatingIncomeBillion: 920, netIncomeBillion: 880 }
    ]
  },

  // ⑥ パピレス (3641) - 2026年度 1Q (最新)
  '3641': {
    tickerCode: '3641',
    companyName: '株式会社パピレス',
    fiscalYear: '2026年3月期',
    latestQuarter: '1Q',
    announcementDate: '2026年8月8日',
    fullYearForecast: {
      revenueBillion: 551,
      operatingIncomeBillion: 47.4,
      ordinaryIncomeBillion: 48.0,
      netIncomeBillion: 30.8
    },
    cumulativeActual: {
      revenueBillion: 145,
      operatingIncomeBillion: 12.8,
      ordinaryIncomeBillion: 13.0,
      netIncomeBillion: 8.4
    },
    progressRate: {
      revenuePct: 26.3,
      operatingIncomePct: 27.0,
      ordinaryIncomePct: 27.1,
      netIncomePct: 27.3
    },
    historicalAverageProgress: {
      revenuePct: 24.5,
      operatingIncomePct: 25.0,
      netIncomePct: 25.2
    },
    signal: 'strong_upgrade',
    signalReason: '電子コミック「Renta!」における縦スクロールタテコミ事業およびオリジナル自社レーベル作品のヒットにより、営業利益進捗率27.0%と前年同期を上回るペース。',
    quarterlyBreakdown: [
      { quarter: '2025 1Q', revenueBillion: 132, operatingIncomeBillion: 10.8, netIncomeBillion: 7.1 },
      { quarter: '2025 2Q', revenueBillion: 138, operatingIncomeBillion: 12.1, netIncomeBillion: 7.9 },
      { quarter: '2025 3Q', revenueBillion: 141, operatingIncomeBillion: 12.4, netIncomeBillion: 8.1 },
      { quarter: '2025 4Q', revenueBillion: 140, operatingIncomeBillion: 12.1, netIncomeBillion: 7.7 },
      { quarter: '2026 1Q', revenueBillion: 145, operatingIncomeBillion: 12.8, netIncomeBillion: 8.4 }
    ]
  },

  // ⑦ カバー (5253) - 2026年度 1Q (最新)
  '5253': {
    tickerCode: '5253',
    companyName: 'カバー株式会社',
    fiscalYear: '2026年3月期',
    latestQuarter: '1Q',
    announcementDate: '2026年8月13日',
    fullYearForecast: {
      revenueBillion: 335,
      operatingIncomeBillion: 58.0,
      ordinaryIncomeBillion: 58.5,
      netIncomeBillion: 41.0
    },
    cumulativeActual: {
      revenueBillion: 92,
      operatingIncomeBillion: 16.5,
      ordinaryIncomeBillion: 16.6,
      netIncomeBillion: 11.5
    },
    progressRate: {
      revenuePct: 27.5,
      operatingIncomePct: 28.4,
      ordinaryIncomePct: 28.4,
      netIncomePct: 28.0
    },
    historicalAverageProgress: {
      revenuePct: 23.8,
      operatingIncomePct: 24.5,
      netIncomePct: 24.8
    },
    signal: 'strong_upgrade',
    signalReason: 'ホロライブ所属タレントの大型周年イベント・公式グッズEC販売およびグローバルライセンス提携の急伸により、営業利益進捗率28.4%と計画を大幅に超過。',
    quarterlyBreakdown: [
      { quarter: '2025 1Q', revenueBillion: 68, operatingIncomeBillion: 11.2, netIncomeBillion: 7.8 },
      { quarter: '2025 2Q', revenueBillion: 82, operatingIncomeBillion: 14.5, netIncomeBillion: 10.2 },
      { quarter: '2025 3Q', revenueBillion: 89, operatingIncomeBillion: 15.8, netIncomeBillion: 11.1 },
      { quarter: '2025 4Q', revenueBillion: 96, operatingIncomeBillion: 16.5, netIncomeBillion: 11.9 },
      { quarter: '2026 1Q', revenueBillion: 92, operatingIncomeBillion: 16.5, netIncomeBillion: 11.5 }
    ]
  },

  // ⑧ note (5243) - 2026年度 1Q (最新)
  '5243': {
    tickerCode: '5243',
    companyName: 'note株式会社',
    fiscalYear: '2026年11月期',
    latestQuarter: '1Q',
    announcementDate: '2026年4月11日',
    fullYearForecast: {
      revenueBillion: 42.5,
      operatingIncomeBillion: 4.5,
      ordinaryIncomeBillion: 4.4,
      netIncomeBillion: 4.1
    },
    cumulativeActual: {
      revenueBillion: 11.8,
      operatingIncomeBillion: 1.4,
      ordinaryIncomeBillion: 1.38,
      netIncomeBillion: 1.25
    },
    progressRate: {
      revenuePct: 27.8,
      operatingIncomePct: 31.1,
      ordinaryIncomePct: 31.4,
      netIncomePct: 30.5
    },
    historicalAverageProgress: {
      revenuePct: 25.0,
      operatingIncomePct: 26.0,
      netIncomePct: 25.5
    },
    signal: 'strong_upgrade',
    signalReason: 'クリエイター課金・サブスクリプション売上の継続拡大と、法人向けnote proの顧客単価上昇により、営業利益進捗率31.1%と極めて好調。',
    quarterlyBreakdown: [
      { quarter: '2025 1Q', revenueBillion: 9.8, operatingIncomeBillion: 0.9, netIncomeBillion: 0.8 },
      { quarter: '2025 2Q', revenueBillion: 10.4, operatingIncomeBillion: 1.1, netIncomeBillion: 1.0 },
      { quarter: '2025 3Q', revenueBillion: 10.9, operatingIncomeBillion: 1.2, netIncomeBillion: 1.1 },
      { quarter: '2025 4Q', revenueBillion: 11.4, operatingIncomeBillion: 1.3, netIncomeBillion: 1.2 },
      { quarter: '2026 1Q', revenueBillion: 11.8, operatingIncomeBillion: 1.4, netIncomeBillion: 1.25 }
    ]
  }
};
