// 🏢 証券コード / スラッグ ➔ 英語名称マスター
export const COMPANY_ENGLISH_NAMES: Record<string, { enName: string; enShortName: string; enSector?: string }> = {
  // 🚗 上場主要企業
  '7203': { enName: 'Toyota Motor Corporation', enShortName: 'Toyota', enSector: 'Automobiles & Transportation Equipment' },
  '6861': { enName: 'Keyence Corporation', enShortName: 'Keyence', enSector: 'Electronics & Sensors' },
  '7974': { enName: 'Nintendo Co., Ltd.', enShortName: 'Nintendo', enSector: 'Entertainment & Gaming' },
  '3635': { enName: 'Koei Tecmo Holdings Co., Ltd.', enShortName: 'Koei Tecmo', enSector: 'Digital Entertainment & Games' },
  '6758': { enName: 'Sony Group Corporation', enShortName: 'Sony Group', enSector: 'Consumer Electronics & Entertainment' },
  '9983': { enName: 'Fast Retailing Co., Ltd.', enShortName: 'Fast Retailing (UNIQLO)', enSector: 'Apparel & Retail Trade' },
  '9984': { enName: 'SoftBank Group Corp.', enShortName: 'SoftBank Group', enSector: 'Telecommunications & Investment' },
  '8058': { enName: 'Mitsubishi Corporation', enShortName: 'Mitsubishi Corp', enSector: 'General Trading Company (Sogo Shosha)' },
  '8001': { enName: 'ITOCHU Corporation', enShortName: 'ITOCHU', enSector: 'General Trading Company (Sogo Shosha)' },
  '8031': { enName: 'Mitsui & Co., Ltd.', enShortName: 'Mitsui & Co.', enSector: 'General Trading Company (Sogo Shosha)' },
  '8053': { enName: 'Sumitomo Corporation', enShortName: 'Sumitomo Corp', enSector: 'General Trading Company (Sogo Shosha)' },
  '8002': { enName: 'Marubeni Corporation', enShortName: 'Marubeni', enSector: 'General Trading Company (Sogo Shosha)' },
  '8801': { enName: 'Mitsui Fudosan Co., Ltd.', enShortName: 'Mitsui Fudosan', enSector: 'Real Estate & Urban Development' },
  '4901': { enName: 'FUJIFILM Holdings Corporation', enShortName: 'FUJIFILM', enSector: 'Healthcare & Precision Materials' },
  '4967': { enName: 'Kobayashi Pharmaceutical Co., Ltd.', enShortName: 'Kobayashi Pharma', enSector: 'Pharmaceuticals & Consumer Goods' },
  '8214': { enName: 'AOKI Holdings Inc.', enShortName: 'AOKI Holdings', enSector: 'Apparel, Wedding & Entertainment' },
  '6201': { enName: 'Toyota Industries Corporation', enShortName: 'Toyota Industries', enSector: 'Automobiles & Machinery' },
  '6902': { enName: 'DENSO Corporation', enShortName: 'DENSO', enSector: 'Automotive Components & Systems' },
  '7269': { enName: 'Suzuki Motor Corporation', enShortName: 'Suzuki', enSector: 'Automobiles & Compact Vehicles' },
  '7267': { enName: 'Honda Motor Co., Ltd.', enShortName: 'Honda', enSector: 'Automobiles & Transportation Equipment' },
  '7201': { enName: 'Nissan Motor Co., Ltd.', enShortName: 'Nissan', enSector: 'Automobiles & Transportation Equipment' },
  '6752': { enName: 'Panasonic Holdings Corporation', enShortName: 'Panasonic', enSector: 'Consumer Electronics' },
  '6501': { enName: 'Hitachi, Ltd.', enShortName: 'Hitachi', enSector: 'Industrial Electronics & Infrastructure' },
  '8306': { enName: 'Mitsubishi UFJ Financial Group, Inc.', enShortName: 'MUFG', enSector: 'Banking & Financial Services' },
  '8316': { enName: 'Sumitomo Mitsui Financial Group, Inc.', enShortName: 'SMFG', enSector: 'Banking & Financial Services' },
  '8411': { enName: 'Mizuho Financial Group, Inc.', enShortName: 'Mizuho', enSector: 'Banking & Financial Services' },
  '9432': { enName: 'Nippon Telegraph and Telephone Corporation', enShortName: 'NTT', enSector: 'Telecommunications' },
  '9433': { enName: 'KDDI Corporation', enShortName: 'KDDI', enSector: 'Telecommunications' },
  '9434': { enName: 'SoftBank Corp.', enShortName: 'SoftBank Telecom', enSector: 'Telecommunications' },
  '4063': { enName: 'Shin-Etsu Chemical Co., Ltd.', enShortName: 'Shin-Etsu Chemical', enSector: 'Chemicals & Semiconductors' },
  '8035': { enName: 'Tokyo Electron Limited', enShortName: 'Tokyo Electron', enSector: 'Semiconductor Equipment' },
  '6098': { enName: 'Recruit Holdings Co., Ltd.', enShortName: 'Recruit', enSector: 'HR Services & Tech' },
  '7741': { enName: 'HOYA Corporation', enShortName: 'HOYA', enSector: 'Precision & Optical Equipment' },
  '4519': { enName: 'Chugai Pharmaceutical Co., Ltd.', enShortName: 'Chugai Pharma', enSector: 'Pharmaceuticals' },
  '4568': { enName: 'Daiichi Sankyo Company, Limited', enShortName: 'Daiichi Sankyo', enSector: 'Pharmaceuticals' },
  '4502': { enName: 'Takeda Pharmaceutical Company Limited', enShortName: 'Takeda', enSector: 'Pharmaceuticals' },
  '9697': { enName: 'Capcom Co., Ltd.', enShortName: 'Capcom', enSector: 'Digital Entertainment' },
  '9684': { enName: 'Square Enix Holdings Co., Ltd.', enShortName: 'Square Enix', enSector: 'Digital Entertainment' },
  '7832': { enName: 'Bandai Namco Holdings Inc.', enShortName: 'Bandai Namco', enSector: 'Toys & Entertainment' },
  '9766': { enName: 'Konami Group Corporation', enShortName: 'Konami', enSector: 'Digital Entertainment' },

  // 🏢 J-REITs (全50銘柄 完全網羅)
  '8951': { enName: 'Nippon Building Fund Inc.', enShortName: 'Nippon Building Fund (NBF)', enSector: 'Office REIT' },
  '8952': { enName: 'Japan Real Estate Investment Corporation', enShortName: 'Japan Real Estate (JRE)', enSector: 'Office REIT' },
  '8953': { enName: 'Japan Metropolitan Fund Investment Corporation', enShortName: 'Japan Metropolitan Fund (JMF)', enSector: 'Retail & Urban Multi-Asset REIT' },
  '8954': { enName: 'ORIX JREIT Inc.', enShortName: 'ORIX JREIT', enSector: 'Diversified Multi-Asset REIT' },
  '8955': { enName: 'Japan Prime Realty Investment Corporation', enShortName: 'Japan Prime Realty (JPR)', enSector: 'Office & Urban Commercial REIT' },
  '8956': { enName: 'NTT UD REIT Investment Corporation', enShortName: 'NTT UD REIT', enSector: 'Diversified Multi-Asset REIT' },
  '8957': { enName: 'Tokyu Real Estate Investment Corporation', enShortName: 'Tokyu REIT', enSector: 'Diversified Multi-Asset REIT' },
  '8958': { enName: 'Global One Real Estate Investment Corp.', enShortName: 'Global One REIT', enSector: 'Office Specialized REIT' },
  '8960': { enName: 'United Urban Investment Corporation', enShortName: 'United Urban (UUR)', enSector: 'Diversified Multi-Asset REIT' },
  '8961': { enName: 'Mori Trust REIT, Inc.', enShortName: 'Mori Trust REIT', enSector: 'Office & Hotel REIT' },
  '8963': { enName: 'Hankyu Hanshin REIT, Inc.', enShortName: 'Hankyu Hanshin REIT', enSector: 'Diversified Multi-Asset REIT' },
  '8964': { enName: 'Frontier Real Estate Investment Corporation', enShortName: 'Frontier Real Estate', enSector: 'Retail & Commercial REIT' },
  '8966': { enName: 'Heiwa Real Estate REIT, Inc.', enShortName: 'Heiwa Real Estate REIT', enSector: 'Office & Residential REIT' },
  '8967': { enName: 'Japan Logistics Fund, Inc.', enShortName: 'Japan Logistics Fund', enSector: 'Logistics Facility REIT' },
  '8968': { enName: 'Fukuoka REIT Corporation', enShortName: 'Fukuoka REIT', enSector: 'Regional Diversified REIT' },
  '8972': { enName: 'Kenedix Real Estate Investment Corporation', enShortName: 'KDX REIT', enSector: 'Office, Residential & Logistics REIT' },
  '8975': { enName: 'Ichigo Office REIT Investment Corporation', enShortName: 'Ichigo Office REIT', enSector: 'Mid-Sized Office REIT' },
  '8976': { enName: 'Daiwa Securities Office Investment Corporation', enShortName: 'Daiwa Securities Office', enSector: 'Office Specialized REIT' },
  '8977': { enName: 'Hankyu Hanshin REIT, Inc.', enShortName: 'Hankyu Hanshin REIT', enSector: 'Diversified REIT' },
  '8979': { enName: 'Starts Proceed Investment Corporation', enShortName: 'Starts Proceed', enSector: 'Residential REIT' },
  '8984': { enName: 'Daiwa House REIT Investment Corporation', enShortName: 'Daiwa House REIT', enSector: 'Logistics & Multi-Asset REIT' },
  '8985': { enName: 'Japan Hotel REIT Investment Corporation', enShortName: 'Japan Hotel REIT (JHR)', enSector: 'Hotels & Resorts REIT' },
  '8986': { enName: 'Daiwa Securities Living Investments Corporation', enShortName: 'Daiwa Living', enSector: 'Rental Housing & Healthcare REIT' },
  '8987': { enName: 'Japan Excellent, Inc.', enShortName: 'Japan Excellent', enSector: 'Office Specialized REIT' },
  '3226': { enName: 'Nippon Accommodations Fund Inc.', enShortName: 'Nippon Accommodations (NAF)', enSector: 'Residential & Serviced Apt REIT' },
  '3234': { enName: 'Mori Hills REIT Investment Corporation', enShortName: 'Mori Hills REIT (MHR)', enSector: 'Premium Office & Urban Complex REIT' },
  '3269': { enName: 'Advance Residence Investment Corporation', enShortName: 'Advance Residence (ADR)', enSector: 'Residential REIT' },
  '3278': { enName: 'Advance Residence Investment Corporation', enShortName: 'Advance Residence', enSector: 'Residential REIT' },
  '3279': { enName: 'Activia Properties Inc.', enShortName: 'Activia Properties', enSector: 'Urban Commercial & Office REIT' },
  '3281': { enName: 'GLP J-REIT', enShortName: 'GLP J-REIT', enSector: 'Advanced Logistics Facility REIT' },
  '3282': { enName: 'Comforia Residential REIT, Inc.', enShortName: 'Comforia Residential', enSector: 'Urban Residential REIT' },
  '3283': { enName: 'Nippon Prologis REIT, Inc.', enShortName: 'Nippon Prologis REIT (NPR)', enSector: 'Advanced Logistics Facility REIT' },
  '3287': { enName: 'Hoshino Resorts REIT, Inc.', enShortName: 'Hoshino Resorts REIT', enSector: 'Luxury Resort & Hotel REIT' },
  '3290': { enName: 'Daiwa House Residential REIT', enShortName: 'Daiwa Residential', enSector: 'Residential REIT' },
  '3292': { enName: 'AEON REIT Investment Corporation', enShortName: 'AEON REIT', enSector: 'Retail & Shopping Mall REIT' },
  '3295': { enName: 'Hulic Reit, Inc.', enShortName: 'Hulic Reit', enSector: 'Tokyo Central Prime Assets REIT' },
  '3296': { enName: 'Nippon REIT Investment Corporation', enShortName: 'Nippon REIT', enSector: 'Diversified Multi-Asset REIT' },
  '3451': { enName: 'Tosei Reit Investment Corporation', enShortName: 'Tosei Reit', enSector: 'Tokyo Metro Area Assets REIT' },
  '3459': { enName: 'Samty Residential Investment Corporation', enShortName: 'Samty Residential', enSector: 'Regional Residential REIT' },
  '3462': { enName: 'Nomura Real Estate Master Fund, Inc.', enShortName: 'Nomura Master Fund (NMF)', enSector: 'Comprehensive Diversified REIT' },
  '3463': { enName: 'Ichigo Hotel REIT Investment Corporation', enShortName: 'Ichigo Hotel REIT', enSector: 'Hotel & Hospitality REIT' },
  '3466': { enName: 'LaSalle LOGIPORT REIT', enShortName: 'LaSalle LOGIPORT', enSector: 'Prime Logistics Facility REIT' },
  '3468': { enName: 'Star Asia Investment Corporation', enShortName: 'Star Asia REIT', enSector: 'Diversified Opportunity REIT' },
  '3471': { enName: 'Mitsui Fudosan Logistics Park Inc.', enShortName: 'MFLP REIT', enSector: 'Advanced Logistics Facility REIT' },
  '3472': { enName: 'Oedo Onsen REIT Investment Corporation', enShortName: 'Oedo Onsen REIT', enSector: 'Hot Springs & Leisure REIT' },
  '3476': { enName: 'Mirai Corporation', enShortName: 'Mirai Corporation', enSector: 'Diversified Multi-Asset REIT' },
  '3478': { enName: 'Mori Trust Hotel Reit, Inc.', enShortName: 'Mori Trust Hotel', enSector: 'Hotel Specialized REIT' },
  '3481': { enName: 'Mitsubishi Estate Logistics REIT Investment Corp.', enShortName: 'MEL REIT', enSector: 'Logistics Facility REIT' },
  '3487': { enName: 'CRE Logistics REIT, Inc.', enShortName: 'CRE Logistics REIT', enSector: 'Logistics Facility REIT' },
  '3488': { enName: 'XYMAX REIT Investment Corporation', enShortName: 'XYMAX REIT', enSector: 'Diversified Multi-Asset REIT' },
  '3492': { enName: 'Takara Leben Real Estate Investment Corp.', enShortName: 'Takara Leben REIT', enSector: 'Diversified Multi-Asset REIT' },
  '3493': { enName: 'Advance Logistics Investment Corporation', enShortName: 'Advance Logistics (ADL)', enSector: 'Logistics Facility REIT' },
  '2971': { enName: 'ESCON JAPAN REIT Investment Corporation', enShortName: 'ESCON JAPAN REIT', enSector: 'Community & Commercial REIT' },
  '2972': { enName: 'Sankei Real Estate, Inc.', enShortName: 'Sankei Real Estate', enSector: 'Office & Urban Mixed REIT' },
  '2979': { enName: 'SOSiLA Logistics REIT, Inc.', enShortName: 'SOSiLA Logistics REIT', enSector: 'Logistics Facility REIT' },
  '2989': { enName: 'Tokaido REIT, Inc.', enShortName: 'Tokaido REIT', enSector: 'Tokaido Region Diversified REIT' },

  // 📰 未上場メガ企業 ＆ スタートアップ
  'shueisha': { enName: 'Shueisha Inc.', enShortName: 'Shueisha', enSector: 'Mega Publishing & Manga Media' },
  'kodansha': { enName: 'Kodansha Ltd.', enShortName: 'Kodansha', enSector: 'Mega Publishing & Global Manga Media' },
  'shogakukan': { enName: 'Shogakukan Inc.', enShortName: 'Shogakukan', enSector: 'Mega Publishing & Educational Media' },
  'kadokawa': { enName: 'KADOKAWA CORPORATION (Media Div)', enShortName: 'KADOKAWA Media', enSector: 'Publishing, Animation & IP Franchises' },
  'nikkei': { enName: 'Nikkei Inc. (The Nikkei)', enShortName: 'Nikkei (FT Group)', enSector: 'Financial Media & Intelligence' },
  'asahi': { enName: 'The Asahi Shimbun Company', enShortName: 'Asahi Shimbun', enSector: 'National Newspaper & Media Group' },
  'yomiuri': { enName: 'The Yomiuri Shimbun Holdings', enShortName: 'Yomiuri Shimbun', enSector: 'National Newspaper & Media Group' },
  'mainichi': { enName: 'The Mainichi Newspapers Co., Ltd.', enShortName: 'Mainichi Newspapers', enSector: 'National Newspaper & Editorial' },
  'smarthr': { enName: 'SmartHR, Inc.', enShortName: 'SmartHR', enSector: 'Cloud HR & Labor SaaS' },
  'layerx': { enName: 'LayerX Inc.', enShortName: 'LayerX (Bakuraku)', enSector: 'Enterprise Spend Management & AI SaaS' },
  'pfn': { enName: 'Preferred Networks, Inc.', enShortName: 'Preferred Networks (PFN)', enSector: 'Generative AI & Deep Learning Accelerators' },
  'preferred-networks': { enName: 'Preferred Networks, Inc.', enShortName: 'Preferred Networks (PFN)', enSector: 'Generative AI & Deep Learning' },
  'spiber': { enName: 'Spiber Inc.', enShortName: 'Spiber', enSector: 'Structural Biomaterials (Brewed Protein)' },
  'caddi': { enName: 'CADDi Inc.', enShortName: 'CADDi (DRAWER)', enSector: 'Manufacturing Procurement DX & Drawing AI' },
  'sakana': { enName: 'Sakana AI K.K.', enShortName: 'Sakana AI', enSector: 'Evolutionary Nature-Inspired Foundation Models' },
  'sky': { enName: 'Sky Co., Ltd.', enShortName: 'Sky (SKYSEA)', enSector: 'Enterprise Security & Software' },
  'suntory': { enName: 'Suntory Holdings Limited', enShortName: 'Suntory Holdings', enSector: 'Global Beverages & Alcoholic Drinks' },
  'suntory-hd': { enName: 'Suntory Holdings Limited', enShortName: 'Suntory Holdings', enSector: 'Global Beverages & Alcoholic Drinks' },
  'dmm': { enName: 'DMM.com LLC', enShortName: 'DMM.com', enSector: 'Multi-Tech & Digital Entertainment' },
  'takenaka': { enName: 'Takenaka Corporation', enShortName: 'Takenaka', enSector: 'Mega Architecture & Construction' },
  'ykk': { enName: 'YKK Corporation', enShortName: 'YKK Group', enSector: 'Precision Fasteners & Architectural' },
  'andpad': { enName: 'ANDPAD Inc.', enShortName: 'ANDPAD', enSector: 'Construction Cloud Management DX' },
  'luup': { enName: 'Luup, Inc.', enShortName: 'LUUP', enSector: 'Next-Gen Micro-Mobility Sharing' },
};

