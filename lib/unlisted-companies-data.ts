export interface UnlistedCompanyItemData {
  slug: string;
  name: string;
  industry: string;
  establishedYear: number;
  corporateNumber: string;
  representative: string;
}

export const UNLISTED_COMPANIES_DATA: UnlistedCompanyItemData[] = [
  // 📚 総合出版・メディア
  { slug: 'shueisha', name: '株式会社集英社', industry: '総合出版・マンガIP', establishedYear: 1926, corporateNumber: '5010001018556', representative: '廣野 眞一' },
  { slug: 'kodansha', name: '株式会社講談社', industry: '総合出版・マンガIP', establishedYear: 1909, corporateNumber: '5010001002592', representative: '野間 省伸' },
  { slug: 'shogakukan', name: '株式会社小学館', industry: '総合出版・教育コンテンツ', establishedYear: 1922, corporateNumber: '6010001018919', representative: '相賀 信宏' },
  { slug: 'shinchosha', name: '株式会社新潮社', industry: '総合出版・文芸・コミック', establishedYear: 1896, corporateNumber: '1011101009060', representative: '佐藤 隆信' },
  { slug: 'bungeishunju', name: '株式会社文藝春秋', industry: '総合出版・ジャーナリズム', establishedYear: 1923, corporateNumber: '1010001027998', representative: '飯窪 成幸' },
  { slug: 'akitashoten', name: '株式会社秋田書店', industry: '出版・マンガエンタメ', establishedYear: 1948, corporateNumber: '9011101000623', representative: '樋口 茂' },

  // 📰 新聞・マスメディア
  { slug: 'nikkei', name: '株式会社日本経済新聞社', industry: '新聞・経済情報・メディア', establishedYear: 1876, corporateNumber: '3010001033086', representative: '長谷部 剛' },
  { slug: 'yomiuri', name: '株式会社読売新聞グループ本社', industry: '新聞・マスメディア・不動産', establishedYear: 1874, corporateNumber: '7010001031722', representative: '山口 寿一' },
  { slug: 'asahi', name: '株式会社朝日新聞社', industry: '新聞・マスメディア・文化事業', establishedYear: 1879, corporateNumber: '6120001059605', representative: '角田 克' },

  // 🏭 メガ非公開企業・名門メーカー・デベロッパー
  { slug: 'suntory-hd', name: 'サントリーホールディングス株式会社', industry: '清涼飲料・酒類・グローバル食品', establishedYear: 1899, corporateNumber: '3120001136159', representative: '新浪 剛使' },
  { slug: 'takenaka', name: '株式会社竹中工務店', industry: '総合建設・スーパーゼネコン', establishedYear: 1899, corporateNumber: '3120001077469', representative: '佐々木 正人' },
  { slug: 'ykk', name: 'YKK株式会社', industry: 'ファスナー・精密機械・建材', establishedYear: 1934, corporateNumber: '6010001032696', representative: '大谷 裕明' },
  { slug: 'yanmar', name: 'ヤンマーホールディングス株式会社', industry: '農業機械・建設機械・舶用エンジン', establishedYear: 1912, corporateNumber: '7120001176440', representative: '山岡 健人' },
  { slug: 'lotte-hd', name: '株式会社ロッテホールディングス', industry: '菓子・食品・スポーツ・ホテル', establishedYear: 1948, corporateNumber: '1011101023020', representative: '重光 昭夫' },
  { slug: 'mori-building', name: '森ビル株式会社', industry: '都市開発・超高層複合施設デベロッパー', establishedYear: 1959, corporateNumber: '1010401029669', representative: '辻 慎吾' },
  { slug: 'daiso', name: '株式会社大創産業 (DAISO)', industry: '均一SPA小売・グローバル生活雑貨', establishedYear: 1977, corporateNumber: '7240001022681', representative: '矢野 靖二' },
  { slug: 'iris-ohyama', name: 'アイリスオーヤマ株式会社', industry: '生活用品・家電・日用品メーカーベンダー', establishedYear: 1971, corporateNumber: '3370001006799', representative: '大山 晃弘' },

  // 🚀 有力ユニコーン・ディープテック・DXスタートアップ
  { slug: 'preferred-networks', name: '株式会社Preferred Networks', industry: 'AI・深層学習基盤モデル', establishedYear: 2014, corporateNumber: '1010001159494', representative: '西川 徹' },
  { slug: 'smarthr', name: '株式会社SmartHR', industry: 'クラウド人事労務SaaS', establishedYear: 2013, corporateNumber: '2011001093311', representative: '芹澤 雅人' },
  { slug: 'spiber', name: 'Spiber株式会社', industry: '構造タンパク質・バイオ素材', establishedYear: 2007, corporateNumber: '3390001018272', representative: '関山 霖' },
  { slug: 'caddi', name: 'キャディ株式会社', industry: '製造業受発注DX・図面AI', establishedYear: 2017, corporateNumber: '6010001187623', representative: '加藤 勇晃' },
  { slug: 'andpad', name: '株式会社アンドパッド', industry: '建築・施工管理DXクラウド', establishedYear: 2016, corporateNumber: '4010403009022', representative: '稲田 武夫' },
  { slug: 'luup', name: '株式会社LUUP', industry: '電動モビリティ・シェアリング', establishedYear: 2018, corporateNumber: '1011001123515', representative: '岡井 大輝' },
  { slug: 'tbm', name: '株式会社TBM', industry: '新素材LIMEX・循環型リサイクル', establishedYear: 2011, corporateNumber: '2010401095495', representative: '山﨑 敦義' },
  { slug: 'sky', name: 'Ｓｋｙ株式会社', industry: 'ソフトウェア開発・情報セキュリティ', establishedYear: 1985, corporateNumber: '1120001053457', representative: '大浦 淳司' },
  { slug: 'dmm', name: '合同会社DMM.com', industry: '総合デジタルエンタメ・プラットフォーム', establishedYear: 1999, corporateNumber: '3010003002660', representative: '村中 悠介' },
];
