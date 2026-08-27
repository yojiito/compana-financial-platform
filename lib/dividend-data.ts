export interface DividendRecord {
  fiscalYear: string; // "2015", "2016", ... "2024"
  dps: number; // 1株当たり配当金 (円)
  payoutRatio: number; // 配当性向 (%)
  dividendYield: number; // 配当利回り (%)
  shareBuybackBillion: number; // 自社株買い総額 (億円)
  totalReturnRatio: number; // 総還元性向 (%) = (配当総額 + 自社株買い) / 純利益
}

export interface CompanyDividendAnalysis {
  tickerCode: string;
  companyName: string;
  consecutiveDividendIncreases: number; // 連続増配年数 (年)
  noDividendCutYears: number; // 非減配年数 (年)
  dividendPolicy: string; // 配当方針 (例: "DOE 4.0%または総還元性向50%を基準に累進配当")
  currentYield: number; // 現在の予想配当利回り (%)
  latestForecastDps: number; // 今期予想1株配当 (円)
  records: DividendRecord[];
}

export const DIVIDEND_ANALYSIS_DATA: { [ticker: string]: CompanyDividendAnalysis } = {
  // ① トヨタ自動車 (7203)
  '7203': {
    tickerCode: '7203',
    companyName: 'トヨタ自動車株式会社',
    consecutiveDividendIncreases: 4,
    noDividendCutYears: 14,
    dividendPolicy: '「安定的な増配の継続」を基本方針とし、連結配当性向30%を目安に機動的な自社株買い（年間1兆円規模）を組み合わせて総還元性向を最大化。',
    currentYield: 2.85,
    latestForecastDps: 90.0,
    records: [
      { fiscalYear: '2015', dps: 40.0, payoutRatio: 28.5, dividendYield: 2.35, shareBuybackBillion: 3500, totalReturnRatio: 44.5 },
      { fiscalYear: '2016', dps: 42.0, payoutRatio: 29.2, dividendYield: 2.50, shareBuybackBillion: 5000, totalReturnRatio: 51.0 },
      { fiscalYear: '2017', dps: 42.0, payoutRatio: 35.8, dividendYield: 2.65, shareBuybackBillion: 4000, totalReturnRatio: 57.2 },
      { fiscalYear: '2018', dps: 44.0, payoutRatio: 26.5, dividendYield: 2.70, shareBuybackBillion: 5500, totalReturnRatio: 48.0 },
      { fiscalYear: '2019', dps: 44.0, payoutRatio: 33.8, dividendYield: 2.80, shareBuybackBillion: 6500, totalReturnRatio: 68.5 },
      { fiscalYear: '2020', dps: 44.0, payoutRatio: 30.5, dividendYield: 2.95, shareBuybackBillion: 4500, totalReturnRatio: 52.0 },
      { fiscalYear: '2021', dps: 48.0, payoutRatio: 30.2, dividendYield: 2.60, shareBuybackBillion: 3000, totalReturnRatio: 43.5 },
      { fiscalYear: '2022', dps: 52.0, payoutRatio: 25.1, dividendYield: 2.45, shareBuybackBillion: 4000, totalReturnRatio: 39.0 },
      { fiscalYear: '2023', dps: 60.0, payoutRatio: 34.8, dividendYield: 2.90, shareBuybackBillion: 8000, totalReturnRatio: 67.5 },
      { fiscalYear: '2024', dps: 75.0, payoutRatio: 21.0, dividendYield: 2.75, shareBuybackBillion: 10000, totalReturnRatio: 41.5 },
      { fiscalYear: '2025(予)', dps: 90.0, payoutRatio: 28.5, dividendYield: 2.85, shareBuybackBillion: 12000, totalReturnRatio: 55.0 }
    ]
  },

  // ② 任天堂 (7974)
  '7974': {
    tickerCode: '7974',
    companyName: '任天堂株式会社',
    consecutiveDividendIncreases: 2,
    noDividendCutYears: 10,
    dividendPolicy: '連結営業利益の33%を配当原資とする明確な業績連動方針に加え、連結配当性向50%を維持。手元キャッシュ1.6兆円を背景に機動的還元。',
    currentYield: 2.45,
    latestForecastDps: 180.0,
    records: [
      { fiscalYear: '2015', dps: 36.0, payoutRatio: 50.2, dividendYield: 1.85, shareBuybackBillion: 0, totalReturnRatio: 50.2 },
      { fiscalYear: '2016', dps: 30.0, payoutRatio: 58.5, dividendYield: 1.70, shareBuybackBillion: 0, totalReturnRatio: 58.5 },
      { fiscalYear: '2017', dps: 86.0, payoutRatio: 50.0, dividendYield: 2.10, shareBuybackBillion: 0, totalReturnRatio: 50.0 },
      { fiscalYear: '2018', dps: 166.0, payoutRatio: 50.1, dividendYield: 3.20, shareBuybackBillion: 0, totalReturnRatio: 50.1 },
      { fiscalYear: '2019', dps: 162.0, payoutRatio: 50.0, dividendYield: 3.15, shareBuybackBillion: 0, totalReturnRatio: 50.0 },
      { fiscalYear: '2020', dps: 218.0, payoutRatio: 50.0, dividendYield: 3.80, shareBuybackBillion: 0, totalReturnRatio: 50.0 },
      { fiscalYear: '2021', dps: 444.0, payoutRatio: 55.2, dividendYield: 5.20, shareBuybackBillion: 1000, totalReturnRatio: 76.0 },
      { fiscalYear: '2022', dps: 406.0, payoutRatio: 51.5, dividendYield: 4.80, shareBuybackBillion: 1000, totalReturnRatio: 72.5 },
      { fiscalYear: '2023', dps: 186.0, payoutRatio: 52.0, dividendYield: 3.20, shareBuybackBillion: 0, totalReturnRatio: 52.0 },
      { fiscalYear: '2024', dps: 211.0, payoutRatio: 50.5, dividendYield: 2.65, shareBuybackBillion: 0, totalReturnRatio: 50.5 },
      { fiscalYear: '2025(予)', dps: 180.0, payoutRatio: 50.0, dividendYield: 2.45, shareBuybackBillion: 500, totalReturnRatio: 65.0 }
    ]
  },

  // ③ コーエーテクモホールディングス (3635)
  '3635': {
    tickerCode: '3635',
    companyName: 'コーエーテクモホールディングス株式会社',
    consecutiveDividendIncreases: 14,
    noDividendCutYears: 14,
    dividendPolicy: '「14期連続増配」を継続中。総還元性向50%以上（または配当性向30%超）を公約とし、投資運用益による巨額の経常利益を株主に手厚く還元。',
    currentYield: 3.85,
    latestForecastDps: 60.0,
    records: [
      { fiscalYear: '2015', dps: 18.0, payoutRatio: 35.0, dividendYield: 2.40, shareBuybackBillion: 20, totalReturnRatio: 48.0 },
      { fiscalYear: '2016', dps: 21.0, payoutRatio: 36.2, dividendYield: 2.55, shareBuybackBillion: 25, totalReturnRatio: 51.5 },
      { fiscalYear: '2017', dps: 24.0, payoutRatio: 38.0, dividendYield: 2.70, shareBuybackBillion: 30, totalReturnRatio: 54.0 },
      { fiscalYear: '2018', dps: 28.0, payoutRatio: 40.5, dividendYield: 2.90, shareBuybackBillion: 40, totalReturnRatio: 58.0 },
      { fiscalYear: '2019', dps: 32.0, payoutRatio: 42.0, dividendYield: 3.10, shareBuybackBillion: 50, totalReturnRatio: 62.0 },
      { fiscalYear: '2020', dps: 37.0, payoutRatio: 45.0, dividendYield: 3.30, shareBuybackBillion: 60, totalReturnRatio: 65.0 },
      { fiscalYear: '2021', dps: 45.0, payoutRatio: 48.0, dividendYield: 3.50, shareBuybackBillion: 80, totalReturnRatio: 70.0 },
      { fiscalYear: '2022', dps: 50.0, payoutRatio: 49.5, dividendYield: 3.65, shareBuybackBillion: 100, totalReturnRatio: 72.0 },
      { fiscalYear: '2023', dps: 55.0, payoutRatio: 50.2, dividendYield: 3.75, shareBuybackBillion: 120, totalReturnRatio: 75.0 },
      { fiscalYear: '2024', dps: 58.0, payoutRatio: 51.0, dividendYield: 3.80, shareBuybackBillion: 150, totalReturnRatio: 78.0 },
      { fiscalYear: '2025(予)', dps: 60.0, payoutRatio: 52.0, dividendYield: 3.85, shareBuybackBillion: 160, totalReturnRatio: 80.0 }
    ]
  },

  // ④ キーエンス (6861)
  '6861': {
    tickerCode: '6861',
    companyName: '株式会社キーエンス',
    consecutiveDividendIncreases: 8,
    noDividendCutYears: 15,
    dividendPolicy: '営業利益率50%超の強固なキャッシュ創出力を背景に、近年大幅な増配を継続。配当性向を急速に引き上げ株主還元を加速。',
    currentYield: 1.15,
    latestForecastDps: 350.0,
    records: [
      { fiscalYear: '2015', dps: 50.0, payoutRatio: 12.5, dividendYield: 0.40, shareBuybackBillion: 0, totalReturnRatio: 12.5 },
      { fiscalYear: '2016', dps: 50.0, payoutRatio: 11.8, dividendYield: 0.38, shareBuybackBillion: 0, totalReturnRatio: 11.8 },
      { fiscalYear: '2017', dps: 100.0, payoutRatio: 16.5, dividendYield: 0.55, shareBuybackBillion: 0, totalReturnRatio: 16.5 },
      { fiscalYear: '2018', dps: 100.0, payoutRatio: 14.2, dividendYield: 0.50, shareBuybackBillion: 0, totalReturnRatio: 14.2 },
      { fiscalYear: '2019', dps: 150.0, payoutRatio: 20.8, dividendYield: 0.70, shareBuybackBillion: 0, totalReturnRatio: 20.8 },
      { fiscalYear: '2020', dps: 200.0, payoutRatio: 24.5, dividendYield: 0.85, shareBuybackBillion: 0, totalReturnRatio: 24.5 },
      { fiscalYear: '2021', dps: 200.0, payoutRatio: 22.0, dividendYield: 0.75, shareBuybackBillion: 0, totalReturnRatio: 22.0 },
      { fiscalYear: '2022', dps: 300.0, payoutRatio: 24.8, dividendYield: 0.95, shareBuybackBillion: 0, totalReturnRatio: 24.8 },
      { fiscalYear: '2023', dps: 300.0, payoutRatio: 23.5, dividendYield: 0.90, shareBuybackBillion: 0, totalReturnRatio: 23.5 },
      { fiscalYear: '2024', dps: 300.0, payoutRatio: 22.8, dividendYield: 0.88, shareBuybackBillion: 0, totalReturnRatio: 22.8 },
      { fiscalYear: '2025(予)', dps: 350.0, payoutRatio: 26.5, dividendYield: 1.15, shareBuybackBillion: 500, totalReturnRatio: 35.0 }
    ]
  },

  // ⑤ ソニーグループ (6758)
  '6758': {
    tickerCode: '6758',
    companyName: 'ソニーグループ株式会社',
    consecutiveDividendIncreases: 9,
    noDividendCutYears: 10,
    dividendPolicy: '安定的・継続的な増配に加え、年間2,000億〜3,000億円規模の機動的自社株買いを実施し、総還元性向40%〜50%を維持。',
    currentYield: 1.55,
    latestForecastDps: 90.0,
    records: [
      { fiscalYear: '2015', dps: 20.0, payoutRatio: 22.0, dividendYield: 0.85, shareBuybackBillion: 0, totalReturnRatio: 22.0 },
      { fiscalYear: '2016', dps: 20.0, payoutRatio: 21.5, dividendYield: 0.80, shareBuybackBillion: 0, totalReturnRatio: 21.5 },
      { fiscalYear: '2017', dps: 25.0, payoutRatio: 18.2, dividendYield: 0.70, shareBuybackBillion: 0, totalReturnRatio: 18.2 },
      { fiscalYear: '2018', dps: 35.0, payoutRatio: 12.8, dividendYield: 0.80, shareBuybackBillion: 1000, totalReturnRatio: 25.5 },
      { fiscalYear: '2019', dps: 45.0, payoutRatio: 14.5, dividendYield: 0.90, shareBuybackBillion: 2000, totalReturnRatio: 38.0 },
      { fiscalYear: '2020', dps: 55.0, payoutRatio: 13.2, dividendYield: 0.85, shareBuybackBillion: 1500, totalReturnRatio: 28.5 },
      { fiscalYear: '2021', dps: 65.0, payoutRatio: 16.5, dividendYield: 0.95, shareBuybackBillion: 2000, totalReturnRatio: 39.0 },
      { fiscalYear: '2022', dps: 75.0, payoutRatio: 18.0, dividendYield: 1.10, shareBuybackBillion: 2000, totalReturnRatio: 41.0 },
      { fiscalYear: '2023', dps: 80.0, payoutRatio: 19.5, dividendYield: 1.25, shareBuybackBillion: 2500, totalReturnRatio: 45.0 },
      { fiscalYear: '2024', dps: 85.0, payoutRatio: 20.2, dividendYield: 1.40, shareBuybackBillion: 2500, totalReturnRatio: 46.5 },
      { fiscalYear: '2025(予)', dps: 90.0, payoutRatio: 21.5, dividendYield: 1.55, shareBuybackBillion: 3000, totalReturnRatio: 52.0 }
    ]
  },

  // ⑥ ファーストリテイリング (9983)
  '9983': {
    tickerCode: '9983',
    companyName: '株式会社ファーストリテイリング',
    consecutiveDividendIncreases: 5,
    noDividendCutYears: 12,
    dividendPolicy: '成長投資（海外出店・自動化倉庫）の資金を確保しつつ、連結配当性向35%を目安に業績伸長に応じた積極的増配を継続。',
    currentYield: 1.45,
    latestForecastDps: 400.0,
    records: [
      { fiscalYear: '2015', dps: 116.0, payoutRatio: 32.5, dividendYield: 1.10, shareBuybackBillion: 0, totalReturnRatio: 32.5 },
      { fiscalYear: '2016', dps: 116.0, payoutRatio: 48.0, dividendYield: 1.20, shareBuybackBillion: 0, totalReturnRatio: 48.0 },
      { fiscalYear: '2017', dps: 116.0, payoutRatio: 35.2, dividendYield: 1.15, shareBuybackBillion: 0, totalReturnRatio: 35.2 },
      { fiscalYear: '2018', dps: 146.0, payoutRatio: 33.8, dividendYield: 1.18, shareBuybackBillion: 0, totalReturnRatio: 33.8 },
      { fiscalYear: '2019', dps: 160.0, payoutRatio: 34.0, dividendYield: 1.22, shareBuybackBillion: 0, totalReturnRatio: 34.0 },
      { fiscalYear: '2020', dps: 160.0, payoutRatio: 47.5, dividendYield: 1.25, shareBuybackBillion: 0, totalReturnRatio: 47.5 },
      { fiscalYear: '2021', dps: 160.0, payoutRatio: 36.8, dividendYield: 1.15, shareBuybackBillion: 0, totalReturnRatio: 36.8 },
      { fiscalYear: '2022', dps: 206.0, payoutRatio: 30.5, dividendYield: 1.20, shareBuybackBillion: 0, totalReturnRatio: 30.5 },
      { fiscalYear: '2023', dps: 290.0, payoutRatio: 31.8, dividendYield: 1.30, shareBuybackBillion: 0, totalReturnRatio: 31.8 },
      { fiscalYear: '2024', dps: 350.0, payoutRatio: 32.5, dividendYield: 1.38, shareBuybackBillion: 0, totalReturnRatio: 32.5 },
      { fiscalYear: '2025(予)', dps: 400.0, payoutRatio: 34.0, dividendYield: 1.45, shareBuybackBillion: 0, totalReturnRatio: 34.0 }
    ]
  }
};