// 🇯🇵 日本語名 ➔ 🇬🇧 英語名 直接変換辞書
export const JAPANESE_TO_ENGLISH_MAP: Record<string, string> = {
  'トヨタ自動車': 'Toyota Motor Corporation',
  'トヨタ自動車株式会社': 'Toyota Motor Corporation',
  '任天堂': 'Nintendo Co., Ltd.',
  '任天堂株式会社': 'Nintendo Co., Ltd.',
  'キーエンス': 'Keyence Corporation',
  '株式会社キーエンス': 'Keyence Corporation',
  'コーエーテクモホールディングス': 'Koei Tecmo Holdings Co., Ltd.',
  'コーエーテクモHD': 'Koei Tecmo Holdings Co., Ltd.',
  'ソニーグループ': 'Sony Group Corporation',
  'ソニーグループ株式会社': 'Sony Group Corporation',
  'ソニー': 'Sony Group Corporation',
  'ファーストリテイリング': 'Fast Retailing Co., Ltd.',
  '株式会社ファーストリテイリング': 'Fast Retailing Co., Ltd.',
  'ソフトバンクグループ': 'SoftBank Group Corp.',
  'ソフトバンクグループ株式会社': 'SoftBank Group Corp.',
  '三菱商事': 'Mitsubishi Corporation',
  '三菱商事株式会社': 'Mitsubishi Corporation',
  '伊藤忠商事': 'ITOCHU Corporation',
  '伊藤忠商事株式会社': 'ITOCHU Corporation',
  '三井物産': 'Mitsui & Co., Ltd.',
  '三井物産株式会社': 'Mitsui & Co., Ltd.',
  '住友商事': 'Sumitomo Corporation',
  '住友商事株式会社': 'Sumitomo Corporation',
  '丸紅': 'Marubeni Corporation',
  '丸紅株式会社': 'Marubeni Corporation',
  '三井不動産': 'Mitsui Fudosan Co., Ltd.',
  '三井不動産株式会社': 'Mitsui Fudosan Co., Ltd.',
  '富士フイルムホールディングス': 'FUJIFILM Holdings Corporation',
  '小林製薬': 'Kobayashi Pharmaceutical Co., Ltd.',
  '小林製薬株式会社': 'Kobayashi Pharmaceutical Co., Ltd.',
  'AOKIホールディングス': 'AOKI Holdings Inc.',
  '豊田自動織機': 'Toyota Industries Corporation',
  '株式会社豊田自動織機': 'Toyota Industries Corporation',
  'デンソー': 'DENSO Corporation',
  '株式会社デンソー': 'DENSO Corporation',
  'スズキ': 'Suzuki Motor Corporation',
  'スズキ株式会社': 'Suzuki Motor Corporation',
  'ホンダ': 'Honda Motor Co., Ltd.',
  '本田技研工業': 'Honda Motor Co., Ltd.',
  '本田技研工業株式会社': 'Honda Motor Co., Ltd.',
  '日産自動車': 'Nissan Motor Co., Ltd.',
  'パナソニック ホールディングス': 'Panasonic Holdings Corporation',
  '日立製作所': 'Hitachi, Ltd.',
  '株式会社日立製作所': 'Hitachi, Ltd.',
  '三菱UFJフィナンシャル・グループ': 'Mitsubishi UFJ Financial Group, Inc.',
  '三井住友フィナンシャルグループ': 'Sumitomo Mitsui Financial Group, Inc.',
  'みずほフィナンシャルグループ': 'Mizuho Financial Group, Inc.',
  '日本電信電話': 'Nippon Telegraph and Telephone Corporation (NTT)',
  'KDDI': 'KDDI Corporation',
  'ソフトバンク': 'SoftBank Corp.',
  '信越化学工業': 'Shin-Etsu Chemical Co., Ltd.',
  '東京エレクトロン': 'Tokyo Electron Limited',
  'リクルートホールディングス': 'Recruit Holdings Co., Ltd.',
  'HOYA': 'HOYA Corporation',
  '中外製薬': 'Chugai Pharmaceutical Co., Ltd.',
  '第一三共': 'Daiichi Sankyo Company, Limited',
  '武田薬品工業': 'Takeda Pharmaceutical Company Limited',
  'カプコン': 'Capcom Co., Ltd.',
  'スクウェア・エニックス・ホールディングス': 'Square Enix Holdings Co., Ltd.',
  'バンダイナムコホールディングス': 'Bandai Namco Holdings Inc.',
  'コナミグループ': 'Konami Group Corporation',

  // J-REIT
  '日本ビルファンド投資法人': 'Nippon Building Fund Inc.',
  '日本ビルファンド': 'Nippon Building Fund Inc.',
  'ジャパンリアルエステイト投資法人': 'Japan Real Estate Investment Corporation',
  'ジャパンリアルエステイト': 'Japan Real Estate Investment Corporation',
  '日本都市ファンド投資法人': 'Japan Metropolitan Fund Investment Corporation',
  '日本都市ファンド': 'Japan Metropolitan Fund Investment Corporation',
  'アドバンス・レジデンス投資法人': 'Advance Residence Investment Corporation',
  'アドバンス・レジデンス': 'Advance Residence Investment Corporation',
  'GLP投資法人': 'GLP J-REIT',
  'ジャパン・プライム・レジデンス': 'Japan Prime Realty Investment Corporation',
  'ジャパン・プライム・リアルティ投資法人': 'Japan Prime Realty Investment Corporation',
  '野村不動産マスターファンド投資法人': 'Nomura Real Estate Master Fund, Inc.',
  'ユナイテッド・アーバン投資法人': 'United Urban Investment Corporation',
  '日本プロロジスリート投資法人': 'Nippon Prologis REIT, Inc.',
  '大和ハウスリート投資法人': 'Daiwa House REIT Investment Corporation',
  'ジャパン・ホテル・リート投資法人': 'Japan Hotel REIT Investment Corporation',
  'ジャパン・ホテル・リート': 'Japan Hotel REIT Investment Corporation',

  // 未上場
  '集英社': 'Shueisha Inc.',
  '株式会社集英社': 'Shueisha Inc.',
  '講談社': 'Kodansha Ltd.',
  '株式会社講談社': 'Kodansha Ltd.',
  '小学館': 'Shogakukan Inc.',
  '株式会社小学館': 'Shogakukan Inc.',
  '日本経済新聞社': 'Nikkei Inc.',
  '株式会社日本経済新聞社': 'Nikkei Inc.',
  '朝日新聞社': 'The Asahi Shimbun Company',
  '株式会社朝日新聞社': 'The Asahi Shimbun Company',
  '読売新聞グループ本社': 'The Yomiuri Shimbun Holdings',
  '毎日新聞社': 'The Mainichi Newspapers Co., Ltd.',
  'SmartHR': 'SmartHR, Inc.',
  '株式会社SmartHR': 'SmartHR, Inc.',
  'LayerX': 'LayerX Inc.',
  '株式会社LayerX': 'LayerX Inc.',
  'Preferred Networks': 'Preferred Networks, Inc.',
  '株式会社Preferred Networks': 'Preferred Networks, Inc.',
  'Spiber': 'Spiber Inc.',
  'Spiber株式会社': 'Spiber Inc.',
  'CADDi': 'CADDi Inc.',
  'キャディ株式会社': 'CADDi Inc.',
  'Sakana AI': 'Sakana AI K.K.',
  'サントリーホールディングス': 'Suntory Holdings Limited',
  'サントリーホールディングス株式会社': 'Suntory Holdings Limited',
  'サントリーHD': 'Suntory Holdings Limited',
  '竹中工務店': 'Takenaka Corporation',
  '株式会社竹中工務店': 'Takenaka Corporation',
  'YKK': 'YKK Corporation',
  'ＹＫＫ株式会社': 'YKK Corporation',
  'Sky株式会社': 'Sky Co., Ltd.',
  '合同会社DMM.com': 'DMM.com LLC',
  'DMM.com': 'DMM.com LLC',
  '株式会社アンドパッド': 'ANDPAD Inc.',
  'ANDPAD': 'ANDPAD Inc.',
  '株式会社Luup': 'Luup, Inc.',
  'LUUP': 'Luup, Inc.',

  // 🏛️ 大株主・信託口・投資ファンド
  '日本マスタートラスト信託銀行株式会社（信託口）': 'The Master Trust Bank of Japan, Ltd. (Trust Account)',
  '日本マスタートラスト信託銀行': 'The Master Trust Bank of Japan, Ltd.',
  '株式会社日本カストディ銀行（信託口）': 'Custody Bank of Japan, Ltd. (Trust Account)',
  '日本カストディ銀行': 'Custody Bank of Japan, Ltd.',
  'ブラックロック・ジャパン株式会社': 'BlackRock Japan Co., Ltd.',
  'ブラックロック': 'BlackRock, Inc.',
  'BlackRock': 'BlackRock, Inc.',
  'エリオット・マネジメント': 'Elliott Investment Management',
  'エリオット': 'Elliott Investment Management',
  'オアシス・マネジメント': 'Oasis Management Company',
  'オアシス': 'Oasis Management Company',
  'シルチェスター・インターナショナル・インベスターズ': 'Silchester International Investors LLP',
  'シルチェスター': 'Silchester International Investors',
  'バークシャー・ハサウェイ': 'Berkshire Hathaway Inc.',
  'バークシャー': 'Berkshire Hathaway Inc.',
  'ソフトバンク・ビジョン・ファンド': 'SoftBank Vision Fund (SVF)',
  'ビジョンファンド': 'SoftBank Vision Fund',
  'ジャフコ グループ': 'JAFCO Group Co., Ltd.',
  'ジャフコ': 'JAFCO Group',
  '年金積立金管理運用独立行政法人': 'Government Pension Investment Fund (GPIF)',
  'GPIF': 'GPIF',
  '襟川陽一': 'Yoichi Erikawa',
  '襟川恵子': 'Keiko Erikawa',
  '豊田章男': 'Akio Toyoda',
  '滝崎武光': 'Takemitsu Takizaki',
  '柳井正': 'Tadashi Yanai',
  '孫正義': 'Masayoshi Son',
  'ポール・シンガー': 'Paul Singer',
  'セス・フィッシャー': 'Seth Fischer',
  'ウォーレン・バフェット': 'Warren Buffett',
};

