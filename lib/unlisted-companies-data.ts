export interface UnlistedCompanyItemData {
  slug: string;
  name: string;
  industry: string;
  establishedYear: number;
  corporateNumber: string;
  representative: string;
}

export const UNLISTED_COMPANIES_DATA: UnlistedCompanyItemData[] = [
  { slug: 'shueisha', name: '株式会社集英社', industry: '総合出版・マンガIP', establishedYear: 1926, corporateNumber: '4010001008776', representative: '廣野 眞一' },
  { slug: 'kodansha', name: '株式会社講談社', industry: '総合出版・マンガIP', establishedYear: 1909, corporateNumber: '8010001008772', representative: '野間 省伸' },
  { slug: 'shogakukan', name: '株式会社小学館', industry: '総合出版・教育コンテンツ', establishedYear: 1922, corporateNumber: '6010001008774', representative: '相賀 信宏' },
  { slug: 'nikkei', name: '株式会社日本経済新聞社', industry: '新聞・経済情報・メディア', establishedYear: 1876, corporateNumber: '7010001010373', representative: '長谷部 剛' },
  { slug: 'yomiuri', name: '株式会社読売新聞グループ本社', industry: '新聞・マスメディア・不動産', establishedYear: 1874, corporateNumber: '1010001008770', representative: '山口 寿一' },
  { slug: 'asahi', name: '株式会社朝日新聞社', industry: '新聞・マスメディア・文化事業', establishedYear: 1879, corporateNumber: '3010001008769', representative: '角田 克' },
  { slug: 'preferred-networks', name: '株式会社Preferred Networks', industry: 'AI・深層学習基盤モデル', establishedYear: 2014, corporateNumber: '8010001160351', representative: '西川 徹' },
  { slug: 'smarthr', name: '株式会社SmartHR', industry: 'クラウド人事労務SaaS', establishedYear: 2013, corporateNumber: '6010401103759', representative: '芹澤 雅人' },
  { slug: 'spiber', name: 'Spiber株式会社', industry: '構造タンパク質・バイオ素材', establishedYear: 2007, corporateNumber: '1390001008779', representative: '関山 霖' },
  { slug: 'caddi', name: 'キャディ株式会社', industry: '製造業受発注DX・図面AI', establishedYear: 2017, corporateNumber: '3010001189422', representative: '加藤 勇晃' },
  { slug: 'andpad', name: '株式会社アンドパッド', industry: '建築・施工管理DXクラウド', establishedYear: 2016, corporateNumber: '7010401108226', representative: '稲田 武夫' },
  { slug: 'luup', name: '株式会社LUUP', industry: '電動モビリティ・シェアリング', establishedYear: 2018, corporateNumber: '3011001131758', representative: '岡井 大輝' },
  { slug: 'suntory-hd', name: 'サントリーホールディングス株式会社', industry: '清涼飲料・酒類・グローバル食品', establishedYear: 1899, corporateNumber: '7120001138859', representative: '新浪 剛史' },
  { slug: 'takenaka', name: '株式会社竹中工務店', industry: '総合建設・スーパーゼネコン', establishedYear: 1610, corporateNumber: '8120001058694', representative: '佐々木 正人' },
  { slug: 'ykk', name: 'YKK株式会社', industry: 'ファスナー・精密機械・建材', establishedYear: 1934, corporateNumber: '7010001007281', representative: '大谷 裕明' },
  { slug: 'sky', name: 'Ｓｋｙ株式会社', industry: 'ソフトウェア開発・情報セキュリティ', establishedYear: 1985, corporateNumber: '1120001053457', representative: '大浦 淳司' },
  { slug: 'dmm', name: '合同会社DMM.com', industry: '総合デジタルエンタメ・プラットフォーム', establishedYear: 1999, corporateNumber: '3010003002660', representative: '村中 悠介' },
];
