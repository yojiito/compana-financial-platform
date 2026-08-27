export interface QuarterlyDataPoint {
  quarter: string; // "1Q", "2Q", "3Q", "4Q"
  revenueBillion: number; // 四半期売上高 (億円)
  operatingIncomeBillion: number; // 四半期営業利益 (億円)
  netIncomeBillion: number; // 四半期純利益 (億円)
}

export interface CompanyQuarterlyProgress {
  tickerCode: string;
  companyName: string;
  fiscalYear: string; // "2025年3月期"
  latestQuarter: '1Q' | '2Q' | '3Q' | '4Q'; // 現在の最新開示四半期
  announcementDate: string; // "2024-11-06"
  
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
  // ① トヨタ自動車 (7203) - 2Q累計
  '7203': {
    tickerCode: '7203',
    companyName: 'トヨタ自動車株式会社',
    fiscalYear: '2025年3月期',
    latestQuarter: '2Q',
    announcementDate: '2024年11月6日',
    fullYearForecast: {
      revenueBillion: 460000,
      operatingIncomeBillion: 43000,
      ordinaryIncomeBillion: 52000,
      netIncomeBillion: 35700
    },
    cumulativeActual: {
      revenueBillion: 232824,
      operatingIncomeBillion: 24642,
      ordinaryIncomeBillion: 29815,
      netIncomeBillion: 19071
    },
    progressRate: {
      revenuePct: 50.6,
      operatingIncomePct: 57.3,
      ordinaryIncomePct: 57.3,
      netIncomePct: 53.4
    },
    historicalAverageProgress: {
      revenuePct: 48.2,
      operatingIncomePct: 51.5,
      netIncomePct: 50.8
    },
    signal: 'strong_upgrade',
    signalReason: 'ハイブリッド車（HEV）の世界的大ヒットと円安効果により、2Q時点で営業利益進捗率57.3%に到達。過去平均（51.5%）を大きく上回り通期上方修正の公算大。',
    quarterlyBreakdown: [
      { quarter: '2024 1Q', revenueBillion: 105468, operatingIncomeBillion: 11209, netIncomeBillion: 13113 },
      { quarter: '2024 2Q', revenueBillion: 114341, operatingIncomeBillion: 14383, netIncomeBillion: 12762 },
      { quarter: '2024 3Q', revenueBillion: 120412, operatingIncomeBillion: 16812, netIncomeBillion: 13570 },
      { quarter: '2024 4Q', revenueBillion: 110738, operatingIncomeBillion: 11117, netIncomeBillion: 9993 },
      { quarter: '2025 1Q', revenueBillion: 118378, operatingIncomeBillion: 13084, netIncomeBillion: 13333 },
      { quarter: '2025 2Q', revenueBillion: 114446, operatingIncomeBillion: 11558, netIncomeBillion: 5738 }
    ]
  },

  // ② 任天堂 (7974) - 2Q累計
  '7974': {
    tickerCode: '7974',
    companyName: '任天堂株式会社',
    fiscalYear: '2025年3月期',
    latestQuarter: '2Q',
    announcementDate: '2024年11月5日',
    fullYearForecast: {
      revenueBillion: 12800,
      operatingIncomeBillion: 3600,
      ordinaryIncomeBillion: 4200,
      netIncomeBillion: 3000
    },
    cumulativeActual: {
      revenueBillion: 5232,
      operatingIncomeBillion: 1215,
      ordinaryIncomeBillion: 1471,
      netIncomeBillion: 1086
    },
    progressRate: {
      revenuePct: 40.9,
      operatingIncomePct: 33.8,
      ordinaryIncomePct: 35.0,
      netIncomePct: 36.2
    },
    historicalAverageProgress: {
      revenuePct: 42.0,
      operatingIncomePct: 38.5,
      netIncomePct: 40.2
    },
    signal: 'steady',
    signalReason: 'Switch後継機発表前の端境期で進捗率33.8%だが、任天堂の利益は例年10〜12月の3Qクリスマス商戦に過半（約50%）が集中する季節性パターン通り。',
    quarterlyBreakdown: [
      { quarter: '2024 1Q', revenueBillion: 4613, operatingIncomeBillion: 1854, netIncomeBillion: 1810 },
      { quarter: '2024 2Q', revenueBillion: 3330, operatingIncomeBillion: 940, netIncomeBillion: 908 },
      { quarter: '2024 3Q', revenueBillion: 5986, operatingIncomeBillion: 1850, netIncomeBillion: 1367 },
      { quarter: '2024 4Q', revenueBillion: 2785, operatingIncomeBillion: 345, netIncomeBillion: 824 },
      { quarter: '2025 1Q', revenueBillion: 2466, operatingIncomeBillion: 545, netIncomeBillion: 809 },
      { quarter: '2025 2Q', revenueBillion: 2766, operatingIncomeBillion: 670, netIncomeBillion: 277 }
    ]
  },