// 📰 未上場企業の公式英語メタデータ
export const UNLISTED_ENGLISH_METADATA: Record<string, {
  enIndustry?: string;
  enRepresentative?: string;
  enDescription?: string;
}> = {
  'suntory': {
    enIndustry: 'Beverages, Spirits & Food Conglomerate',
    enRepresentative: 'Nobuhiro Torii (President & CEO)',
    enDescription: 'Global beverage and spirits empire holding Beam Suntory, Suntory Beverage & Food (2587), and world-acclaimed premium whiskies (Yamazaki, Hakushu, Hibiki, Jim Beam).',
  },
  'suntory-hd': {
    enIndustry: 'Beverages, Spirits & Food Conglomerate',
    enRepresentative: 'Nobuhiro Torii (President & CEO)',
    enDescription: 'Global beverage and spirits empire holding Beam Suntory, Suntory Beverage & Food (2587), and world-acclaimed premium whiskies (Yamazaki, Hakushu, Hibiki, Jim Beam).',
  },
  'yomiuri': {
    enIndustry: 'Newspapers, Media & Sports Entertainment',
    enRepresentative: 'Toshikazu Yamaguchi (President & Representative Director)',
    enDescription: 'Japan’s premier media conglomerate operating The Yomiuri Shimbun (world’s #1 print circulation), Yomiuri Giants, Yomiuriland, and prime central Tokyo real estate assets.',
  },
  'nikkei': {
    enIndustry: 'Financial Intelligence & Economic Media Group',
    enRepresentative: 'Tsuyoshi Hasebe (President & CEO)',
    enDescription: 'Flagship financial media conglomerate publishing The Nikkei (1M+ digital subscribers), owning the Financial Times (FT Group), QUICK data terminal, and the Nikkei 225 index.',
  },
  'asahi': {
    enIndustry: 'National Newspaper, Real Estate & Media',
    enRepresentative: 'Masaru Tsunoda (President & CEO)',
    enDescription: 'Leading quality national daily newspaper publisher, owner of Nakanoshima Festival Tower, prime Tsukiji/Ginza properties, and top shareholder of TV Asahi Holdings.',
  },
  'shueisha': {
    enIndustry: 'Publishing, Manga IP & Digital Media',
    enRepresentative: 'Shinichi Hirono (President & CEO)',
    enDescription: 'Core publisher of the Hitotsubashi Group producing global mega IP franchises (ONE PIECE, Demon Slayer, Jujutsu Kaisen, SPY×FAMILY) with >¥200B in revenue and strong cash reserves.',
  },
  'kodansha': {
    enIndustry: 'Publishing, Global Anime IP & Entertainment',
    enRepresentative: 'Yoshinobu Noma (President & CEO)',
    enDescription: 'Major general publishing powerhouse creating global IP (Attack on Titan, Blue Lock, Tokyo Revengers) with digital comics and international licensing generating high profitability.',
  },
  'shogakukan': {
    enIndustry: 'Publishing, Children & Educational Media',
    enRepresentative: 'Nobuhiro Oga (President & CEO)',
    enDescription: 'Founding publisher of Hitotsubashi Group behind Detective Conan, Frieren, Doraemon, Pokemon publications, CoroCoro Comic, and major educational magazines.',
  },
  'spiber': {
    enIndustry: 'Biotechnology & Structural Biomaterials',
    enRepresentative: 'Kazuhide Sekiyama (Representative Executive Officer)',
    enDescription: 'Deep-tech bio-unicorn pioneering Brewed Protein structural biomaterials via microbial fermentation, partnering with global brands like THE NORTH FACE and Goldwin.',
  },
  'pfn': {
    enIndustry: 'Artificial Intelligence & Deep Tech Silicon',
    enRepresentative: 'Toru Nishikawa (President & CEO)',
    enDescription: 'Premier Japanese deep learning and AI unicorn developing custom power-efficient AI accelerators (MN-Core), MN-3 supercomputer, and foundation LLM PLaMo.',
  },
  'preferred-networks': {
    enIndustry: 'Artificial Intelligence & Deep Tech Silicon',
    enRepresentative: 'Toru Nishikawa (President & CEO)',
    enDescription: 'Premier Japanese deep learning and AI unicorn developing custom power-efficient AI accelerators (MN-Core), MN-3 supercomputer, and foundation LLM PLaMo.',
  },
  'smarthr': {
    enIndustry: 'Enterprise Cloud HR & Labor SaaS',
    enRepresentative: 'Masato Serizawa (CEO & Director)',
    enDescription: 'Market-leading cloud HR SaaS automating labor workflows and talent management for over 60,000 corporate clients with ARR surpassing ¥15 billion.',
  },
  'andpad': {
    enIndustry: 'Construction DX & Cloud Project Management',
    enRepresentative: 'Takeo Inada (President & CEO)',
    enDescription: 'Industry-standard construction cloud management SaaS utilized by over 180,000 companies and 470,000 active users nationwide.',
  },
  'caddi': {
    enIndustry: 'Manufacturing Procurement DX & Drawing AI',
    enRepresentative: 'Yuta Kato (Representative Director & CEO)',
    enDescription: 'Manufacturing DX unicorn operating CADDi MANUFACTURING parts procurement platform and CADDi DRAWER AI drawing asset search engine across Japan and the US.',
  },
  'layerx': {
    enIndustry: 'Fintech & AI Spend Management SaaS',
    enRepresentative: 'Yoshinori Fukushima (Representative Director & CEO)',
    enDescription: 'Fast-growing Fintech startup providing the Bakuraku AI-driven invoice, expense, and approval management cloud with high-precision OCR technology.',
  },
  'luup': {
    enIndustry: 'Micro-Mobility & Electric Vehicle Sharing',
    enRepresentative: 'Daiki Okai (President & CEO)',
    enDescription: 'Urban micro-mobility sharing platform operating over 10,000 e-scooter and e-bike stations across major metropolitan centers in Japan.',
  },
  'sky': {
    enIndustry: 'Enterprise Security & IT Operations Software',
    enRepresentative: 'Koki Ogura (President & CEO)',
    enDescription: 'Developer of SKYSEA Client View enterprise IT asset management software with exceptional profit margins exceeding 40%.',
  },
  'takenaka': {
    enIndustry: 'Architecture, Engineering & Construction',
    enRepresentative: 'Masato Sasaki (President & CEO)',
    enDescription: 'Historic Japanese mega-general contractor renowned for prestigious architectural landmarks, corporate HQs, and sustainable urban infrastructure.',
  },
  'ykk': {
    enIndustry: 'Precision Fasteners & Architectural Systems',
    enRepresentative: 'Hiroaki Otani (President & CEO)',
    enDescription: 'Global leader in precision zippers and architectural products with operations across more than 70 countries worldwide.',
  },
  'dmm': {
    enIndustry: 'Digital Entertainment & Multi-Tech Ventures',
    enRepresentative: 'Keishi Kameyama (Founder & Chairman)',
    enDescription: 'Diverse tech conglomerate spanning gaming, streaming, anime production, digital education, and venture incubation.',
  },
};

