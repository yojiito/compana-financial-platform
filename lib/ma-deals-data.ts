export interface DealTimelineEvent {
  date: string;
  enDate: string;
  event: string;
  enEvent: string;
  type: string;
}

export interface MaDealItem {
  id: string;
  announceYear: string;
  closeDate?: string;
  exactAnnounceDate: string;
  exactCloseDate?: string;
  buyerName: string;
  buyerEnName: string;
  buyerCode: string;
  buyerSector: string;
  buyerEnSector: string;
  targetName: string;
  targetEnName: string;
  targetCountry: string;
  targetEnCountry: string;
  targetSector: string;
  targetEnSector: string;
  dealValueOku: number;
  dealValueUsdBillion?: number;
  scheme: string;
  schemeLabel: string;
  enSchemeLabel: string;
  dealType: string;
  dealTypeLabel: string;
  enDealTypeLabel: string;
  goodwillOku?: number;
  premiumPct?: number;
  timeline: DealTimelineEvent[];
  stakeBefore?: string;
  stakeAfter?: string;
  considerationDetails: string;
  enConsiderationDetails: string;
  financingMethod?: string;
  enFinancingMethod?: string;
  valuationMultiples?: { evEbitda?: string; per?: string; pbr?: string };
  officialFilingNumber?: string;
  advisors?: { buyerFA?: string; targetFA?: string; buyerLegal?: string; targetLegal?: string };
  strategicObjective: string;
  enStrategicObjective: string;
  outcomeAndPmi: string;
  enOutcomeAndPmi: string;
  statusRating: string;
  statusRatingLabel: string;
  enStatusRatingLabel: string;
  officialSourceType: string;
  keyTags: string[];
}