  // ③ コーエーテクモホールディングス (3635) - 2Q累計
  '3635': {
    tickerCode: '3635',
    companyName: 'コーエーテクモホールディングス株式会社',
    fiscalYear: '2025年3月期',
    latestQuarter: '2Q',
    announcementDate: '2024年10月28日',
    fullYearForecast: {
      revenueBillion: 900,
      operatingIncomeBillion: 310,
      ordinaryIncomeBillion: 410,
      netIncomeBillion: 310
    },
    cumulativeActual: {
      revenueBillion: 388,
      operatingIncomeBillion: 135,
      ordinaryIncomeBillion: 260,
      netIncomeBillion: 196
    },
    progressRate: {
      revenuePct: 43.1,
      operatingIncomePct: 43.5,
      ordinaryIncomePct: 63.4,
      netIncomePct: 63.2
    },
    historicalAverageProgress: {
      revenuePct: 41.5,
      operatingIncomePct: 42.0,
      netIncomePct: 48.0
    },
    signal: 'strong_upgrade',
    signalReason: '本業ゲームの利益進捗43.5%に加え、有価証券運用益（営業外収益125億円）の爆発により経常利益進捗率が63.4%に達し、上方修正期待が極めて高い。',
    quarterlyBreakdown: [
      { quarter: '2024 1Q', revenueBillion: 182, operatingIncomeBillion: 68, netIncomeBillion: 98 },
      { quarter: '2024 2Q', revenueBillion: 215, operatingIncomeBillion: 71, netIncomeBillion: 125 },
      { quarter: '2024 3Q', revenueBillion: 210, operatingIncomeBillion: 75, netIncomeBillion: 110 },
      { quarter: '2024 4Q', revenueBillion: 240, operatingIncomeBillion: 71, netIncomeBillion: 97 },
      { quarter: '2025 1Q', revenueBillion: 176, operatingIncomeBillion: 58, netIncomeBillion: 102 },
      { quarter: '2025 2Q', revenueBillion: 212, operatingIncomeBillion: 77, netIncomeBillion: 94 }
    ]
  },

  // ④ キーエンス (6861) - 2Q累計
  '6861': {
    tickerCode: '6861',
    companyName: '株式会社キーエンス',
    fiscalYear: '2025年3月期',
    latestQuarter: '2Q',
    announcementDate: '2024年10月31日',
    fullYearForecast: {
      revenueBillion: 10200,
      operatingIncomeBillion: 5200,
      ordinaryIncomeBillion: 5400,
      netIncomeBillion: 3800
    },
    cumulativeActual: {
      revenueBillion: 4945,
      operatingIncomeBillion: 2516,
      ordinaryIncomeBillion: 2635,
      netIncomeBillion: 1856
    },
    progressRate: {
      revenuePct: 48.5,
      operatingIncomePct: 48.4,
      ordinaryIncomePct: 48.8,
      netIncomePct: 48.8
    },
    historicalAverageProgress: {
      revenuePct: 48.0,
      operatingIncomePct: 48.2,
      netIncomePct: 48.5
    },
    signal: 'steady',
    signalReason: '海外FA設備投資の回復に伴い、営業利益率50.9%という驚異的な超高収益を維持しつつ、予算通り極めて順調・堅調に進捗。',
    quarterlyBreakdown: [
      { quarter: '2024 1Q', revenueBillion: 2223, operatingIncomeBillion: 1121, netIncomeBillion: 826 },
      { quarter: '2024 2Q', revenueBillion: 2362, operatingIncomeBillion: 1221, netIncomeBillion: 899 },
      { quarter: '2024 3Q', revenueBillion: 2410, operatingIncomeBillion: 1238, netIncomeBillion: 912 },
      { quarter: '2024 4Q', revenueBillion: 2679, operatingIncomeBillion: 1374, netIncomeBillion: 1002 },
      { quarter: '2025 1Q', revenueBillion: 2387, operatingIncomeBillion: 1216, netIncomeBillion: 895 },
      { quarter: '2025 2Q', revenueBillion: 2558, operatingIncomeBillion: 1300, netIncomeBillion: 961 }
    ]
  },