export const SECTOR_TRANSLATIONS: Record<string, string> = {
  '輸送用機器': 'Automobiles & Transportation Equipment',
  '電気機器': 'Electronics & Precision Instruments',
  '精密機器': 'Precision Instruments & Medical Tech',
  'その他製品': 'Consumer Goods & Gaming Entertainment',
  '情報・通信業': 'Information & Technology / Cloud',
  '卸売業': 'Wholesale Trade / General Trading',
  '小売業': 'Retail Trade & E-Commerce',
  '不動産業': 'Real Estate & Property Development',
  '医薬品': 'Pharmaceuticals & Life Sciences',
  '化学': 'Chemicals & Advanced Materials',
  '機械': 'Industrial Machinery & Automation',
  'サービス業': 'Professional & Enterprise Services',
  '銀行業': 'Banking & Financial Institutions',
  '証券、商品先物取引業': 'Securities & Commodity Futures',
  '保険業': 'Insurance & Risk Management',
  '不動産投資信託証券': 'Real Estate Investment Trust (J-REIT)',
  '飲料・食品・酒類': 'Beverages & Food Conglomerates',
  '新聞・総合メディア / スポーツ・レジャー': 'Newspapers, Media & Sports Entertainment',
  '経済報道 / メディア / 金融情報': 'Financial Intelligence & Economic Media',
  '新聞・デジタル報道 / 不動産 / メディア': 'National Newspaper, Real Estate & Media',
  '総合出版 / マンガIP / デジタルメディア': 'Publishing, Manga IP & Digital Media',
  '総合出版 / デジタルIP・エンタメ': 'Publishing, Global Anime IP & Entertainment',
  '総合出版 / 教育・児童書 / メディア': 'Publishing, Children & Educational Media',
  'バイオテクノロジー / 新世代構造タンパク質素材': 'Biotechnology & Structural Biomaterials',
  '人工知能 (AI) / ディープラーニング / AI半導体': 'Artificial Intelligence & Custom Silicon',
  'クラウド人事労務 / SaaS': 'Enterprise Cloud HR & Labor SaaS',
  '建設DX / 施工管理・図面クラウドSaaS': 'Construction DX & Project Cloud SaaS',
  '製造業DX / サプライチェーン受発注プラットフォーム': 'Manufacturing DX & Procurement Platform',
  'Fintech / AI / 経費SaaS': 'Fintech & AI Spend Management SaaS',
  'マイクロモビリティ / 電動キックボード・アシスト自転車シェア': 'Micro-Mobility & Electric Vehicle Sharing',
  'メガ総合出版': 'Mega Publishing & Manga Media',
  '全国紙・経済新聞': 'National Newspaper & Media Group',
  '生成AI・基盤モデル': 'Generative AI & Foundation Models',
  '人工知能・深層学習': 'Artificial Intelligence & Deep Learning',
  'クラウドHR・SaaS': 'Cloud HR & Enterprise SaaS',
  '企業向けFintech・AI': 'Enterprise Fintech & AI Spend Management',
  '次世代バイオ素材': 'Next-Gen Structural Biomaterials',
  '製造業受発注DX': 'Manufacturing Procurement DX Platform',
  '総合エンタメ・Webサービス': 'Multi-Tech & Digital Entertainment',
  '総合飲料・酒類': 'Global Beverages & Alcoholic Drinks',
  '業務系SI・ソフトウェア': 'Enterprise SI & Mission-Critical Software',
};