export const MA_DEALS_DATABASE: MaDealItem[] = [
  {
    "id": "takeda-shire",
    "announceYear": "2018年05月",
    "closeDate": "2019年01月",
    "exactAnnounceDate": "2018-05-08",
    "exactCloseDate": "2019-01-08",
    "buyerName": "武田薬品工業 (4502)",
    "buyerEnName": "Takeda Pharmaceutical Company Limited (4502)",
    "buyerCode": "4502",
    "buyerSector": "医薬品",
    "buyerEnSector": "Pharmaceuticals & Life Sciences",
    "targetName": "Shire plc (シャイアー / アイルランド)",
    "targetEnName": "Shire plc (Ireland / Jersey)",
    "targetCountry": "アイルランド",
    "targetEnCountry": "Ireland",
    "targetSector": "バイオ医薬品・希少疾患",
    "targetEnSector": "Biopharma & Rare Diseases",
    "dealValueOku": 68000,
    "dealValueUsdBillion": 62,
    "scheme": "StockAcquisition",
    "schemeLabel": "株式取得・現金及び新株交付 (Scheme of Arrangement)",
    "enSchemeLabel": "Scheme of Arrangement (Cash & Stock)",
    "dealType": "cross_border",
    "dealTypeLabel": "クロスボーダー (日本企業史上最大)",
    "enDealTypeLabel": "Cross-Border (Largest in Japan History)",
    "goodwillOku": 32000,
    "premiumPct": 64.4,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "Shire普通株1株に対し 現金30.33米ドル ＋ 武田新株0.839株（またはADR 1.678株）",
    "enConsiderationDetails": ".33 in cash + 0.839 new Takeda shares (or 1.678 Takeda ADSs) per 1 Shire share",
    "financingMethod": "銀行団ブリッジローン約308.5億ドル (三井住友・MUFG等) ＋ ドル建/ユーロ建社債発行 ＋ ハイブリッド債",
    "enFinancingMethod": ".85B bridge facility (SMBC, MUFG, JPMorgan) + multi-currency senior notes & hybrid bonds",
    "valuationMultiples": {
      "evEbitda": "14.8x",
      "per": "26.5x"
    },
    "officialFilingNumber": "臨時報告書 (EDINET: E00927) / TDnet適時開示",
    "timeline": [
      {
        "date": "2018-05-08",
        "enDate": "May 8, 2018",
        "event": "武田薬品とShire両社取締役会にて買収提案で基本合意 (プレスリリース発表)",
        "enEvent": "Board of Directors of Takeda and Shire reach agreement on terms of recommended offer",
        "type": "announcement"
      },
      {
        "date": "2018-10-26",
        "enDate": "Oct 26, 2018",
        "event": "日本公正取引委員会 (JFTC) より企業結合承認を取得",
        "enEvent": "Japan Fair Trade Commission (JFTC) clears transaction unconditionally",
        "type": "antitrust_approval"
      },
      {
        "date": "2018-11-20",
        "enDate": "Nov 20, 2018",
        "event": "欧州委員会 (European Commission) より条件付き承認を取得",
        "enEvent": "European Commission approves acquisition conditional on divestments",
        "type": "antitrust_approval"
      },
      {
        "date": "2018-12-05",
        "enDate": "Dec 5, 2018",
        "event": "武田薬品 臨時株主総会にて新株発行議案が賛成89.1%で可決 / Shire株主総会でも可決",
        "enEvent": "Takeda EGM approves deal with 89.1% votes; Shire shareholders approve",
        "type": "shareholder_meeting"
      },
      {
        "date": "2019-01-08",
        "enDate": "Jan 8, 2019",
        "event": "ジャージー裁判所の認可を経て買収クロージング完了・効力発生 (Shire完全子会社化)",
        "enEvent": "Royal Court of Jersey sanctions Scheme; Acquisition takes full legal effect",
        "type": "closing"
      },
      {
        "date": "2019-01-09",
        "enDate": "Jan 9, 2019",
        "event": "ロンドン証券取引所 (LSE) およびNASDAQにおいてShire株式の上場廃止",
        "enEvent": "Shire shares delisted from LSE and NASDAQ",
        "type": "delisting"
      }
    ],
    "advisors": {
      "buyerFA": "野村證券 / Evercore / JPMorgan",
      "targetFA": "Citi / Goldman Sachs / Morgan Stanley",
      "buyerLegal": "Linklaters / 西村あさひ",
      "targetLegal": "Slaughter and May / Davis Polk"
    },
    "strategicObjective": "消化器系疾患、希少疾患、血漿分画製剤、オンコロジー、ニューロサイエンスの5大重点領域で世界トップ10のメガファーマへ飛躍。米国市場での直接販売網を確立。",
    "enStrategicObjective": "Elevate into a global Top 10 mega pharma across 5 core areas and secure a direct US commercial footprint.",
    "outcomeAndPmi": "有利子負債は約5兆円まで急増したものの、ノンコア資産売却（武田コンシューマー等）と営業キャッシュフローで前倒しデレバレッジ達成。売上高4兆円超のグローバル製薬企業へ。",
    "enOutcomeAndPmi": "Deleveraged rapidly (<2.0x Net Debt/EBITDA) via >¥1T in non-core asset sales and robust cash flows, forming a ¥4T+ global pharma leader.",
    "statusRating": "success",
    "statusRatingLabel": "大統合成功・デレバレッジ前倒し",
    "enStatusRatingLabel": "Integration Success & Rapid Deleveraging",
    "officialSourceType": "EDINET_REPORT",
    "keyTags": [
      "日本企業史上最大",
      "メガファーマ",
      "米国市場拡大",
      "巨額デレバレッジ"
    ]
  },
  {
    "id": "softbank-arm",
    "announceYear": "2016年07月",
    "closeDate": "2016年09月",
    "exactAnnounceDate": "2016-07-18",
    "exactCloseDate": "2016-09-05",
    "buyerName": "ソフトバンクグループ (9984)",
    "buyerEnName": "SoftBank Group Corp. (9984)",
    "buyerCode": "9984",
    "buyerSector": "投資・通信",
    "buyerEnSector": "Investment & Technology",
    "targetName": "Arm Holdings plc (アーム / 英国)",
    "targetEnName": "Arm Holdings plc (UK)",
    "targetCountry": "英国",
    "targetEnCountry": "United Kingdom",
    "targetSector": "半導体設計・IPライセンス",
    "targetEnSector": "Semiconductor IP & Architecture",
    "dealValueOku": 33000,
    "dealValueUsdBillion": 31,
    "scheme": "StockAcquisition",
    "schemeLabel": "全株現金買収 (Scheme of Arrangement)",
    "enSchemeLabel": "All-Cash Acquisition (Scheme of Arrangement)",
    "dealType": "cross_border",
    "dealTypeLabel": "クロスボーダー (先端テック)",
    "enDealTypeLabel": "Cross-Border (Deep Tech IP)",
    "goodwillOku": 27000,
    "premiumPct": 43,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "Arm普通株式1株につき 現金17.00ポンド (約2,380円)",
    "enConsiderationDetails": "1,700 pence (£17.00) in cash for each Arm share",
    "financingMethod": "手元流動性 (アリババ株・スーパーセル株売却代金 約2兆円) ＋ 短期ブリッジローン 約1兆円",
    "enFinancingMethod": "Internal cash reserves (Alibaba/Supercell monetization ~¥2T) + ¥1T bridge loan from Mizuho",
    "valuationMultiples": {
      "evEbitda": "35.0x",
      "per": "48.2x"
    },
    "officialFilingNumber": "臨時報告書 (EDINET: E02778) / TDnet適時開示",
    "timeline": [
      {
        "date": "2016-07-18",
        "enDate": "Jul 18, 2016",
        "event": "ソフトバンクグループとArm社が全株現金買収で正式合意 (ロンドン記者会見)",
        "enEvent": "SoftBank Group announces recommended all-cash acquisition of Arm Holdings plc",
        "type": "announcement"
      },
      {
        "date": "2016-08-30",
        "enDate": "Aug 30, 2016",
        "event": "Arm臨時株主総会にて買収議案が賛成95%以上の圧倒的多数で可決",
        "enEvent": "Arm shareholders approve Scheme of Arrangement with >95% majority",
        "type": "shareholder_meeting"
      },
      {
        "date": "2016-09-01",
        "enDate": "Sep 1, 2016",
        "event": "英高等法院 (High Court of Justice) による買収スキーム認可",
        "enEvent": "High Court of Justice in England sanctions Scheme of Arrangement",
        "type": "antitrust_approval"
      },
      {
        "date": "2016-09-05",
        "enDate": "Sep 5, 2016",
        "event": "買収手続き完了 (Armの全発行済株式取得完了)",
        "enEvent": "Acquisition becomes effective; SoftBank acquires 100% of Arm Holdings",
        "type": "closing"
      },
      {
        "date": "2016-09-06",
        "enDate": "Sep 6, 2016",
        "event": "ロンドン証券取引所 (LSE) およびNASDAQからArm株式の上場廃止",
        "enEvent": "Arm shares delisted from London Stock Exchange and NASDAQ",
        "type": "delisting"
      },
      {
        "date": "2023-09-14",
        "enDate": "Sep 14, 2023",
        "event": "米国NASDAQ市場へ時価総額約8兆円 (.5B) で再上場",
        "enEvent": "Arm relists on NASDAQ at .5B valuation in 2023 largest global IPO",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "The Raine Group / Robey Warshaw / Mizuho",
      "targetFA": "Goldman Sachs / Lazard",
      "buyerLegal": "Morrison & Foerster / Freshfields",
      "targetLegal": "Slaughter and May"
    },
    "strategicObjective": "世界のスマートフォンCPUシェア95%超を誇る省電力半導体アーキテクチャの中核知財を獲得。AI・IoT時代の最重要プラットフォーマーとしての覇権確立。",
    "enStrategicObjective": "Acquire foundational power-efficient processor architecture powering 95%+ of global smartphones, anchoring SoftBank at the epicenter of AI.",
    "outcomeAndPmi": "買収後R&Dを倍増させデータセンターや車載へ進出。2023年9月にNASDAQ再上場を果たし、AIブームで時価総額20兆円超へ急伸。",
    "enOutcomeAndPmi": "Doubled R&D post-acquisition. Relisted on NASDAQ in Sep 2023 at ~, subsequently soaring past  on the AI wave.",
    "statusRating": "mega_success",
    "statusRatingLabel": "歴史的メガヒット・含み益10兆円超",
    "enStatusRatingLabel": "Legendary Mega Hit (>¥10T Unrealized Gain)",
    "officialSourceType": "EDINET_REPORT",
    "keyTags": [
      "NASDAQ再上場",
      "AI半導体",
      "孫正義",
      "知財独占"
    ]
  },
  {
    "id": "recruit-indeed",
    "announceYear": "2012年09月",
    "closeDate": "2012年10月",
    "exactAnnounceDate": "2012-09-25",
    "exactCloseDate": "2012-10-01",
    "buyerName": "リクルートホールディングス (6098)",
    "buyerEnName": "Recruit Holdings Co., Ltd. (6098)",
    "buyerCode": "6098",
    "buyerSector": "サービス業 (HRTech)",
    "buyerEnSector": "HR Technology & Enterprise Services",
    "targetName": "Indeed, Inc. (インディード / 米国)",
    "targetEnName": "Indeed, Inc. (United States)",
    "targetCountry": "米国",
    "targetEnCountry": "United States",
    "targetSector": "HRテック・求人検索エンジン",
    "targetEnSector": "HR Tech & Job Search Engine",
    "dealValueOku": 1000,
    "dealValueUsdBillion": 1.2,
    "scheme": "StockAcquisition",
    "schemeLabel": "全株買収 (非公開買収)",
    "enSchemeLabel": "100% Stock Acquisition (Private Deal)",
    "dealType": "cross_border",
    "dealTypeLabel": "クロスボーダー (HRテック買収)",
    "enDealTypeLabel": "Cross-Border (HR Tech Buyout)",
    "goodwillOku": 850,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "Indeed株主（創業者・NYTimes・Union Square Ventures等）から全株式を現金で買い取り",
    "enConsiderationDetails": "100% all-cash buyout of shares from founders, The New York Times Company, and Union Square Ventures",
    "financingMethod": "リクルートの自己資金 (手元キャッシュ)",
    "enFinancingMethod": "Internal cash reserves of Recruit Holdings",
    "valuationMultiples": {
      "evEbitda": "約15x"
    },
    "officialFilingNumber": "TDnet適時開示「米国Indeed, Inc.の株式取得（子会社化）に関するお知らせ」",
    "timeline": [
      {
        "date": "2012-09-25",
        "enDate": "Sep 25, 2012",
        "event": "リクルートがIndeed社の株式を100%取得し子会社化すると発表 (基本合意)",
        "enEvent": "Recruit announces agreement to acquire 100% of Indeed, Inc.",
        "type": "announcement"
      },
      {
        "date": "2012-10-01",
        "enDate": "Oct 1, 2012",
        "event": "買収手続き完了・クロージング (Indeedがリクルート傘下へ)",
        "enEvent": "Acquisition finalized and successfully closed",
        "type": "closing"
      },
      {
        "date": "2014-10-16",
        "enDate": "Oct 16, 2014",
        "event": "リクルートホールディングスが東証一部へ上場 (Indeedが成長エンジンとして注目)",
        "enEvent": "Recruit Holdings IPOs on TSE; Indeed highlighted as core growth engine",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "Morgan Stanley",
      "targetFA": "Allen & Company",
      "buyerLegal": "Davis Polk & Wardwell",
      "targetLegal": "Gunderson Dettmer"
    },
    "strategicObjective": "国内中心の人材ビジネスからグローバル求人検索プラットフォームへ脱皮。「We help people get jobs」を掲げ、クリック課金型（CPC）テクノロジーモデルを内製化。",
    "enStrategicObjective": "Pivot from domestic staffing to a global job search engine, internalizing CPC technology.",
    "outcomeAndPmi": "創業者経営陣の自律性を徹底尊重するPMIを実施。年間売上1兆円超・EBITDA数千億円の最大稼ぎ頭へ成長。日本企業の海外M&A史上屈指の大成功事例。",
    "enOutcomeAndPmi": "Exemplary PMI preserving founder autonomy. Scaled to ¥1T+ revenue powerhouse, widely hailed as the most successful overseas M&A in Japanese corporate history.",
    "statusRating": "mega_success",
    "statusRatingLabel": "神M&A・売上数十倍に大成長",
    "enStatusRatingLabel": "All-Time Best Deal (>50x Revenue Growth)",
    "officialSourceType": "TDNET_TIMELY",
    "keyTags": [
      "神M&A",
      "HRテック世界首位",
      "PMI成功の教科書",
      "リクルート最高益"
    ]
  },
  {
    "id": "colowide-ootoya",
    "announceYear": "2020年07月",
    "closeDate": "2020年09月",
    "exactAnnounceDate": "2020-07-09",
    "exactCloseDate": "2020-09-09",
    "buyerName": "コロワイド (7616)",
    "buyerEnName": "Colowide Co., Ltd. (7616)",
    "buyerCode": "7616",
    "buyerSector": "外食・フードサービス",
    "buyerEnSector": "Restaurants & Food Service Chains",
    "targetName": "大戸屋ホールディングス (2705)",
    "targetEnName": "OOTOYA Holdings Co., Ltd. (2705)",
    "targetCountry": "日本",
    "targetEnCountry": "Japan",
    "targetSector": "定食チェーン・和食外食",
    "targetEnSector": "Casual Japanese Dining Franchise",
    "dealValueOku": 72,
    "dealValueUsdBillion": 0.07,
    "scheme": "TOB",
    "schemeLabel": "敵対的公開買付け (Hostile TOB)",
    "enSchemeLabel": "Hostile Tender Offer (TOB)",
    "dealType": "hostile_tob",
    "dealTypeLabel": "敵対的TOB (外食業界再編)",
    "enDealTypeLabel": "Hostile TOB (Restaurant Sector Battle)",
    "goodwillOku": 35,
    "premiumPct": 46.2,
    "stakeBefore": "19.16%",
    "stakeAfter": "46.99%",
    "considerationDetails": "大戸屋普通株式1株につき 現金3,081円 (買付上限2,015,600株・下限なし)",
    "enConsiderationDetails": "¥3,081 per share in cash (Targeting up to 2,015,600 shares, capped at 51.3%)",
    "financingMethod": "コロワイドの手元資金 ＋ 銀行借入枠",
    "enFinancingMethod": "Colowide internal cash reserves + bank credit lines",
    "valuationMultiples": {
      "pbr": "2.4x"
    },
    "officialFilingNumber": "公開買付届出書 (EDINET: E03184) / 臨時報告書",
    "timeline": [
      {
        "date": "2020-07-09",
        "enDate": "Jul 9, 2020",
        "event": "コロワイドが大戸屋HDに対する敵対的TOBの開始を発表 (買付価格3,081円)",
        "enEvent": "Colowide announces unsolicited hostile TOB for Ootoya at ¥3,081/share",
        "type": "announcement"
      },
      {
        "date": "2020-07-10",
        "enDate": "Jul 10, 2020",
        "event": "TOB買付期間開始 (当初期間: 2020年7月10日 〜 8月25日)",
        "enEvent": "Hostile TOB tender period commences",
        "type": "tob_start"
      },
      {
        "date": "2020-07-20",
        "enDate": "Jul 20, 2020",
        "event": "大戸屋HD取締役会が買収反対意見を表明",
        "enEvent": "Ootoya Board of Directors formally issues statement opposing the TOB",
        "type": "announcement"
      },
      {
        "date": "2020-08-25",
        "enDate": "Aug 25, 2020",
        "event": "コロワイドがTOB期間を9月8日まで延長",
        "enEvent": "Colowide extends TOB tender period to September 8, 2020",
        "type": "tob_end"
      },
      {
        "date": "2020-09-09",
        "enDate": "Sep 9, 2020",
        "event": "TOB成立発表 (出資比率46.99%に到達)",
        "enEvent": "Hostile TOB successfully completed, securing 46.99% voting ownership",
        "type": "closing"
      },
      {
        "date": "2020-11-04",
        "enDate": "Nov 4, 2020",
        "event": "大戸屋HD臨時株主総会にてコロワイド提案の取締役選任案が可決、経営権掌握",
        "enEvent": "Ootoya EGM passes Colowide’s director slate; management control seized",
        "type": "shareholder_meeting"
      }
    ],
    "advisors": {
      "buyerFA": "SBI証券",
      "targetFA": "プルータス・コンサルティング",
      "buyerLegal": "ベーカー＆マッケンジー",
      "targetLegal": "西村あさひ法律事務所"
    },
    "strategicObjective": "創業家遺族からの株式買い取りを足がかりに、コロワイドの集中セントラルキッチン・食材調達網を導入して大戸屋の収益力を改善し傘下に収める。",
    "enStrategicObjective": "Leverage equity acquired from founding family to launch hostile TOB and integrate central kitchen.",
    "outcomeAndPmi": "反対運動を乗り越え敵対的TOB成立。取締役を過半数掌握し調達共通化と業態転換により黒字化を達成。",
    "enOutcomeAndPmi": "Completed hostile TOB securing 46.9% voting rights, replacing board and restoring profitability via procurement scale.",
    "statusRating": "success",
    "statusRatingLabel": "敵対的TOB成立・セントラルキッチン導入黒字化",
    "enStatusRatingLabel": "Hostile TOB Completed & Profitability Restored",
    "officialSourceType": "EDINET_REPORT",
    "keyTags": [
      "敵対的TOB成功",
      "外食M&A",
      "セントラルキッチン",
      "委任状争奪戦"
    ]
  },
  {
    "id": "itochu-descente",
    "announceYear": "2019年01月",
    "closeDate": "2019年03月",
    "exactAnnounceDate": "2019-01-31",
    "exactCloseDate": "2019-03-29",
    "buyerName": "伊藤忠商事 (8001)",
    "buyerEnName": "ITOCHU Corporation (8001)",
    "buyerCode": "8001",
    "buyerSector": "総合商社 (繊維・ブランド)",
    "buyerEnSector": "General Trading Company (Textile & Brands)",
    "targetName": "デサント (8114)",
    "targetEnName": "DESCENTE LTD. (8114)",
    "targetCountry": "日本",
    "targetEnCountry": "Japan",
    "targetSector": "スポーツウェア・高機能アパレル (水沢ダウン)",
    "targetEnSector": "Premium Sportswear & Outerwear (Mizusawa Down)",
    "dealValueOku": 180,
    "dealValueUsdBillion": 0.16,
    "scheme": "TOB",
    "schemeLabel": "敵対的公開買付け (上限40.0%のTOB)",
    "enSchemeLabel": "Hostile Partial TOB (Targeting 40.0%)",
    "dealType": "hostile_tob",
    "dealTypeLabel": "敵対的TOB (総合商社 vs 保有先企業)",
    "enDealTypeLabel": "Hostile TOB (Sogo Shosha vs Affiliate)",
    "goodwillOku": 60,
    "premiumPct": 50,
    "stakeBefore": "30.44%",
    "stakeAfter": "40.00%",
    "considerationDetails": "デサント普通株式1株につき 現金2,800円 (買付上限7,210,000株)",
    "enConsiderationDetails": "¥2,800 per share in cash (Targeting up to 7,210,000 shares to cap at 40.0%)",
    "financingMethod": "伊藤忠商事の自己資金",
    "enFinancingMethod": "ITOCHU Corporation internal cash reserves",
    "valuationMultiples": {
      "per": "22.4x"
    },
    "officialFilingNumber": "公開買付届出書 (EDINET: E02529) / 臨時報告書",
    "timeline": [
      {
        "date": "2019-01-31",
        "enDate": "Jan 31, 2019",
        "event": "伊藤忠商事がデサントに対し出資比率を40%へ引き上げる敵対的TOBを発表",
        "enEvent": "ITOCHU announces hostile partial TOB to increase stake from 30.4% to 40.0%",
        "type": "announcement"
      },
      {
        "date": "2019-02-01",
        "enDate": "Feb 1, 2019",
        "event": "TOB買付期間開始 (期間: 2019年2月1日 〜 3月14日)",
        "enEvent": "TOB tender offer period opens",
        "type": "tob_start"
      },
      {
        "date": "2019-02-07",
        "enDate": "Feb 7, 2019",
        "event": "デサント取締役会が「企業価値を毀損する」として反対意見を表明",
        "enEvent": "Descente Board of Directors issues unanimous opposition to ITOCHU’s tender offer",
        "type": "announcement"
      },
      {
        "date": "2019-03-15",
        "enDate": "Mar 15, 2019",
        "event": "TOB成立発表 (上限の721万株を満額成立)",
        "enEvent": "TOB succeeds with heavy oversubscription, locking in 40.0% control",
        "type": "tob_end"
      },
      {
        "date": "2019-06-20",
        "enDate": "Jun 20, 2019",
        "event": "デサント定時株主総会にて伊藤忠出身の小関秀一氏が新社長就任",
        "enEvent": "Descente AGM: ITOCHU executive Shuichi Koseki named President",
        "type": "shareholder_meeting"
      },
      {
        "date": "2024-08-05",
        "enDate": "Aug 5, 2024",
        "event": "伊藤忠商事がデサントの完全子会社化（非公開化TOB）を発表",
        "enEvent": "ITOCHU launches friendly 100% privatization TOB to take Descente fully private",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "野村證券",
      "targetFA": "大和証券",
      "buyerLegal": "森・濱田松本法律事務所",
      "targetLegal": "アンダーソン・毛利・友常法律事務所"
    },
    "strategicObjective": "筆頭株主（約30%保有）であった伊藤忠が、経営対立していたデサントに対し出資比率を40%へ引き上げ経営主導権を確立。",
    "enStrategicObjective": "ITOCHU launched a hostile tender offer to raise stake to 40% and take direct operational control.",
    "outcomeAndPmi": "TOB成立後、中国合弁（ANTA SPORTS提携）や高機能ブランド強化で営業利益最高益更新。2024年に完全子会社化へ。",
    "enOutcomeAndPmi": "Hostile TOB succeeded. Accelerated Chinese JV with Anta Sports and high-end apparel, achieving record profits before full privatization in 2024.",
    "statusRating": "mega_success",
    "statusRatingLabel": "経営権掌握 ➔ 業績急回復 ➔ 2024年完全子会社化",
    "enStatusRatingLabel": "Hostile Takeover ➔ Record Profits ➔ 100% Privatization",
    "officialSourceType": "EDINET_REPORT",
    "keyTags": [
      "敵対的TOB成功",
      "総合商社",
      "中国アンタ提携",
      "完全子会社化"
    ]
  },
  {
    "id": "suntory-beam",
    "announceYear": "2014年01月",
    "closeDate": "2014年04月",
    "exactAnnounceDate": "2014-01-13",
    "exactCloseDate": "2014-04-30",
    "buyerName": "サントリーホールディングス (非上場)",
    "buyerEnName": "Suntory Holdings Limited (Unlisted)",
    "buyerCode": "suntory-hd",
    "buyerSector": "飲料・食品・酒類",
    "buyerEnSector": "Beverages & Spirits Conglomerate",
    "targetName": "Beam Inc. (ビーム / 米国)",
    "targetEnName": "Beam Inc. (Jim Beam / United States)",
    "targetCountry": "米国",
    "targetEnCountry": "United States",
    "targetSector": "プレミアムバーボン・蒸留酒",
    "targetEnSector": "Premium Bourbon & Distilled Spirits",
    "dealValueOku": 16000,
    "dealValueUsdBillion": 16,
    "scheme": "StockAcquisition",
    "schemeLabel": "全株現金買収 (Reverse Triangular Merger)",
    "enSchemeLabel": "All-Cash Acquisition (Reverse Triangular Merger)",
    "dealType": "cross_border",
    "dealTypeLabel": "クロスボーダー (酒類コングロマリット)",
    "enDealTypeLabel": "Cross-Border (Global Spirits Major)",
    "goodwillOku": 11000,
    "premiumPct": 25,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "Beam社普通株式1株につき 現金83.50米ドル (純有利子負債引き受け含む企業価値 約160億ドル)",
    "enConsiderationDetails": ".50 per share in cash (Total Enterprise Value ~.0B including debt)",
    "financingMethod": "手元資金 ＋ 三菱東京UFJ銀行 (現MUFG) からの買収シ団ローン",
    "enFinancingMethod": "Cash on hand + committed acquisition syndicated loan facility from BTMU",
    "valuationMultiples": {
      "evEbitda": "20.5x"
    },
    "officialFilingNumber": "会社法第440条 官報決算公告 / サントリー公式発表",
    "timeline": [
      {
        "date": "2014-01-13",
        "enDate": "Jan 13, 2014",
        "event": "サントリーHDとBeam社が全株現金買収で正式合意発表",
        "enEvent": "Suntory and Beam enter into definitive merger agreement",
        "type": "announcement"
      },
      {
        "date": "2014-03-25",
        "enDate": "Mar 25, 2014",
        "event": "Beam社臨時株主総会にて買収合意が承認 (賛成99%)",
        "enEvent": "Beam stockholders approve merger at special meeting with 99% vote",
        "type": "shareholder_meeting"
      },
      {
        "date": "2014-04-30",
        "enDate": "Apr 30, 2014",
        "event": "米独禁当局承認を経て買収クロージング完了 (サントリー傘下へ)",
        "enEvent": "Acquisition finalized and successfully closed",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "Mitsubishi UFJ Morgan Stanley",
      "targetFA": "Centerview Partners / Credit Suisse",
      "buyerLegal": "Cleary Gottlieb",
      "targetLegal": "Sidley Austin"
    },
    "strategicObjective": "「Jim Beam」「Maker’s Mark」等の世界的人気バーボンを獲得し、世界第3位のグローバル総合スピリッツメジャーへ躍進。",
    "enStrategicObjective": "Acquire iconic bourbon brands (Jim Beam, Maker’s Mark) to become world #3 global spirits titan.",
    "outcomeAndPmi": "「サントリーグローバルスピリッツ」として日米欧の販売網を相互活用。海外売上高比率50%超の高収益構造を確立。",
    "enOutcomeAndPmi": "Established Suntory Global Spirits, catapulting Yamazaki globally and cementing >50% overseas revenue ratio.",
    "statusRating": "success",
    "statusRatingLabel": "世界第3位の蒸留酒メジャーへ",
    "enStatusRatingLabel": "World #3 Premium Spirits Titan",
    "officialSourceType": "OFFICIAL_GAZETTE",
    "keyTags": [
      "世界3位スピリッツ",
      "ジムビーム",
      "非上場メガ買収",
      "日米シナジー"
    ]
  },
  {
    "id": "sony-crunchyroll",
    "announceYear": "2020年12月",
    "closeDate": "2021年08月",
    "exactAnnounceDate": "2020-12-09",
    "exactCloseDate": "2021-08-09",
    "buyerName": "ソニーグループ (6758)",
    "buyerEnName": "Sony Group Corporation (6758)",
    "buyerCode": "6758",
    "buyerSector": "エンタメ・電気機器",
    "buyerEnSector": "Entertainment & Gaming",
    "targetName": "Crunchyroll (クランチロール / 米AT&T傘下)",
    "targetEnName": "Crunchyroll (AT&T WarnerMedia / United States)",
    "targetCountry": "米国",
    "targetEnCountry": "United States",
    "targetSector": "グローバルアニメ配信プラットフォーム",
    "targetEnSector": "Global Anime Streaming & Community",
    "dealValueOku": 1300,
    "dealValueUsdBillion": 1.18,
    "scheme": "StockAcquisition",
    "schemeLabel": "全株現金買収",
    "enSchemeLabel": "100% Cash Acquisition",
    "dealType": "cross_border",
    "dealTypeLabel": "クロスボーダー (アニメIP配信独占)",
    "enDealTypeLabel": "Cross-Border (Global Anime D2C)",
    "goodwillOku": 950,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "米AT&T子会社ワーナーメディアから全持分を現金11億7,500万米ドルで取得",
    "enConsiderationDetails": ".175 billion in cash paid to AT&T / WarnerMedia for 100% equity",
    "financingMethod": "ソニーグループの自己資金 (手元キャッシュ)",
    "enFinancingMethod": "Internal cash reserves of Sony Group Corporation",
    "valuationMultiples": {
      "evEbitda": "約12x"
    },
    "officialFilingNumber": "TDnet適時開示「Funimation Global GroupによるCrunchyrollの買収完了について」",
    "timeline": [
      {
        "date": "2020-12-09",
        "enDate": "Dec 9, 2020",
        "event": "ソニー傘下のFunimationがAT&TからCrunchyrollを買収することで合意",
        "enEvent": "Sony’s Funimation Global Group agrees to acquire Crunchyroll from AT&T",
        "type": "announcement"
      },
      {
        "date": "2021-08-09",
        "enDate": "Aug 9, 2021",
        "event": "米国司法省 (DOJ) による反トラスト審査を通過しクロージング完了",
        "enEvent": "US Department of Justice antitrust clearance completed; Acquisition finalized",
        "type": "closing"
      },
      {
        "date": "2022-03-01",
        "enDate": "Mar 1, 2022",
        "event": "FunimationのコンテンツをCrunchyrollブランドへ一本化・ブランド統合発表",
        "enEvent": "Sony consolidates anime library under unified Crunchyroll brand",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "JPMorgan",
      "targetFA": "LionTree Advisors",
      "buyerLegal": "Shearman & Sterling",
      "targetLegal": "Sullivan & Cromwell"
    },
    "strategicObjective": "有料会員1,300万人超・200カ国以上のアニメファン網を獲得。アニプレックスとクランチロールを垂直統合し世界配信基盤を独占。",
    "enStrategicObjective": "Acquire 13M+ paying anime subscribers, vertically integrating Aniplex and Crunchyroll.",
    "outcomeAndPmi": "Funimationとの統合を迅速に完了。ソニーのクリエイティブエンタメ事業の柱となり二桁営業利益率を維持。",
    "enOutcomeAndPmi": "Unified global subscription powerhouse generating recurring double-digit operating margin cash flows.",
    "statusRating": "mega_success",
    "statusRatingLabel": "世界アニメ配信プラットフォームを独占",
    "enStatusRatingLabel": "Dominant Global Anime Streaming Ecosystem",
    "officialSourceType": "TDNET_TIMELY",
    "keyTags": [
      "アニメ独占",
      "D2Cプラットフォーム",
      "アニプレックス",
      "鬼滅の刃海外展開"
    ]
  },
  {
    "id": "toyota-daihatsu",
    "announceYear": "2016年01月",
    "closeDate": "2016年08月",
    "exactAnnounceDate": "2016-01-29",
    "exactCloseDate": "2016-08-01",
    "buyerName": "トヨタ自動車 (7203)",
    "buyerEnName": "Toyota Motor Corporation (7203)",
    "buyerCode": "7203",
    "buyerSector": "自動車・モビリティ",
    "buyerEnSector": "Automobiles & Mobility",
    "targetName": "ダイハツ工業 (旧7262)",
    "targetEnName": "Daihatsu Motor Co., Ltd. (Former 7262)",
    "targetCountry": "日本",
    "targetEnCountry": "Japan",
    "targetSector": "軽自動車・小型車・新興国モビリティ",
    "targetEnSector": "Mini Vehicles (Kei Cars) & Emerging Market Autos",
    "dealValueOku": 3200,
    "dealValueUsdBillion": 3,
    "scheme": "StockSwap",
    "schemeLabel": "株式交換による完全子会社化 (上場廃止)",
    "enSchemeLabel": "100% Stock Swap Privatization (Delisting)",
    "dealType": "domestic_mega",
    "dealTypeLabel": "国内メガグループ再編",
    "enDealTypeLabel": "Domestic Group Consolidation",
    "goodwillOku": 0,
    "premiumPct": 26.5,
    "stakeBefore": "51.19%",
    "stakeAfter": "100.00%",
    "considerationDetails": "ダイハツ普通株式1株に対し トヨタ普通株式0.26株を割当交付",
    "enConsiderationDetails": "0.26 shares of Toyota Motor common stock for each 1 share of Daihatsu Motor",
    "financingMethod": "株式交換 (トヨタ自己株式の交付)",
    "enFinancingMethod": "Stock swap using Toyota treasury shares",
    "valuationMultiples": {
      "pbr": "1.15x"
    },
    "officialFilingNumber": "臨時報告書 (EDINET: E02144) / 株式交換契約書開示",
    "timeline": [
      {
        "date": "2016-01-29",
        "enDate": "Jan 29, 2016",
        "event": "トヨタとダイハツ両社取締役会にて株式交換による完全子会社化契約を締結・発表",
        "enEvent": "Toyota and Daihatsu conclude and announce Share Exchange Agreement",
        "type": "announcement"
      },
      {
        "date": "2016-06-28",
        "enDate": "Jun 28, 2016",
        "event": "ダイハツ定時株主総会にて株式交換契約承認可決",
        "enEvent": "Daihatsu AGM approves Share Exchange Agreement",
        "type": "shareholder_meeting"
      },
      {
        "date": "2016-07-27",
        "enDate": "Jul 27, 2016",
        "event": "ダイハツ工業株式が東証一部および名証一部にて上場廃止",
        "enEvent": "Daihatsu shares delisted from TSE and NSE",
        "type": "delisting"
      },
      {
        "date": "2016-08-01",
        "enDate": "Aug 1, 2016",
        "event": "株式交換の効力発生日、ダイハツがトヨタの100%完全子会社となる",
        "enEvent": "Share exchange takes full legal effect; Daihatsu becomes 100% subsidiary of Toyota",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "野村證券",
      "targetFA": "SMBC日興証券",
      "buyerLegal": "長島・大野・常松法律事務所",
      "targetLegal": "森・濱田松本法律事務所"
    },
    "strategicObjective": "51.2%出資の親会社から100%完全子会社化へ移行。新興国小型車開発および国内軽自動車基盤をグループ全体で一体最適化。",
    "enStrategicObjective": "Transition to 100% full ownership, streamlining emerging market compact car platforms (DNGA).",
    "outcomeAndPmi": "DNGAプラットフォームを共同開発しインドネシア等でシェア圧倒的首位を堅持。",
    "enOutcomeAndPmi": "Co-developed DNGA platform, maintaining market leadership across ASEAN.",
    "statusRating": "success",
    "statusRatingLabel": "完全子会社化・新興国小型車基盤の一体化",
    "enStatusRatingLabel": "100% Ownership & Compact Car Synergy",
    "officialSourceType": "TDNET_TIMELY",
    "keyTags": [
      "完全子会社化",
      "株式交換",
      "新興国小型車",
      "DNGA"
    ]
  },
  {
    "id": "jt-gallaher",
    "announceYear": "2006年12月",
    "closeDate": "2007年04月",
    "exactAnnounceDate": "2006-12-15",
    "exactCloseDate": "2007-04-18",
    "buyerName": "日本たばこ産業 (JT: 2914)",
    "buyerEnName": "Japan Tobacco Inc. (JT: 2914)",
    "buyerCode": "2914",
    "buyerSector": "食料品・嗜好品",
    "buyerEnSector": "Tobacco & Consumer Packaged Goods",
    "targetName": "Gallaher Group Plc (ギャラハー / 英国)",
    "targetEnName": "Gallaher Group Plc (United Kingdom)",
    "targetCountry": "英国",
    "targetEnCountry": "United Kingdom",
    "targetSector": "欧州・CISたばこ製造販売",
    "targetEnSector": "European & CIS Tobacco Manufacturing",
    "dealValueOku": 22000,
    "dealValueUsdBillion": 19,
    "scheme": "TOB",
    "schemeLabel": "推奨公開買付け (Recommended TOB)",
    "enSchemeLabel": "Recommended TOB & Scheme",
    "dealType": "cross_border",
    "dealTypeLabel": "クロスボーダー (欧州メガ買収)",
    "enDealTypeLabel": "Cross-Border (European Mega Buyout)",
    "goodwillOku": 14500,
    "premiumPct": 27,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "Gallaher社普通株式1株につき 現金1,140ペンス (£11.40) 買付",
    "enConsiderationDetails": "1,140 pence in cash per Gallaher share (£7.5B total consideration)",
    "financingMethod": "国際協調ローン (みずほ・メリルリンチ等 約1.6兆円) ＋ 手元資金",
    "enFinancingMethod": "Syndicated loan (~¥1.6T arranged by Mizuho & Merrill Lynch) + cash reserves",
    "valuationMultiples": {
      "evEbitda": "12.5x",
      "per": "18.0x"
    },
    "officialFilingNumber": "臨時報告書 (EDINET: E00927) / 英国有価証券公開買付届出",
    "timeline": [
      {
        "date": "2006-12-15",
        "enDate": "Dec 15, 2006",
        "event": "JTが英Gallaher社を約2.2兆円で友好的TOB買収すると正式発表",
        "enEvent": "JT announces agreed cash offer for Gallaher Group Plc at £7.5B",
        "type": "announcement"
      },
      {
        "date": "2007-03-09",
        "enDate": "Mar 9, 2007",
        "event": "Gallaher臨時株主総会にて買収スキームが承認可決",
        "enEvent": "Gallaher shareholders approve the Scheme of Arrangement",
        "type": "shareholder_meeting"
      },
      {
        "date": "2007-04-18",
        "enDate": "Apr 18, 2007",
        "event": "英裁判所の認可を経て買収手続き完了・クロージング",
        "enEvent": "Scheme sanction by High Court; Acquisition finalized",
        "type": "closing"
      },
      {
        "date": "2007-04-19",
        "enDate": "Apr 19, 2007",
        "event": "ロンドン証券取引所からGallaher株式の上場廃止",
        "enEvent": "Gallaher delisted from the London Stock Exchange",
        "type": "delisting"
      }
    ],
    "advisors": {
      "buyerFA": "Merrill Lynch / 興銀",
      "targetFA": "JPMorgan Cazenove / Lehman Brothers",
      "buyerLegal": "Freshfields Bruckhaus Deringer",
      "targetLegal": "Slaughter and May"
    },
    "strategicObjective": "英国・ロシア・欧州で強固なシェアを持つギャラハーを買収し世界3位のたばこメジャーへ確固たる地位を確立。",
    "enStrategicObjective": "Acquire Gallaher to solidify market leadership across the UK, Russia, and Europe.",
    "outcomeAndPmi": "海外たばこ事業（JTI）がグループ売上の約75%、営業利益の80%以上を稼ぎ出す高配当ディフェンシブ株の基盤を完成。",
    "enOutcomeAndPmi": "Overseas business now generates ~75% of group revenue and >80% of operating profit, anchoring high dividend yields.",
    "statusRating": "success",
    "statusRatingLabel": "海外利益比率80%超の高配当基盤確立",
    "enStatusRatingLabel": "Solidified >80% Overseas Profit & High Dividend Anchor",
    "officialSourceType": "EDINET_REPORT",
    "keyTags": [
      "海外売上75%",
      "高配当銘柄",
      "たばこメジャー",
      "JTIジュネーブ"
    ]
  },
  {
    "id": "seven-speedway",
    "announceYear": "2020年08月",
    "closeDate": "2021年05月",
    "exactAnnounceDate": "2020-08-03",
    "exactCloseDate": "2021-05-14",
    "buyerName": "セブン&アイ・ホールディングス (3382)",
    "buyerEnName": "Seven & i Holdings Co., Ltd. (3382)",
    "buyerCode": "3382",
    "buyerSector": "小売業・コンビニ",
    "buyerEnSector": "Retail & Convenience Stores",
    "targetName": "Speedway LLC (スピードウェイ / 米マラソン傘下)",
    "targetEnName": "Speedway LLC (Marathon Petroleum / United States)",
    "targetCountry": "米国",
    "targetEnCountry": "United States",
    "targetSector": "米コンビニ・GS併設店 (約3,800店)",
    "targetEnSector": "North American Convenience & Gas Stations (~3,800 stores)",
    "dealValueOku": 23000,
    "dealValueUsdBillion": 21,
    "scheme": "StockAcquisition",
    "schemeLabel": "全株現金買収",
    "enSchemeLabel": "100% Cash Acquisition",
    "dealType": "cross_border",
    "dealTypeLabel": "クロスボーダー (北米コンビニ首位固め)",
    "enDealTypeLabel": "Cross-Border (North America Retail Dominance)",
    "goodwillOku": 15000,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "米Marathon PetroleumからSpeedway事業の全持分を現金210億ドルで買収",
    "enConsiderationDetails": ".0 billion in cash paid to Marathon Petroleum Corporation",
    "financingMethod": "三井住友銀行等からの買収ブリッジローン ＋ 米ドル建社債発行 (約1.1兆円) ＋ SLB",
    "enFinancingMethod": "Bridge loans from SMBC + .95B senior notes offering + sale-and-leaseback",
    "valuationMultiples": {
      "evEbitda": "13.7x (シナジー後 7.1x)"
    },
    "officialFilingNumber": "TDnet適時開示「当社子会社によるSpeedwayの株式取得に関するお知らせ」",
    "timeline": [
      {
        "date": "2020-08-03",
        "enDate": "Aug 3, 2020",
        "event": "セブン&アイ子会社の7-Eleven, Inc.がSpeedwayの買収を発表",
        "enEvent": "7-Eleven, Inc. agrees to acquire Speedway LLC from Marathon Petroleum",
        "type": "announcement"
      },
      {
        "date": "2021-05-14",
        "enDate": "May 14, 2021",
        "event": "米連邦取引委員会 (FTC) の懸念表明の中、買収クロージング完了",
        "enEvent": "7-Eleven closes Speedway acquisition; proceeds to address FTC market remedies",
        "type": "closing"
      },
      {
        "date": "2021-06-25",
        "enDate": "Jun 25, 2021",
        "event": "FTCとの和解協定合意 (293店舗の売却を確約)",
        "enEvent": "7-Eleven reaches settlement with FTC, agreeing to divest 293 retail stores",
        "type": "antitrust_approval"
      }
    ],
    "advisors": {
      "buyerFA": "Nomura Securities / SMBC日興証券",
      "targetFA": "Barclays",
      "buyerLegal": "Akin Gump Strauss Hauer & Feld",
      "targetLegal": "Jones Day"
    },
    "strategicObjective": "北米コンビニ市場で店舗網を約14,000店へ拡大しシェア圧倒的No.1を確立。独自フード（FF）導入で粗利益率改善。",
    "enStrategicObjective": "Expand North American footprint to ~14,000 stores, cementing undisputed #1 market share.",
    "outcomeAndPmi": "北米7-Elevenの利益規模は大幅拡大したものの、巨額負債とインフレが重荷となり、クシュタール等からの買収提案・事業分離圧力に直面。",
    "enOutcomeAndPmi": "Substantially broadened US footprint, but heavy debt made Seven & i a target for takeover proposals.",
    "statusRating": "mixed",
    "statusRatingLabel": "北米首位確立も巨額負債と買収提案の火種に",
    "enStatusRatingLabel": "US Dominance Achieved but Triggered Takeover Pressures",
    "officialSourceType": "TDNET_TIMELY",
    "keyTags": [
      "北米コンビニNo.1",
      "巨額のれん",
      "アクティビスト攻防",
      "クシュタール対抗"
    ]
  },
  {
    "id": "nidec-continuous-ma",
    "announceYear": "2021年08月",
    "closeDate": "2023年03月",
    "exactAnnounceDate": "2021-08-02",
    "exactCloseDate": "2021-08-02",
    "buyerName": "ニデック (6594 / 旧日本電産)",
    "buyerEnName": "NIDEC CORPORATION (6594)",
    "buyerCode": "6594",
    "buyerSector": "精密小型モーター・工作機械",
    "buyerEnSector": "Precision Motors & Machine Tools",
    "targetName": "三菱重工工作機械 / OKK / PAMA (伊)",
    "targetEnName": "Mitsubishi Heavy Industries Machine Tool / OKK / PAMA (Italy)",
    "targetCountry": "日本・イタリア",
    "targetEnCountry": "Japan / Italy",
    "targetSector": "大型門形加工機・歯車工作機械",
    "targetEnSector": "Heavy Machine Tools & Gear Grinding Machinery",
    "dealValueOku": 1200,
    "dealValueUsdBillion": 1.1,
    "scheme": "StockAcquisition",
    "schemeLabel": "事業譲受 ＆ 株式取得",
    "enSchemeLabel": "Asset Purchase & Stock Acquisition",
    "dealType": "domestic_mega",
    "dealTypeLabel": "ロールアップ型連続M&A",
    "enDealTypeLabel": "Serial Roll-Up M&A Track Record",
    "goodwillOku": 450,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "三菱重工業からの事業譲受・全株式取得 (現ニデックマシンツール)",
    "enConsiderationDetails": "100% equity acquisition and business transfer from Mitsubishi Heavy Industries",
    "financingMethod": "ニデックの自己資金 (営業キャッシュフロー)",
    "enFinancingMethod": "Internal operating cash flows of Nidec Corporation",
    "valuationMultiples": {
      "evEbitda": "約8.5x"
    },
    "officialFilingNumber": "TDnet適時開示「三菱重工工作機械株式会社の株式取得完了に関するお知らせ」",
    "timeline": [
      {
        "date": "2021-02-05",
        "enDate": "Feb 5, 2021",
        "event": "ニデックが三菱重工工作機械の買収契約を締結と発表",
        "enEvent": "Nidec enters into stock purchase agreement for MHI Machine Tool",
        "type": "announcement"
      },
      {
        "date": "2021-08-02",
        "enDate": "Aug 2, 2021",
        "event": "買収完了、「ニデックマシンツール株式会社」として商号変更・発足",
        "enEvent": "Acquisition finalized; renamed Nidec Machine Tool Corporation",
        "type": "closing"
      },
      {
        "date": "2022-02-01",
        "enDate": "Feb 1, 2022",
        "event": "老舗工作機械メーカーOKKを第三者割当増資引き受けで子会社化",
        "enEvent": "Acquires control of OKK Corporation via third-party allotment",
        "type": "closing"
      },
      {
        "date": "2022-11-30",
        "enDate": "Nov 30, 2022",
        "event": "イタリアの超大型工作機械名門PAMA社の全株式取得契約締結",
        "enEvent": "Agrees to acquire 100% shares of Italian heavy machine tool maker PAMA S.p.A.",
        "type": "announcement"
      },
      {
        "date": "2023-03-31",
        "enDate": "Mar 31, 2023",
        "event": "PAMA社の買収クロージング完了 (ニデック工作機械連合が完成)",
        "enEvent": "Closes PAMA acquisition, completing Nidec’s global machine tool alliance",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "自社インハウスM&Aチーム",
      "targetFA": "三菱UFJモルガン・スタンレー",
      "buyerLegal": "西村あさひ法律事務所",
      "targetLegal": "長島・大野・常松法律事務所"
    },
    "strategicObjective": "EV用トラクションモーター「E-Axle」の歯車・内製加工技術を確立するため工作機械大手各社を連続ロールアップ。",
    "enStrategicObjective": "Execute Shigenobu Nagamori’s serial M&A formula (>70 career acquisitions) to master internal EV gear machining.",
    "outcomeAndPmi": "買収した赤字各社を即座に再編・黒字化。工作機械事業単体で売上1,000億円超・高営業利益率事業へと育成。",
    "enOutcomeAndPmi": "Turned around targets rapidly, building a ¥100B+ machine tool division delivering resilient double-digit operating margins.",
    "statusRating": "success",
    "statusRatingLabel": "70社超の連続ロールアップ・即座黒字化",
    "enStatusRatingLabel": "Serial Roll-Up Success (>70 Historical Deals)",
    "officialSourceType": "TDNET_TIMELY",
    "keyTags": [
      "連続M&A",
      "永守重信",
      "工作機械ロールアップ",
      "E-Axle内製化"
    ]
  },
  {
    "id": "mercari-origami",
    "announceYear": "2020年01月",
    "closeDate": "2020年02月",
    "exactAnnounceDate": "2020-01-23",
    "exactCloseDate": "2020-02-25",
    "buyerName": "メルカリ (4385)",
    "buyerEnName": "Mercari, Inc. (4385)",
    "buyerCode": "4385",
    "buyerSector": "フリマアプリ・Fintech",
    "buyerEnSector": "C2C Marketplace & Fintech (Merpay)",
    "targetName": "Origami (オリガミ / スマホ決済パイオニア)",
    "targetEnName": "Origami Inc. (Mobile QR Payment Pioneer)",
    "targetCountry": "日本",
    "targetEnCountry": "Japan",
    "targetSector": "スマホQR決済・加盟店網",
    "targetEnSector": "Mobile QR Payment Network",
    "dealValueOku": 1,
    "dealValueUsdBillion": 0.001,
    "scheme": "StockAcquisition",
    "schemeLabel": "全株株式取得 (事業救済型M&A)",
    "enSchemeLabel": "100% Stock Acquisition (Distressed Rescue)",
    "dealType": "startup_tech",
    "dealTypeLabel": "スタートアップM&A / 救済統合",
    "enDealTypeLabel": "Startup M&A / Rescue Consolidation",
    "goodwillOku": 0,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "メルカリ子会社のメルペイがOrigamiの発行済全株式を実質1円で取得 (負債・信用引き受け)",
    "enConsiderationDetails": "100% share acquisition for a nominal consideration (~¥1) by Merpay, absorbing liabilities and rails",
    "financingMethod": "自己資金",
    "enFinancingMethod": "Internal funds",
    "officialFilingNumber": "TDnet適時開示「株式会社Origamiの株式取得（子会社化）に関するお知らせ」",
    "timeline": [
      {
        "date": "2020-01-23",
        "enDate": "Jan 23, 2020",
        "event": "メルカリ子会社のメルペイがOrigamiの全株式取得を発表",
        "enEvent": "Merpay announces agreement to acquire 100% of Origami Inc.",
        "type": "announcement"
      },
      {
        "date": "2020-02-25",
        "enDate": "Feb 25, 2020",
        "event": "株式譲渡実行・クロージング完了 (Origamiがメルカリ傘下へ)",
        "enEvent": "Share transfer finalized; Origami formally becomes Merpay subsidiary",
        "type": "closing"
      },
      {
        "date": "2020-06-30",
        "enDate": "Jun 30, 2020",
        "event": "Origami Payサービス終了・メルペイ加盟店網へ統合完了",
        "enEvent": "Origami Pay service retired; full integration into Merpay network completed",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "インハウス",
      "targetFA": "インハウス",
      "buyerLegal": "森・濱田松本法律事務所",
      "targetLegal": "STORIA法律事務所"
    },
    "strategicObjective": "スマホ決済の草分けOrigamiの地域信金ネットワークおよび2万社超の加盟店網を「メルペイ」へ統合し、オフライン決済基盤を急速拡大。",
    "enStrategicObjective": "Absorb pioneer QR payment startup Origami’s merchant network into Merpay to rapidly scale offline transactions.",
    "outcomeAndPmi": "加盟店基盤とエンジニア人材をメルペイに吸収し、現在メルペイは営業黒字化・クレジット決済の主力柱へ定着。",
    "enOutcomeAndPmi": "Absorbed engineers and merchant rails to turn Merpay into a profitable consumer credit engine.",
    "statusRating": "success",
    "statusRatingLabel": "実質1円での救済統合・メルペイ加盟店網拡大",
    "enStatusRatingLabel": "Distressed Asset Acquisition & Rails Integration",
    "officialSourceType": "TDNET_TIMELY",
    "keyTags": [
      "スタートアップM&A",
      "メルペイ",
      "QR決済再編",
      "事業救済"
    ]
  },
  {
    "id": "gunosy-game8",
    "announceYear": "2015年12月",
    "closeDate": "2015年12月",
    "exactAnnounceDate": "2015-12-18",
    "exactCloseDate": "2015-12-25",
    "buyerName": "Gunosy (6047)",
    "buyerEnName": "Gunosy Inc. (6047)",
    "buyerCode": "6047",
    "buyerSector": "ニュース・情報メディア",
    "buyerEnSector": "Digital News & Media Platform",
    "targetName": "ゲームエイト (game8 / ゲーム攻略)",
    "targetEnName": "Game8, Inc. (Gaming Wiki & Strategy Media)",
    "targetCountry": "日本",
    "targetEnCountry": "Japan",
    "targetSector": "国内最大級ゲーム攻略サイト・メディア",
    "targetEnSector": "Leading Mobile Gaming Strategy Media",
    "dealValueOku": 10,
    "dealValueUsdBillion": 0.009,
    "scheme": "StockAcquisition",
    "schemeLabel": "株式取得 ＋ アーンアウト (51%取得 ➔ 100%子会社化)",
    "enSchemeLabel": "Stock Acquisition + Earn-Out (51% ➔ 100%)",
    "dealType": "small_deal",
    "dealTypeLabel": "🌱 スモールM&A (創業2年・神ディール)",
    "enDealTypeLabel": "🌱 Small M&A (Startup Home-Run Deal)",
    "goodwillOku": 7,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "当初51%株式を約5.5億円で取得、その後業績達成に応じたアーンアウトで完全子会社化 (総額約10億円)",
    "enConsiderationDetails": "Initial 51% acquired for ~¥550M, scaled to 100% via performance-linked earn-outs (Total ~¥1.0B)",
    "financingMethod": "Gunosyの手元資金 (IPO調達資金)",
    "enFinancingMethod": "Internal IPO proceeds of Gunosy",
    "valuationMultiples": {
      "evEbitda": "約4.5x (買収当時)"
    },
    "officialFilingNumber": "TDnet適時開示「株式会社ゲームエイトの株式取得（子会社化）に関するお知らせ」",
    "timeline": [
      {
        "date": "2015-12-18",
        "enDate": "Dec 18, 2015",
        "event": "Gunosyがゲームエイトの株式51%取得を発表 (子会社化契約)",
        "enEvent": "Gunosy announces agreement to acquire 51% stake in Game8",
        "type": "announcement"
      },
      {
        "date": "2015-12-25",
        "enDate": "Dec 25, 2015",
        "event": "株式譲渡実行・クロージング完了",
        "enEvent": "Share transfer executed and deal closed",
        "type": "closing"
      },
      {
        "date": "2017-09-29",
        "enDate": "Sep 29, 2017",
        "event": "残る49%を追加取得し100%完全子会社化 (創業社長アーンアウト達成)",
        "enEvent": "Acquires remaining 49% to reach 100% ownership under earn-out formula",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "インハウス",
      "targetFA": "インハウス",
      "buyerLegal": "森・濱田松本法律事務所",
      "targetLegal": "AZX総合法律事務所"
    },
    "strategicObjective": "ニュースアプリ単一依存から脱却するため、熱量の高いゲーマー層が集まる国内最大級のゲーム攻略メディアを獲得。アドネットワーク広告の相互送客シナジー。",
    "enStrategicObjective": "Diversify away from news app reliance by acquiring top gaming strategy wiki Game8, leveraging Gunosy Ads network.",
    "outcomeAndPmi": "買収後、SEOと広告最適化でPV数が爆発的に急伸。買収時売上数千万円から年商数十億円・年間営業利益10億円超を叩き出すGunosyグループ最大の稼ぎ頭へ化け、初期投資10億円をわずか数年で回収したスモールM&Aの最高傑作。",
    "enOutcomeAndPmi": "Scaled from tens of millions in revenue to ¥5B+ revenue and >¥1B operating profit, recovering the entire ¥1B acquisition cost within years as Gunosy's primary profit engine.",
    "statusRating": "mega_success",
    "statusRatingLabel": "投資額10億円 ➔ 累計利益数十倍のスモール神ディール",
    "enStatusRatingLabel": "Legendary Small Deal: >10x Profit Payback",
    "officialSourceType": "TDNET_TIMELY",
    "keyTags": [
      "スモールM&A",
      "アーンアウト",
      "ゲーム攻略",
      "Gunosy最高益"
    ]
  },
  {
    "id": "kddi-soracom",
    "announceYear": "2017年08月",
    "closeDate": "2017年08月",
    "exactAnnounceDate": "2017-08-02",
    "exactCloseDate": "2017-08-24",
    "buyerName": "KDDI (9433)",
    "buyerEnName": "KDDI CORPORATION (9433)",
    "buyerCode": "9433",
    "buyerSector": "電気通信事業",
    "buyerEnSector": "Telecommunications & Cloud Solutions",
    "targetName": "ソラコム (SORACOM / IoT通信プラットフォーム)",
    "targetEnName": "SORACOM, INC. (IoT Connectivity Platform)",
    "targetCountry": "日本",
    "targetEnCountry": "Japan",
    "targetSector": "グローバルIoT向けセルラー通信・クラウドSIM",
    "targetEnSector": "Global IoT Cellular Connectivity & Cloud SIM",
    "dealValueOku": 200,
    "dealValueUsdBillion": 0.18,
    "scheme": "StockAcquisition",
    "schemeLabel": "株式取得による子会社化 (スイングバイモデル)",
    "enSchemeLabel": "Stock Acquisition (Swing-By Startup Model)",
    "dealType": "small_deal",
    "dealTypeLabel": "🌱 スタートアップM&A (スイングバイIPO)",
    "enDealTypeLabel": "🌱 Startup M&A (Swing-By IPO Model)",
    "goodwillOku": 150,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "創業者およびVC（ジャフコ・WiL等）から全株式を現金約200億円で買収",
    "enConsiderationDetails": "100% all-cash buyout for ~¥20.0B from founders and VC funds (JAFCO, WiL, etc.)",
    "financingMethod": "KDDIの手元自己資金",
    "enFinancingMethod": "KDDI internal cash reserves",
    "valuationMultiples": {
      "evEbitda": "創業2年未満での大型テック評価"
    },
    "officialFilingNumber": "TDnet適時開示「株式会社ソラコムの株式取得（子会社化）について」",
    "timeline": [
      {
        "date": "2017-08-02",
        "enDate": "Aug 2, 2017",
        "event": "KDDIがソラコムの全株式を取得し子会社化すると発表 (創業2年・200億円ディール)",
        "enEvent": "KDDI announces acquisition of SORACOM for ~¥20B just 2 years after founding",
        "type": "announcement"
      },
      {
        "date": "2017-08-24",
        "enDate": "Aug 24, 2017",
        "event": "株式取得完了・クロージング",
        "enEvent": "Acquisition closed and finalized",
        "type": "closing"
      },
      {
        "date": "2024-03-26",
        "enDate": "Mar 26, 2024",
        "event": "ソラコムが東証グロース市場へスイングバイIPO (初値公開価格比+77%)",
        "enEvent": "SORACOM IPOs on Tokyo Growth Market under Swing-By model (+77% over IPO price)",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "野村證券",
      "targetFA": "PwCアドバイザリー",
      "buyerLegal": "森・濱田松本法律事務所",
      "targetLegal": "創・佐藤法律事務所"
    },
    "strategicObjective": "世界180カ国以上で利用可能なIoT通信・クラウドネイティブプラットフォームをKDDIの大企業通信基盤と融合。",
    "enStrategicObjective": "Combine SORACOM's cloud-native IoT SIM connectivity across 180+ countries with KDDI's massive enterprise network.",
    "outcomeAndPmi": "KDDIの資本力で海外展開を加速しつつ独立性を維持。2024年3月に大企業傘下から「スイングバイIPO」を実現し時価総額400億円超を形成。",
    "enOutcomeAndPmi": "Leveraged KDDI balance sheet while maintaining startup autonomy, culminating in Japan's landmark Swing-By IPO in 2024 at >¥40B market cap.",
    "statusRating": "mega_success",
    "statusRatingLabel": "創業2年で200億M&A ➔ 2024年スイングバイIPO達成",
    "enStatusRatingLabel": "¥20B Startup Buyout ➔ 2024 Swing-By IPO Success",
    "officialSourceType": "TDNET_TIMELY",
    "keyTags": [
      "スイングバイIPO",
      "IoTクラウド",
      "KDDI",
      "玉川憲"
    ]
  },
  {
    "id": "shift-small-rollups",
    "announceYear": "2019年〜2024年",
    "closeDate": "継続中",
    "exactAnnounceDate": "2019-10-15",
    "exactCloseDate": "2024-08-31",
    "buyerName": "SHIFT (3697)",
    "buyerEnName": "SHIFT Inc. (3697)",
    "buyerCode": "3697",
    "buyerSector": "ソフトウェアテスト・品質保証",
    "buyerEnSector": "Software Quality Assurance & IT Solutions",
    "targetName": "中小IT受託・SES・開発会社各社 (累計35社超)",
    "targetEnName": "Small/Mid IT & SES Development Firms (>35 Targets)",
    "targetCountry": "日本",
    "targetEnCountry": "Japan",
    "targetSector": "中小SIer・受託システム開発・後継者不在IT企業",
    "targetEnSector": "Small Boutique Software Dev & Staffing Firms",
    "dealValueOku": 15,
    "dealValueUsdBillion": 0.014,
    "scheme": "StockAcquisition",
    "schemeLabel": "1件あたり数億〜20億円の中小連続株式取得 (事業承継型M&A)",
    "enSchemeLabel": "Serial Small Buyouts (¥300M~¥2.0B per deal / Successions)",
    "dealType": "small_deal",
    "dealTypeLabel": "🌱 スモールロールアップ (累計35社超)",
    "enDealTypeLabel": "🌱 Serial Small Roll-Ups (>35 Acquisitions)",
    "goodwillOku": 10,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "1件あたり3億〜20億円程度の現金買収＋一部株式対価 (累計買収総額300億円超)",
    "enConsiderationDetails": "¥300M ~ ¥2.0B per transaction in cash & equity (>¥30B aggregate across 35+ deals)",
    "financingMethod": "SHIFTの営業キャッシュフロー ＋ 銀行借入枠",
    "enFinancingMethod": "SHIFT operating cash flows + bank credit lines",
    "valuationMultiples": {
      "evEbitda": "約4x〜7x (適正スモールディール水準)"
    },
    "officialFilingNumber": "TDnet適時開示「株式取得（子会社化）に関するお知らせ」各号",
    "timeline": [
      {
        "date": "2019-10-15",
        "enDate": "Oct 15, 2019",
        "event": "SHIFTが本格的な中小IT企業ロールアップM&A戦略を中期経営計画「SHIFT1000」で発表",
        "enEvent": "SHIFT unveils aggressive small IT roll-up M&A strategy under SHIFT1000 vision",
        "type": "announcement"
      },
      {
        "date": "2021-04-01",
        "enDate": "Apr 1, 2021",
        "event": "中小SIer各社のPMIフレームワーク「SHIFT標準（営業・単価引き上げ）」を体系化",
        "enEvent": "Standardizes post-merger integration playbook to double target engineer bill rates",
        "type": "closing"
      },
      {
        "date": "2024-08-31",
        "enDate": "Aug 31, 2024",
        "event": "累計買収企業数が35社を突破、グループエンジニア数1万人超へ成長",
        "enEvent": "Crosses 35 completed acquisitions, expanding group engineers to over 10,000",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "SHIFT社内M&Aチーム (自社ソーシング)",
      "targetFA": "日本M&Aセンター / 各種仲介",
      "buyerLegal": "森・濱田松本法律事務所",
      "targetLegal": "各種法律事務所"
    },
    "strategicObjective": "下請け構造で低単価に苦しむ中小SES・開発会社を買収し、SHIFTの直請けプライム単価を適用してエンジニア給与と利益率を倍増。",
    "enStrategicObjective": "Roll up fragmented small IT shops struggling with succession, upgrading them to SHIFT's prime customer contracts.",
    "outcomeAndPmi": "買収した中小企業の営業利益率が買収前の数%から15〜20%へ急改善。売上高1,000億円超・営業利益100億円超へ急成長する原動力に。",
    "enOutcomeAndPmi": "Boosted targets' operating margins from single digits to 15-20%, propelling SHIFT past ¥100B revenue and ¥10B operating profit.",
    "statusRating": "mega_success",
    "statusRatingLabel": "中小35社を連続買収・単価引き上げで利益率倍増",
    "enStatusRatingLabel": "Masterclass in Small Roll-Ups: 35+ Deals, Margin 2x",
    "officialSourceType": "TDNET_TIMELY",
    "keyTags": [
      "スモールロールアップ",
      "中小事業承継",
      "エンジニア単価改善",
      "SHIFT丹下流"
    ]
  },
  {
    "id": "moneyforward-smartcamp",
    "announceYear": "2019年11月",
    "closeDate": "2019年11月",
    "exactAnnounceDate": "2019-11-13",
    "exactCloseDate": "2019-11-28",
    "buyerName": "マネーフォワード (3994)",
    "buyerEnName": "Money Forward, Inc. (3994)",
    "buyerCode": "3994",
    "buyerSector": "SaaS・Fintech",
    "buyerEnSector": "Enterprise Cloud ERP & Fintech",
    "targetName": "スマートキャンプ (BOXIL / SaaS比較メディア)",
    "targetEnName": "SMARTCAMP Co., Ltd. (BOXIL SaaS Platform)",
    "targetCountry": "日本",
    "targetEnCountry": "Japan",
    "targetSector": "SaaSマーケティング・比較プラットフォーム「BOXIL」",
    "targetEnSector": "B2B SaaS Comparison & Lead Gen Platform (BOXIL)",
    "dealValueOku": 20,
    "dealValueUsdBillion": 0.018,
    "scheme": "StockAcquisition",
    "schemeLabel": "株式取得による子会社化 (約70%取得 ➔ 100%)",
    "enSchemeLabel": "Stock Acquisition (Initial 70% ➔ 100%)",
    "dealType": "small_deal",
    "dealTypeLabel": "🌱 SaaSスタートアップM&A",
    "enDealTypeLabel": "🌱 B2B SaaS Startup Buyout",
    "goodwillOku": 16,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "スマートキャンプ発行済株式の約70%を約14億円で取得、その後完全子会社化 (総額約20億円)",
    "enConsiderationDetails": "Acquired ~70% for ~¥1.4B, subsequently increasing to 100% (Total valuation ~¥2.0B)",
    "financingMethod": "手元自己資金 ＋ 銀行借入",
    "enFinancingMethod": "Internal cash + short-term bank financing",
    "valuationMultiples": {
      "evEbitda": "SaaSマルチプル (ARR成長率ベース評価)"
    },
    "officialFilingNumber": "TDnet適時開示「スマートキャンプ株式会社の株式取得（子会社化）に関するお知らせ」",
    "timeline": [
      {
        "date": "2019-11-13",
        "enDate": "Nov 13, 2019",
        "event": "マネーフォワードがスマートキャンプの子会社化を発表 (約20億円ディール)",
        "enEvent": "Money Forward announces acquisition of SMARTCAMP for ~¥2.0B",
        "type": "announcement"
      },
      {
        "date": "2019-11-28",
        "enDate": "Nov 28, 2019",
        "event": "株式譲受実行・クロージング",
        "enEvent": "Share acquisition completed and closed",
        "type": "closing"
      },
      {
        "date": "2022-09-01",
        "enDate": "Sep 1, 2022",
        "event": "インサイドセールスSaaS「BALES」等を含むクロスセルシナジーが拡大",
        "enEvent": "Scales cross-selling synergies across Money Forward Cloud ERP and BALES Cloud",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "インハウス",
      "targetFA": "インハウス",
      "buyerLegal": "森・濱田松本法律事務所",
      "targetLegal": "AZX総合法律事務所"
    },
    "strategicObjective": "国内最大級のSaaS比較プラットフォーム「BOXIL」を獲得し、マネーフォワードクラウドのリード獲得コスト（CAC）を大幅削減。",
    "enStrategicObjective": "Acquire BOXIL to slash Money Forward CAC while entering B2B marketing tech.",
    "outcomeAndPmi": "スマートキャンプ創業者古橋氏が執行役員就任。BOXILのリード獲得力とERPが強力連動し、SaaSマーケティング事業として急拡大。",
    "enOutcomeAndPmi": "Founder joined executive team; BOXIL significantly enhanced inbound lead pipeline for Money Forward Cloud ERP.",
    "statusRating": "success",
    "statusRatingLabel": "SaaSエコシステム統合・リード獲得シナジー",
    "enStatusRatingLabel": "SaaS Ecosystem Synergy & Lower CAC",
    "officialSourceType": "TDNET_TIMELY",
    "keyTags": [
      "SaaS M&A",
      "BOXIL",
      "マネーフォワード",
      "CAC削減"
    ]
  },
  {
    "id": "dena-iemo-peroli",
    "announceYear": "2014年10月",
    "closeDate": "2014年10月",
    "exactAnnounceDate": "2014-10-01",
    "exactCloseDate": "2014-10-01",
    "buyerName": "ディー・エヌ・エー (2432)",
    "buyerEnName": "DeNA Co., Ltd. (2432)",
    "buyerCode": "2432",
    "buyerSector": "ゲーム・インターネットサービス",
    "buyerEnSector": "Gaming & Internet Media",
    "targetName": "ペロリ (MERY) ＆ iemo (住まいキュレーション)",
    "targetEnName": "Peroli Inc. (MERY) & iemo Co., Ltd.",
    "targetCountry": "日本",
    "targetEnCountry": "Japan",
    "targetSector": "女性向けファッション・住まいキュレーションメディア",
    "targetEnSector": "Lifestyle & Curated Media Platforms",
    "dealValueOku": 50,
    "dealValueUsdBillion": 0.046,
    "scheme": "StockAcquisition",
    "schemeLabel": "2社同時全株買収 (ペロリ約35億円 ＋ iemo約15億円)",
    "enSchemeLabel": "Simultaneous 100% Buyout (Peroli ~¥3.5B + iemo ~¥1.5B)",
    "dealType": "small_deal",
    "dealTypeLabel": "🌱 スタートアップM&A (デューデリ・PMI教訓)",
    "enDealTypeLabel": "🌱 Startup M&A (DD & Governance Lessons)",
    "goodwillOku": 45,
    "stakeBefore": "0.0%",
    "stakeAfter": "100.0%",
    "considerationDetails": "ペロリ全株を約35億円、iemo全株を約15億円の現金で同時買収 (創業間もない2社に計50億円)",
    "enConsiderationDetails": "100% all-cash buyout for Peroli (~¥3.5B) and iemo (~¥1.5B), totaling ~¥5.0B for early-stage startups",
    "financingMethod": "DeNAの手元資金",
    "enFinancingMethod": "DeNA internal cash reserves",
    "valuationMultiples": {
      "evEbitda": "月間PV急成長に基づくプレバリュエーション"
    },
    "officialFilingNumber": "TDnet適時開示「キュレーションプラットフォーム事業の展開について」",
    "timeline": [
      {
        "date": "2014-10-01",
        "enDate": "Oct 1, 2014",
        "event": "DeNAがペロリとiemoの2社を合計約50億円で買収し子会社化と発表",
        "enEvent": "DeNA announces simultaneous ~¥5B buyout of Peroli and iemo",
        "type": "announcement"
      },
      {
        "date": "2016-12-07",
        "enDate": "Dec 7, 2016",
        "event": "WELQ等の記事品質・著作権問題を受け全10キュレーションメディアを非公開化",
        "enEvent": "Shuts down all 10 curation media due to copyright & content inaccuracies (WELQ issue)",
        "type": "closing"
      },
      {
        "date": "2017-03-13",
        "enDate": "Mar 13, 2017",
        "event": "第三者委員会報告書公表、巨額のれん減損損失計上とガバナンス刷新",
        "enEvent": "Third-party investigation released; full goodwill impairment recognized",
        "type": "closing"
      }
    ],
    "advisors": {
      "buyerFA": "インハウス",
      "targetFA": "B Dash Ventures",
      "buyerLegal": "森・濱田松本法律事務所",
      "targetLegal": "AZX総合法律事務所"
    },
    "strategicObjective": "ゲーム事業に続く柱として、若い女性層に熱狂的人気だったMERY等を50億円で買収。",
    "enStrategicObjective": "Establish curated media as DeNA's second pillar by acquiring viral lifestyle platforms MERY and iemo.",
    "outcomeAndPmi": "PV至上主義による著作権侵害・医療誤情報（WELQ問題）が噴出し全サイト閉鎖。日本のM&A実務における法務・コンプライアンスDDとガバナンスの重要教訓に。",
    "enOutcomeAndPmi": "Hyper-growth SEO tactics caused massive copyright issues (WELQ scandal), leading to shutdowns and total impairment—becoming Japan's quintessential M&A governance case study.",
    "statusRating": "struggled",
    "statusRatingLabel": "全サイト閉鎖・M&AガバナンスとDDの重要教訓",
    "enStatusRatingLabel": "Full Impairment & Quintessential DD Case Study",
    "officialSourceType": "TDNET_TIMELY",
    "keyTags": [
      "スモールM&A教訓",
      "WELQ問題",
      "ガバナンス",
      "デューデリジェンス"
    ]
  }
];