  // ⑤ ソニーグループ (6758) - 2Q累計
  '6758': {
    tickerCode: '6758',
    companyName: 'ソニーグループ株式会社',
    fiscalYear: '2025年3月期',
    latestQuarter: '2Q',
    announcementDate: '2024年11月8日',
    fullYearForecast: {
      revenueBillion: 127000,
      operatingIncomeBillion: 13100,
      ordinaryIncomeBillion: 13300,
      netIncomeBillion: 9800
    },
    cumulativeActual: {
      revenueBillion: 59172,
      operatingIncomeBillion: 7341,
      ordinaryIncomeBillion: 7420,
      netIncomeBillion: 5040
    },
    progressRate: {
      revenuePct: 46.6,
      operatingIncomePct: 56.0,
      ordinaryIncomePct: 55.8,
      netIncomePct: 51.4
    },
    historicalAverageProgress: {
      revenuePct: 45.5,
      operatingIncomePct: 49.0,
      netIncomePct: 48.0
    },
    signal: 'strong_upgrade',
    signalReason: 'Crunchyroll（アニメ配信）および音楽ストリーミングの高成長、イメージセンサー（CMOS）の歩留まり改善により、営業利益進捗率56.0%と好調。通期見通しを上方修正。',
    quarterlyBreakdown: [
      { quarter: '2024 1Q', revenueBillion: 29634, operatingIncomeBillion: 2530, netIncomeBillion: 2175 },
      { quarter: '2024 2Q', revenueBillion: 28286, operatingIncomeBillion: 2630, netIncomeBillion: 2001 },
      { quarter: '2024 3Q', revenueBillion: 37475, operatingIncomeBillion: 4633, netIncomeBillion: 3639 },
      { quarter: '2024 4Q', revenueBillion: 34820, operatingIncomeBillion: 2294, netIncomeBillion: 1890 },
      { quarter: '2025 1Q', revenueBillion: 30116, operatingIncomeBillion: 2791, netIncomeBillion: 2625 },
      { quarter: '2025 2Q', revenueBillion: 29056, operatingIncomeBillion: 4550, netIncomeBillion: 2415 }
    ]
  },

  // ⑥ ファーストリテイリング (9983) - 通期本決算
  '9983': {
    tickerCode: '9983',
    companyName: '株式会社ファーストリテイリング',
    fiscalYear: '2024年8月期',
    latestQuarter: '4Q',
    announcementDate: '2024年10月10日',
    fullYearForecast: {
      revenueBillion: 30700,
      operatingIncomeBillion: 4750,
      ordinaryIncomeBillion: 5200,
      netIncomeBillion: 3650
    },
    cumulativeActual: {
      revenueBillion: 31038,
      operatingIncomeBillion: 5009,
      ordinaryIncomeBillion: 5572,
      netIncomeBillion: 3719
    },
    progressRate: {
      revenuePct: 101.1,
      operatingIncomePct: 105.5,
      ordinaryIncomePct: 107.2,
      netIncomePct: 101.9
    },
    historicalAverageProgress: {
      revenuePct: 100.0,
      operatingIncomePct: 100.0,
      netIncomePct: 100.0
    },
    signal: 'strong_upgrade',
    signalReason: '欧米および東南アジアでのユニクロ快進撃により、営業利益5,000億円の大台を突破し過去最高益を更新。会社予想を大幅に超過達成。',
    quarterlyBreakdown: [
      { quarter: '2024 1Q', revenueBillion: 8108, operatingIncomeBillion: 1467, netIncomeBillion: 1078 },
      { quarter: '2024 2Q', revenueBillion: 7881, operatingIncomeBillion: 1104, netIncomeBillion: 880 },
      { quarter: '2024 3Q', revenueBillion: 7674, operatingIncomeBillion: 1447, netIncomeBillion: 1169 },
      { quarter: '2024 4Q', revenueBillion: 7375, operatingIncomeBillion: 991, netIncomeBillion: 592 }
    ]
  }
};