export function getCompanyName(codeOrSlug: string, fallbackName: string, isEn: boolean): string {
  if (!isEn) return fallbackName;

  if (codeOrSlug && COMPANY_ENGLISH_NAMES[codeOrSlug]) {
    return COMPANY_ENGLISH_NAMES[codeOrSlug].enName;
  }

  if (fallbackName) {
    const cleanName = fallbackName.trim();
    if (JAPANESE_TO_ENGLISH_MAP[cleanName]) {
      return JAPANESE_TO_ENGLISH_MAP[cleanName];
    }
    for (const [jpKey, enVal] of Object.entries(JAPANESE_TO_ENGLISH_MAP)) {
      if (cleanName.includes(jpKey) || jpKey.includes(cleanName)) {
        return enVal;
      }
    }
  }

  return fallbackName;
}

export function getCompanyShortName(codeOrSlug: string, fallbackShortName: string, isEn: boolean): string {
  if (!isEn) return fallbackShortName;

  if (codeOrSlug && COMPANY_ENGLISH_NAMES[codeOrSlug]) {
    return COMPANY_ENGLISH_NAMES[codeOrSlug].enShortName;
  }

  if (fallbackShortName) {
    const cleanName = fallbackShortName.trim();
    if (JAPANESE_TO_ENGLISH_MAP[cleanName]) {
      return JAPANESE_TO_ENGLISH_MAP[cleanName];
    }
    for (const [jpKey, enVal] of Object.entries(JAPANESE_TO_ENGLISH_MAP)) {
      if (cleanName.includes(jpKey) || jpKey.includes(cleanName)) {
        return enVal;
      }
    }
  }

  return fallbackShortName;
}

