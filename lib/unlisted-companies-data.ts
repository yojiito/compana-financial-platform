export interface UnlistedCompanyItemData {
  slug: string;
  name: string;
  industry: string;
  establishedYear: number;
  corporateNumber: string;
  representative: string;
}

export const UNLISTED_COMPANIES_DATA: UnlistedCompanyItemData[] = [
  { slug: 'shueisha', name: '株式会社集英社', industry: '総合出版・マンガIP', establishedYear: 1926, corporateNumber: '5010001018556', representative: '廣野 眞一' },
  { slug: 'kodansha', name: '株式会社講談社', industry: '総合出版・マンガIP', establishedYear: 1909, corporateNumber: '5010001002592', representative: '野間 省伸' },
  { slug: 'shogakukan', name: '株式会社小学館', industry: '総合出版・教育コンテンツ', establishedYear: 1922, corporateNumber: '6010001018919', representative: '相賀 信宏' },
  { slug: 'nikkei', name: '株式会社日本経済新聞社', industry: '新聞・経済情報・メディア', establishedYear: 1876, corporateNumber: '3010001033086', representative: '長谷部 剛' },
  { slug: 'yomiuri', name: '株式会社読売新聞グループ本社', industry: '新聞・マスメディア・不動産', establishedYear: 1874, corporateNumber: '7010001031722', representative: '山口 寿一' },
  { slug: 'asahi', name: '株式会社朝日新聞社', industry: '新聞・マスメディア・文化事業', establishedYear: 1879, corporateNumber: '6120001059605', representative: '角田 克' },
  { slug: 'preferred-networks', name: '株式会社Preferred Networks', industry: 'AI・深層学習基盤モデル', establishedYear: 2014, corporateNumber: '1010001159494', representative: '西川 徹' },
  { slug: 'smarthr', name: '株式会社SmartHR', industry: 'クラウド人事労務SaaS', establishedYear: 2013, corporateNumber: '2011001093311', representative: '芹澤 雅人' },
  { slug: 'spiber', name: 'Spiber株式会社', industry: '構造タンパク質・バイオ素材', establishedYear: 2007, corporateNumber: '3390001018272', representative: '関山 霖' },
  { slug: 'caddi', name: 'キャディ株式会社', industry: '製造業受発注DX・図面AI', establishedYear: 2017, corporateNumber: '6010001187623', representative: '加藤 勇晃' },
  { slug: 'andpad', name: '株式会社アンドパッド', industry: '建築・施工管理DXクラウド', establishedYear: 2016, corporateNumber: '4010403009022', representative: '稲田 武夫' },
  { slug: 'luup', name: '株式会社LUUP', industry: '電動モビリティ・シェアリング', establishedYear: 2018, corporateNumber: '1011001123515', representative: '岡井 大輝' },
  { slug: 'suntory-hd', name: 'サントリーホールディングス株式会社', industry: '清涼飲料・酒類・グローバル食品', establishedYear: 1899, corporateNumber: '3120001136159', representative: '新浪 剛史' },
  { slug: 'takenaka', name: '株式会社竹中工務店', industry: '総合建設・スーパーゼネコン', establishedYear: 1610, corporateNumber: '8120001058694', representative: '佐々木 正人' },
  { slug: 'ykk', name: 'YKK株式会社', industry: 'ファスナー・精密機械・建材', establishedYear: 1934, corporateNumber: '7010001007281', representative: '大谷 裕明' },
  { slug: 'sky', name: 'Ｓｋｙ株式会社', industry: 'ソフトウェア開発・情報セキュリティ', establishedYear: 1985, corporateNumber: '1120001053457', representative: '大浦 淳司' },
  { slug: 'dmm', name: '合同会社DMM.com', industry: '総合デジタルエンタメ・プラットフォーム', establishedYear: 1999, corporateNumber: '3010003002660', representative: '村中 悠介' },
];