export function getSectorName(sector: string | null | undefined, isEn: boolean): string {
  if (!sector) return '-';
  if (!isEn) return sector;
  return SECTOR_TRANSLATIONS[sector] || sector;
}

export function getUnlistedIndustry(slug: string, fallback: string, isEn: boolean): string {
  if (!isEn) return fallback;
  const meta = UNLISTED_ENGLISH_METADATA[slug];
  return meta?.enIndustry || getSectorName(fallback, isEn);
}

export function getUnlistedRepresentative(slug: string, fallback: string | null | undefined, isEn: boolean): string {
  if (!fallback) return '-';
  if (!isEn) return fallback;
  const meta = UNLISTED_ENGLISH_METADATA[slug];
  return meta?.enRepresentative || fallback;
}

export function getUnlistedDescription(slug: string, fallback: string | null | undefined, isEn: boolean): string {
  if (!fallback) return '';
  if (!isEn) return fallback;
  const meta = UNLISTED_ENGLISH_METADATA[slug];
  return meta?.enDescription || fallback;
}

export const REIT_PROPERTY_ENGLISH_NAMES: Record<string, string> = {
  // 代表的保有物件
  '新宿三井ビルディング': 'Shinjuku Mitsui Building',
  'グラントウキョウサウスタワー': 'GranTokyo South Tower',
  '六本木ティーキューブ': 'Roppongi T-Cube',
  '西新宿三井ビルディング': 'Nishi-Shinjuku Mitsui Building',
  '中之島三井ビルディング': 'Nakanoshima Mitsui Building',
  'ゲートシティ大崎': 'Gate City Ohsaki',
  '大手町パークビルディング': 'Otemachi Park Building',
  '汐留ビルディング': 'Shiodome Building',
  '赤坂パークビル': 'Akasaka Park Building',
  '三菱UFJ信託銀行本店ビル': 'Mitsubishi UFJ Trust and Banking Head Office',
  '新宿イーストサイドスクエア': 'Shinjuku Eastside Square',
  '梅田阪急ビル オフィスタワー': 'Umeda Hankyu Building Office Tower',
  '六本木ヒルズ森タワー': 'Roppongi Hills Mori Tower',
  '虎ノ門ヒルズ 森タワー': 'Toranomon Hills Mori Tower',
  '愛宕グリーンヒルズMORIタワー': 'Atago Green Hills MORI Tower',
  'アーク森ビル': 'ARK Mori Building',
  'オランダヒルズ森タワー': 'Holland Hills Mori Tower',
  '赤坂溜池タワー': 'Akasaka Tameike Tower',
  '六本木ファーストビル': 'Roppongi First Building',
  '元麻布ヒルズ': 'Motoazabu Hills',
  'GYRE (ジャイル / 表参道)': 'GYRE (Omotesando)',
  '川崎ルフロン': 'Kawasaki Le FRONT',
  'mozoワンダーシティ': 'mozo Wonder City',
  'いちご神保町ビル': 'Ichigo Jimbocho Building',
  '大手町ファーストスクエア': 'Otemachi First Square',
  '赤坂インターシティ': 'Akasaka Intercity',
  '大和証券白金ビル': 'Daiwa Securities Shirokane Building',
  'HF兜町ビルディング': 'HF Kabutocho Building',
  'パシフィックマークス西梅田': 'Pacific Marks Nishi-Umeda',
  '東京サンケイビル': 'Tokyo Sankei Building',
  '大手町フィナンシャルシティ ノースタワー': 'Otemachi Financial City North Tower',
  '八重洲三井ビルディング': 'Yaesu Mitsui Building',
  'JPR原宿ビル': 'JPR Harajuku Building',
  '新宿野村ビル': 'Shinjuku Nomura Building',
  '大手町フィナンシャルシティ グランキューブ': 'Otemachi Financial City Grand Cube',
  'ランドポート柏沼南': 'Landport Kashiwa Shonan',
  'ミ・ナーラ (奈良)': 'Mi・Nara (Nara)',
  'MG白金高輪ビル': 'MG Shirokane-Takanawa Building',
  'オリックス本町ビル': 'ORIX Honmachi Building',
  'ホテルユニバーサルポート': 'Hotel Universal Port',
  '秋葉原UDX': 'Akihabara UDX',
  'グランパークタワー': 'Granpark Tower Shibaura',
  'ルネサンス長町南': 'Renaissance Nagamachi Minami',
  'KDX虎ノ門ビル': 'KDX Toranomon Building',
  'KDX新橋ビル': 'KDX Shimbashi Building',
  'KDXレジデンス六本木': 'KDX Residence Roppongi',
  'プロシード東葛西': 'Proceed Higashi-Kasai',
  'ミュゼ白金長者丸': 'Musee Shirokane Chojamaru',
  'ロジスクエア八潮': 'LogiSquare Yashio',
  '東急プラザ表参道原宿': 'Tokyu Plaza Omotesando Harajuku',
  '渋谷ソラスタ': 'Shibuya Solasta',
  '恵比寿プライムスクエア': 'Ebisu Prime Square',
  'Qfront (キューフロント / 渋谷)': 'Qfront (Shibuya)',
  '世田谷ビジネススクエア': 'Setagaya Business Square',
  'トレディアン錦糸町': 'Tredian Kinshicho',
  'トーセイビル大森': 'Tosei Building Omori',
  'tonarie栂・美木多': 'tonarie Toga Mikita',
  'ロジポート橋本': 'LOGIPORT Hashimoto',
  'S-RESIDENCE葵': 'S-RESIDENCE Aoi',
  '阪急電鉄本社ビル': 'Hankyu Corporation HQ Building',
  '静銀浜松ビル': 'Shizugin Hamamatsu Building',
  'SOSiLA横浜港北': 'SOSiLA Yokohama Kohoku',
  '新砂物流センター': 'Shinsuna Logistics Center',
  'アイミッションズパーク野田': 'i-Missions Park Noda',
  'カスタリア白金長者丸': 'Castalia Shirokane Chojamaru',
  'イオンモール幕張新都心': 'AEON MALL Makuhari New City',
  'イオンモールレイクタウン': 'AEON LakeTown',
  'イオンモール甲府昭和': 'AEON MALL Kofu Showa',
  'ヒューリック虎ノ門ビル': 'Hulic Toranomon Building',
  'ヒューリック銀座ウォールビル': 'Hulic Ginza Wall Building',
  'ザ・ゲートホテル雷門 by HULIC': 'THE GATE HOTEL Kaminarimon by HULIC',
  'キャナルシティ博多': 'Canal City Hakata',
  'パークプレイス大分': 'Park Place Oita',
  'アーバンセンター博多': 'Urban Center Hakata',
  'GLP東京': 'GLP Tokyo',
  'GLP杉戸II': 'GLP Sugito II',
  'GLP座間': 'GLP Zama',
  'GLP鳴尾浜': 'GLP Naruohama',
  'ららぽーと新三郷': 'LaLaport Shin-Misato',
  'プロロジスパーク市川1': 'Prologis Park Ichikawa 1',
  'プロロジスパーク市川I': 'Prologis Park Ichikawa 1',
  'プロロジスパーク舞洲4': 'Prologis Park Maishima 4',
  'プロロジスパーク横浜大黒': 'Prologis Park Yokohama Daikoku',
  'プロロジスパーク座間2': 'Prologis Park Zama 2',
  'プロロジスパーク猪名川1': 'Prologis Park Inagawa 1',
  'ロジクロス厚木': 'Logicross Atsugi',
  'ザ・ビー赤坂見附': 'the b akasaka-mitsuke',
  'MFLP船橋I': 'MFLP Funabashi I',
  'MFLP日野': 'MFLP Hino',
  'MFLP茨木': 'MFLP Ibaraki',
  'Residia Tower Azabu-Juban': 'Residia Tower Azabu-Juban',
  'レジディアタワー麻布十番': 'Residia Tower Azabu-Juban',
  'レジディアタワー中目黒': 'Residia Tower Nakameguro',
  'レジディア市谷砂土原町': 'Residia Ichigaya Sadoharacho',
  'レジディア恵比寿': 'Residia Ebisu',
  'Park Axis Aoyama 1-chome Tower': 'Park Axis Aoyama 1-chome Tower',
  'パークアクシス青山一丁目タワー': 'Park Axis Aoyama 1-chome Tower',
  'パークアクシスプレミア南青山': 'Park Axis Premier Minami-Aoyama',
  'パークアクシス代官山': 'Park Axis Daikanyama',
  '星のや軽井沢': 'HOSHINOYA Karuizawa',
  '星のや京都': 'HOSHINOYA Kyoto',
  '界 箱根': 'KAI Hakone',
  'ヒルトン東京お台場': 'Hilton Tokyo Odaiba',
  'オリエンタルホテル 東京ベイ': 'Oriental Hotel Tokyo Bay',
  'なんばオリエンタルホテル': 'Namba Oriental Hotel',
  'オリエンタルホテル ユニバーサル・シティ': 'Oriental Hotel Universal City',
  '沖縄マリオット リゾート＆スパ (オリエンタルホテル 沖縄)': 'Oriental Hotel Okinawa Resort & Spa',
};

const REIT_PREFIX_EN_MAP: Record<string, string> = {
  '日本ビルファンド': 'NBF',
  'ジャパンリアルエステイト': 'JRE',
  'ジャパンリアル': 'JRE',
  '日本都市ファンド': 'JMF',
  'オリックス不動産': 'ORIX',
  'オリックス': 'ORIX',
  '日本プライムリアルティ': 'JPR',
  'NTT都市開発リート': 'NTT UD REIT',
  'NTT都市開発': 'NTT UD',
  '東急リアル・エステート': 'Tokyu REIT',
  '東急リアル': 'Tokyu REIT',
  '東急REIT': 'Tokyu REIT',
  'グローバル・ワン': 'Global One',
  'ユナイテッド・アーバン': 'United Urban',
  '森トラストリート': 'Mori Trust REIT',
  '森トラスト': 'Mori Trust',
  '阪急阪神リート': 'Hankyu Hanshin REIT',
  'フロンティア不動産': 'Frontier Real Estate',
  '平和不動産リート': 'Heiwa Real Estate REIT',
  '平和不動産': 'Heiwa Real Estate',
  '日本ロジスティクスファンド': 'Japan Logistics Fund',
  '日本ロジ': 'Japan Logistics',
  '福岡リート': 'Fukuoka REIT',
  'KDX不動産': 'KDX',
  'KDX': 'KDX',
  'いちごオフィス': 'Ichigo Office',
  '大和証券オフィス': 'Daiwa Securities Office',
  'スターツプロシード': 'Starts Proceed',
  '大和ハウスリート': 'Daiwa House REIT',
  '大和ハウス': 'Daiwa House',
  '日本ホテルリート': 'Japan Hotel REIT',
  '大和証券リビング': 'Daiwa Living',
  'ジャパンエクセレント': 'Japan Excellent',
  '日本アコモデーション': 'NAF',
  '森ヒルズリート': 'Mori Hills REIT',
  '森ヒルズ': 'Mori Hills',
  'アドバンス・レジデンス': 'Advance Residence',
  'アドバンス・レジ': 'Advance Residence',
  'アドバンス': 'Advance',
  'アクティビア・プロパティーズ': 'Activia Properties',
  'アクティビア': 'Activia',
  'GLP': 'GLP',
  'コンフォリア': 'Comforia',
  'プロロジス': 'Prologis',
  '星野リゾート': 'Hoshino Resorts',
  'イオンリート': 'AEON REIT',
  'イオン': 'AEON',
  'ヒューリックリート': 'Hulic Reit',
  'ヒューリック': 'Hulic',
  '日本リート': 'Nippon REIT',
  'トーセイ・リート': 'Tosei Reit',
  'トーセイ': 'Tosei',
  'サムティ・レジデンシャル': 'Samty Residential',
  'サムティ・レジ': 'Samty Residential',
  'サムティ': 'Samty',
  '野村不動産マスターファンド': 'Nomura Master Fund',
  '野村不動産': 'Nomura Real Estate',
  'いちごホテル': 'Ichigo Hotel',
  'ラサールロジポート': 'LaSalle LOGIPORT',
  'ラサールロジ': 'LaSalle LOGIPORT',
  'スターアジア': 'Star Asia',
  '三井不動産ロジ': 'MFLP',
  '三井不動産': 'Mitsui Fudosan',
  '大江戸温泉': 'Oedo Onsen',
  'みらい': 'Mirai',
  '投資法人みらい': 'Mirai Corporation',
  '三菱地所物流': 'MEL',
  '三菱地所': 'Mitsubishi Estate',
  'CREロジ': 'CRE Logistics',
  'ザイマックス・リート': 'XYMAX REIT',
  'ザイマックス': 'XYMAX',
  'タカラレーベン': 'Takara Leben',
  'アドバンス・ロジ': 'Advance Logistics',
  'エスコンジャパン': 'ESCON Japan',
  'サンケイリアルエステイト': 'Sankei Real Estate',
  'サンケイリアル': 'Sankei Real Estate',
  'ソシラ物流': 'SOSiLA Logistics',
  '東海道リート': 'Tokaido REIT',
  '東海道': 'Tokaido',
  'いちご': 'Ichigo',
  'レジディア': 'Residia',
  'パークアクシス': 'Park Axis',
  'プラウドフラット': 'Proud Flat',
  'ロイヤルパークス': 'Royal Parks',
  'カスタリア': 'Castalia',
  'プライムメゾン': 'Prime Maison',
};

const DISTRICT_EN_MAP: Record<string, string> = {
  '神保町': 'Jimbocho',
  '兜町': 'Kabutocho',
  '西梅田': 'Nishi-Umeda',
  '長町南': 'Nagamachi-Minami',
  '東葛西': 'Higashi-Kasai',
  '白金長者丸': 'Shirokane-Chojamaru',
  '白金高輪': 'Shirokane-Takanawa',
  '白金': 'Shirokane',
  '八潮': 'Yashio',
  '表参道原宿': 'Omotesando Harajuku',
  '表参道': 'Omotesando',
  '原宿': 'Harajuku',
  'ソラスタ': 'SOLASTA',
  'プライムスクエア': 'Prime Square',
  'ビジネススクエア': 'Business Square',
  '錦糸町': 'Kinshicho',
  '大森': 'Omori',
  '栂・美木多': 'Toga Mikita',
  '橋本': 'Hashimoto',
  '葵': 'Aoi',
  '浜松': 'Hamamatsu',
  '横浜港北': 'Yokohama Kohoku',
  '港北': 'Kohoku',
  '新砂': 'Shinsuna',
  '野田': 'Noda',
  '幕張新都心': 'Makuhari New City',
  '幕張': 'Makuhari',
  'レイクタウン': 'Laketown',
  '甲府昭和': 'Kofu Showa',
  '銀座ウォール': 'Ginza Wall',
  '雷門': 'Kaminarimon',
  '博多': 'Hakata',
  '大分': 'Oita',
  '新三郷': 'Shin-Misato',
  '市川': 'Ichikawa',
  '舞洲': 'Maishima',
  '横浜大黒': 'Yokohama Daikoku',
  '大黒': 'Daikoku',
  '座間': 'Zama',
  '猪名川': 'Inagawa',
  '厚木': 'Atsugi',
  '赤坂見附': 'Akasaka-Mitsuke',
  '船橋': 'Funabashi',
  '日野': 'Hino',
  '茨木': 'Ibaraki',
  '中目黒': 'Nakameguro',
  '市谷砂土原町': 'Ichigaya Sadoharacho',
  '市谷': 'Ichigaya',
  '恵比寿': 'Ebisu',
  '青山一丁目': 'Aoyama 1-Chome',
  '青山': 'Aoyama',
  '南青山': 'Minami-Aoyama',
  '代官山': 'Daikanyama',
  '軽井沢': 'Karuizawa',
  '京都': 'Kyoto',
  '箱根': 'Hakone',
  '八ヶ岳': 'Yatsugatake',
  'お台場': 'Odaiba',
  '東京ベイ': 'Tokyo Bay',
  'なんば': 'Namba',
  '難波': 'Namba',
  '心斎橋': 'Shinsaibashi',
  '本町': 'Honmachi',
  '梅田': 'Umeda',
  '丸の内': 'Marunouchi',
  '大手町': 'Otemachi',
  '銀座': 'Ginza',
  '新宿': 'Shinjuku',
  '渋谷': 'Shibuya',
  '日本橋': 'Nihonbashi',
  '赤坂': 'Akasaka',
  '新橋': 'Shimbashi',
  '品川': 'Shinagawa',
  '六本木': 'Roppongi',
  '虎ノ門': 'Toranomon',
  '麻布十番': 'Azabu-Juban',
  '麻布': 'Azabu',
  '目黒': 'Meguro',
  '大崎': 'Ohsaki',
  '豊洲': 'Toyosu',
  '有明': 'Ariake',
  '池袋': 'Ikebukuro',
  '上野': 'Ueno',
  '秋葉原': 'Akihabara',
  '横浜': 'Yokohama',
  '川崎': 'Kawasaki',
  '千葉': 'Chiba',
  '埼玉': 'Saitama',
  '大宮': 'Omiya',
  '大阪': 'Osaka',
  '名古屋': 'Nagoya',
  '栄': 'Sakae',
  '福岡': 'Fukuoka',
  '天神': 'Tenjin',
  '札幌': 'Sapporo',
  '仙台': 'Sendai',
  '広島': 'Hiroshima',
  '神戸': 'Kobe',
  '沖縄': 'Okinawa',
};

export function getReitPropertyName(jpName: string, isEn: boolean): string {
  if (!isEn || !jpName) return jpName;
  if (REIT_PROPERTY_ENGLISH_NAMES[jpName]) {
    return REIT_PROPERTY_ENGLISH_NAMES[jpName];
  }

  let res = jpName;

  // 1. REITプレフィックス置換
  for (const [jpKey, enVal] of Object.entries(REIT_PREFIX_EN_MAP)) {
    if (res.startsWith(jpKey)) {
      res = res.replace(jpKey, enVal + ' ');
      break;
    }
  }

  // 2. 地域・地名置換
  for (const [jpKey, enVal] of Object.entries(DISTRICT_EN_MAP)) {
    res = res.replaceAll(jpKey, ' ' + enVal + ' ');
  }

  // 3. ビル種別・キーワード置換
  res = res
    .replace(/センタービル/g, ' Center Bldg ')
    .replace(/スクエアビル/g, ' Square Bldg ')
    .replace(/スクエア/g, ' Square ')
    .replace(/グランドタワー/g, ' Grand Tower ')
    .replace(/プライムタワー/g, ' Prime Tower ')
    .replace(/シティタワー/g, ' City Tower ')
    .replace(/フロントビル/g, ' Front Bldg ')
    .replace(/タワー/g, ' Tower ')
    .replace(/ロジスティクスセンター/g, ' Logistics Center ')
    .replace(/ロジセンター/g, ' Logistics Center ')
    .replace(/ロジポート/g, ' LOGIPORT ')
    .replace(/流通センター/g, ' Distribution Center ')
    .replace(/ロジパーク/g, ' LogiPark ')
    .replace(/ロジベース/g, ' LogiBase ')
    .replace(/レジデンス/g, ' Residence ')
    .replace(/パークサイド/g, ' Parkside ')
    .replace(/プレミアホテル/g, ' Premier Hotel ')
    .replace(/グランドホテル/g, ' Grand Hotel ')
    .replace(/ダイワロイネットホテル/g, ' Daiwa Roynet Hotel ')
    .replace(/ホテル/g, ' Hotel ')
    .replace(/リゾート/g, ' Resort ')
    .replace(/ショッピングセンター/g, ' Shopping Center ')
    .replace(/モール/g, ' Mall ')
    .replace(/タウン/g, ' Town ')
    .replace(/テラス/g, ' Terrace ')
    .replace(/プラザ/g, ' Plaza ')
    .replace(/オフィス/g, ' Office ')
    .replace(/ビルディング/g, ' Building ')
    .replace(/ビル/g, ' Building ')
    .replace(/（[^）]+）/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  return res;
}