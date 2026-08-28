// 🌐 統合関係性ネットワークデータエンジン (全社網羅 ＆ 資本・人的ネットワーク)

export type NodeType = 'listed_corp' | 'unlisted_corp' | 'person' | 'foundation' | 'group';
export type RelationType = 'capital' | 'governance' | 'kinship' | 'foundation' | 'partnership' | 'keiretsu';

export interface NetworkNode {
  id: string;
  label: string;
  type: NodeType;
  subLabel: string;
  description: string;
  linkUrl?: string;
  avatarUrl?: string;
  badge?: string;
  tags: string[];
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  relationType: RelationType;
  label: string;
  detail: string;
  ratio?: number; // 出資比率(%)
  directional?: boolean;
}

export interface NetworkGraphData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

// 🏛️ 公式ナレッジグラフ マスターデータ (主要財閥・系列・創業家・テック・出版メディア・流通)
export const MASTER_RELATIONSHIP_DATA: NetworkGraphData = {
  nodes: [
    // 🚘 1. トヨタ自動車グループ & 豊田家
    {
      id: 'corp-7203',
      label: 'トヨタ自動車株式会社',
      type: 'listed_corp',
      subLabel: '東証プライム 7203 / 輸送用機器',
      description: '世界首位の自動車メーカー。時価総額約41.5兆円。',
      linkUrl: '/stocks/7203',
      badge: '時価総額41.5兆円',
      tags: ['トヨタグループ', '自動車', 'モビリティ']
    },
    {
      id: 'person-toyoda-akio',
      label: '豊田 章男',
      type: 'person',
      subLabel: '代表取締役会長 / 豊田家第4代',
      description: 'トヨタ自動車創業者・豊田喜一郎の孫。日本自動車工業会元会長。マスタードライバー（モリゾウ）。',
      badge: '代表取締役会長',
      tags: ['豊田家', '経営者', '創業者一族']
    },
    {
      id: 'person-sato-koji',
      label: '佐藤 恒治',
      type: 'person',
      subLabel: '代表取締役社長 / CEO',
      description: 'レクサス・GR事業プレジデントを経て2023年4月よりトヨタ自動車代表取締役社長CEO就任。',
      badge: '代表取締役社長CEO',
      tags: ['経営陣', 'エンジニア']
    },
    {
      id: 'person-toyoda-kiichiro',
      label: '豊田 喜一郎',
      type: 'person',
      subLabel: 'トヨタ自動車 創業者 (故人)',
      description: '自動織機製造から国産自動車産業を興したトヨタ自動車創業者。豊田佐吉の長男。',
      badge: '歴史的創業者',
      tags: ['歴史的創業者', '豊田家']
    },
    {
      id: 'corp-6201',
      label: '株式会社豊田自動織機',
      type: 'listed_corp',
      subLabel: '東証プライム 6201 / 機械',
      description: 'トヨタグループの本家・発祥企業。フォークリフト世界首位。トヨタ株を約8.4%保有する大株主。',
      linkUrl: '/stocks/6201',
      badge: 'グループ発祥母体',
      tags: ['トヨタグループ', '発祥企業']
    },
    {
      id: 'corp-6902',
      label: '株式会社デンソー',
      type: 'listed_corp',
      subLabel: '東証プライム 6902 / 電気機器',
      description: '世界トップクラスの自動車部品メガサプライヤー。CASE・半導体・電動化の中核。',
      linkUrl: '/stocks/6902',
      badge: '部品メガサプライヤー',
      tags: ['トヨタグループ', 'CASE']
    },
    {
      id: 'corp-7259',
      label: '株式会社アイシン',
      type: 'listed_corp',
      subLabel: '東証プライム 7259 / 輸送用機器',
      description: '世界トップシェアのトランスミッション・eAxle（電動駆動）メーカー。',
      linkUrl: '/stocks/7259',
      badge: '駆動系世界首位',
      tags: ['トヨタグループ', 'EV']
    },
    {
      id: 'corp-8015',
      label: '豊田通商株式会社',
      type: 'listed_corp',
      subLabel: '東証プライム 8015 / 卸売業',
      description: 'トヨタグループ中核の総合商社。アフリカ市場およびリチウム・蓄電池サプライチェーンに強み。',
      linkUrl: '/stocks/8015',
      badge: 'グループ総合商社',
      tags: ['トヨタグループ', '商社']
    },

    // 🏢 2. 三菱グループ (金曜会) ＆ 三菱商事 ＆ 三菱重工 ＆ MUFG
    {
      id: 'corp-8058',
      label: '三菱商事株式会社',
      type: 'listed_corp',
      subLabel: '東証プライム 8058 / 卸売業',
      description: '総合商社トップ。天然ガス、金属資源、産業インフラ、自動車、食品等の世界的ポートフォリオ。時価総額約13.2兆円。',
      linkUrl: '/stocks/8058',
      badge: '総合商社トップ',
      tags: ['三菱グループ', '総合商社', '金曜会']
    },
    {
      id: 'corp-7011',
      label: '三菱重工業株式会社',
      type: 'listed_corp',
      subLabel: '東証プライム 7011 / 機械',
      description: '防衛・航空宇宙・エネルギープラント・原子力の中核。防衛省向け調達シェア首位。',
      linkUrl: '/stocks/7011',
      badge: '防衛・エネルギー中核',
      tags: ['三菱グループ', '防衛', '重工']
    },
    {
      id: 'corp-8306',
      label: '株式会社三菱UFJフィナンシャル・グループ (MUFG)',
      type: 'listed_corp',
      subLabel: '東証プライム 8306 / 銀行業',
      description: '国内最大の民間金融メガバンクグループ。モルガン・スタンレーの筆頭株主。時価総額約20兆円。',
      linkUrl: '/stocks/8306',
      badge: 'メガバンク首位',
      tags: ['三菱グループ', 'メガバンク', '金融']
    },
    {
      id: 'corp-8802',
      label: '三菱地所株式会社',
      type: 'listed_corp',
      subLabel: '東証プライム 8802 / 不動産業',
      description: '丸の内・大手町・有楽町の「大丸有」エリアを中核とする総合デベロッパー首位。',
      linkUrl: '/stocks/8802',
      badge: '丸の内デベロッパー',
      tags: ['三菱グループ', '不動産', '丸の内']
    },
    {
      id: 'person-iwasaki-yataro',
      label: '岩崎 彌太郎',
      type: 'person',
      subLabel: '三菱財閥 創業者 (歴史的人物)',
      description: '土佐藩出身。海運会社「九十九商会」「三菱商会」を興し、日本の近代産業の礎を築いた三菱グループ創始者。',
      badge: '三菱グループ開祖',
      tags: ['歴史的創業者', '岩崎家', '三菱']
    },

    // 📚 3. 出版メディア ＆ 創業家 ＆ 文学顕彰財団
    {
      id: 'unlisted-bungeishunju',
      label: '株式会社文藝春秋',
      type: 'unlisted_corp',
      subLabel: '未上場 / 出版・メディア',
      description: '1923年創業。『週刊文春』『文春オンライン』『文藝春秋』『Number』を発行する総合出版社。',
      linkUrl: '/unlisted/bungeishunju',
      badge: '売上約190億円',
      tags: ['総合出版', '週刊誌', '文藝春秋']
    },
    {
      id: 'person-kikuchi-kan',
      label: '菊池 寛',
      type: 'person',
      subLabel: '文藝春秋 創業者 / 作家 (故人)',
      description: '大正・昭和期の文豪。1923年に文藝春秋社を創立し、芥川賞・直木賞を創設。',
      badge: '創業者・文豪',
      tags: ['歴史的創業者', '芥川賞創設者']
    },
    {
      id: 'person-iikubo-shigeyuki',
      label: '飯窪 成幸',
      type: 'person',
      subLabel: '代表取締役社長 (文藝春秋)',
      description: '文藝春秋代表取締役社長。『週刊文春』編集長を経て経営トップに就任。構造改革を推進。',
      badge: '代表取締役社長',
      tags: ['経営トップ', '編集長出身']
    },
    {
      id: 'foundation-nihon-bungaku',
      label: '公益財団法人 日本文学振興会',
      type: 'foundation',
      subLabel: '公益財団法人 / 文化顕彰母体',
      description: '菊池寛の遺志に基づき設立。芥川龍之介賞・直木三十五賞・大宅壮一ノンフィクション賞の選考・授賞を主宰。',
      badge: '芥川賞・直木賞主宰',
      tags: ['文学賞', '公益財団']
    },
    {
      id: 'unlisted-shinchosha',
      label: '株式会社新潮社',
      type: 'unlisted_corp',
      subLabel: '未上場 / 出版・メディア',
      description: '1896年創業。『新潮文庫』『週刊新潮』『波』やWebマンガ『くらげバンチ』を展開する名門出版社。',
      linkUrl: '/unlisted/shinchosha',
      badge: '自己資本比率80.8%',
      tags: ['名門出版', '文庫', '新潮社']
    },
    {
      id: 'person-sato-takanobu',
      label: '佐藤 隆信',
      type: 'person',
      subLabel: '代表取締役社長 / 佐藤家第4代',
      description: '新潮社代表取締役社長。創業者・佐藤義亮の曾孫。日本書籍出版協会元理事。',
      badge: '代表取締役社長',
      tags: ['佐藤家', '経営トップ', '創業家']
    },
    {
      id: 'person-sato-giryo',
      label: '佐藤 義亮',
      type: 'person',
      subLabel: '新潮社 創業者 (故人)',
      description: '1896年に新潮社の前身「新声社」を創業。夏目漱石や島崎藤村等の文学全集・文庫を刊行。',
      badge: '歴史的創業者',
      tags: ['歴史的創業者', '佐藤家']
    },
    {
      id: 'foundation-shincho-bungei',
      label: '公益財団法人 新潮文芸振興会',
      type: 'foundation',
      subLabel: '公益財団法人 / 文化顕彰母体',
      description: '新潮社が支援する文化財団。三島由紀夫賞・山本周五郎賞・小林秀雄賞・新潮ドキュメント賞の選考・顕彰を運営。',
      badge: '三島賞・山本賞主宰',
      tags: ['文学賞', '公益財団']
    },
    {
      id: 'unlisted-shogakukan',
      label: '株式会社小学館',
      type: 'unlisted_corp',
      subLabel: '未上場 / 出版・一ツ橋グループ',
      description: '1922年創業。一ツ橋グループ（集英社、白泉社等）の創業母体。『少年サンデー』『CanCam』等。',
      linkUrl: '/unlisted/shogakukan',
      badge: '一ツ橋グループ創業母体',
      tags: ['一ツ橋グループ', 'マンガ', '小学館']
    },
    {
      id: 'unlisted-shueisha',
      label: '株式会社集英社',
      type: 'unlisted_corp',
      subLabel: '未上場 / 出版・マンガ',
      description: '1926年創業。『週刊少年ジャンプ』『ヤングジャンプ』『りぼん』『non-no』。世界最高峰のマンガIPを保有。',
      linkUrl: '/unlisted/shueisha',
      badge: 'ジャンプIP世界展開',
      tags: ['一ツ橋グループ', 'ジャンプ', '集英社']
    },
    {
      id: 'person-ohga-nobuhiro',
      label: '相賀 信宏',
      type: 'person',
      subLabel: '小学館 代表取締役社長 / 相賀家第4代',
      description: '小学館第4代代表取締役社長。創業者・相賀武夫の曾孫。一ツ橋グループの経営統括。',
      badge: '代表取締役社長 (相賀家)',
      tags: ['相賀家', '一ツ橋グループ', '創業家']
    },

    // 📱 4. パピレス ＆ 創業者 ＆ 経営陣 ＆ 主要出資企業
    {
      id: 'corp-3641',
      label: '株式会社パピレス',
      type: 'listed_corp',
      subLabel: '東証スタンダード 3641 / 情報・通信業',
      description: '日本初の電子書籍レンタルPF「Renta!」を運営。電子コミック黎明期からのパイオニア。',
      linkUrl: '/stocks/3641',
      badge: '電子書籍パイオニア',
      tags: ['電子書籍', 'Renta!']
    },
    {
      id: 'person-amaya-mikio',
      label: '天谷 幹夫',
      type: 'person',
      subLabel: '創業者 / 取締役会長 / 筆頭株主 (34.50%)',
      description: '富士通出身。1995年に日本初の電子書籍配信会社としてパピレスを創業。発行済株式の34.50%を保有する筆頭株主。',
      badge: '創業者・筆頭株主 (34.5%)',
      tags: ['創業者', '筆頭株主', '富士通出身']
    },
    {
      id: 'person-matsui-yasuko',
      label: '松井 康子',
      type: 'person',
      subLabel: '代表取締役社長 / 第2位個人株主 (5.80%)',
      description: '創業期から天谷氏と共に事業を立ち上げ、2010年より代表取締役社長に就任。「Renta!」のメガヒットを牽引。',
      badge: '代表取締役社長 (5.8%)',
      tags: ['代表取締役社長', '共同経営者']
    },
    {
      id: 'corp-6460',
      label: 'セガサミーホールディングス株式会社',
      type: 'listed_corp',
      subLabel: '東証プライム 6460 / その他製品',
      description: '総合エンタテインメント大手。パピレス株の5.12%を保有する第3位主要大株主。',
      linkUrl: '/stocks/6460',
      badge: '大株主 (5.12%)',
      tags: ['エンタメ', 'ゲーム']
    },
    {
      id: 'corp-nippan',
      label: '日本出版販売株式会社 (日販)',
      type: 'unlisted_corp',
      subLabel: '未上場 / 出版取次大手',
      description: '国内最大の出版取次・書店流通ネットワーク。パピレス株の4.80%を保有する第4位株主。',
      badge: '出版取次大手 (4.8%)',
      tags: ['出版取次', '流通']
    },

    // 👕 5. ファーストリテイリング ＆ 柳井家
    {
      id: 'corp-9983',
      label: '株式会社ファーストリテイリング',
      type: 'listed_corp',
      subLabel: '東証プライム 9983 / 小売業',
      description: '「ユニクロ」「GU」を展開する世界時価総額首位級のアパレルコングロマリット。時価総額約14.8兆円。',
      linkUrl: '/stocks/9983',
      badge: '時価総額14.8兆円',
      tags: ['アパレル', 'ユニクロ', '世界首位級']
    },
    {
      id: 'person-yanai-tadashi',
      label: '柳井 正',
      type: 'person',
      subLabel: '代表取締役会長兼社長 / 創業者 / 筆頭株主',
      description: '山口県宇部市の個人商店「メンズショップOS」から一代で世界最大級のアパレル帝国を築いた創業者。保有比率約21.6%。',
      badge: '創業者会長兼社長 (21.6%)',
      tags: ['創業者', '筆頭株主', '柳井家']
    },
    {
      id: 'person-yanai-kazumi',
      label: '柳井 一海',
      type: 'person',
      subLabel: '取締役グループ上席執行役員 / 柳井家長男',
      description: '柳井正氏の長男。ボストン大学MBA、ゴールドマン・サックス出身。Link Theory Japan会長等を歴任。',
      badge: '取締役 / 主要株主 (4.5%)',
      tags: ['柳井家', '後継陣', '主要株主']
    },
    {
      id: 'person-yanai-koji',
      label: '柳井 康治',
      type: 'person',
      subLabel: 'グループ上席執行役員 / 柳井家次男',
      description: '柳井正氏の次男。三菱商事出身。グローバルマーケティングおよび「THE TOKYO TOILET」プロジェクト等を主導。',
      badge: '上席執行役員 / 主要株主 (4.5%)',
      tags: ['柳井家', '主要株主']
    },
    {
      id: 'corp-tty-management',
      label: '有限会社ティー・ティー・ワイ',
      type: 'unlisted_corp',
      subLabel: '未上場 / 柳井家 資産管理会社',
      description: '柳井正氏および柳井家一族の資産管理法人。ファーストリテイリング株式の約5.3%を保有。',
      badge: '創業家資産管理会社 (5.3%)',
      tags: ['資産管理会社', '柳井家']
    },

    // 💻 6. ソフトバンクグループ ＆ 孫正義氏
    {
      id: 'corp-9984',
      label: 'ソフトバンクグループ株式会社',
      type: 'listed_corp',
      subLabel: '東証プライム 9984 / 情報・通信業',
      description: '世界最大のテック特化型投資持株会社（SoftBank Vision Fund / ARM親会社）。',
      linkUrl: '/stocks/9984',
      badge: 'グローバルAI投資持株会社',
      tags: ['AI', 'ビジョンファンド', 'ARM']
    },
    {
      id: 'person-son-masayoshi',
      label: '孫 正義',
      type: 'person',
      subLabel: '代表取締役 会長兼社長執行役員 / 創業者',
      description: '1981年に日本ソフトバンクを創業。ヤフー、アリババ、ARMへの巨額投資を成功させた世界的投資家・起業家。',
      badge: '創業者兼CEO (約29%保有)',
      tags: ['創業者', '筆頭株主', '世界的投資家']
    },
    {
      id: 'corp-9434',
      label: 'ソフトバンク株式会社',
      type: 'listed_corp',
      subLabel: '東証プライム 9434 / 情報・通信業',
      description: '国内通信メガキャリア（SoftBank, Y!mobile, LINEヤフー親会社）。配当利回り約4.5%のキャッシュカウ。',
      linkUrl: '/stocks/9434',
      badge: '国内通信中核子会社',
      tags: ['通信', '配当', 'LINEヤフー']
    },
    {
      id: 'corp-arm',
      label: 'Arm Holdings plc (NASDAQ: ARM)',
      type: 'listed_corp',
      subLabel: '米国NASDAQ上場 / 半導体IP首位',
      description: '世界中のスマートフォン・AIデータセンター向けプロセッサアーキテクチャの99%を独占する英国半導体設計大手。',
      badge: 'SBG保有比率約90%',
      tags: ['半導体', 'AI', 'NASDAQ']
    },

    // 🎮 7. ソニーグループ ＆ 創業者
    {
      id: 'corp-6758',
      label: 'ソニーグループ株式会社',
      type: 'listed_corp',
      subLabel: '東証プライム 6758 / 電気機器',
      description: 'ゲーム（PlayStation）、音楽（Sony Music）、映画（Columbia Pictures）、半導体（CMOSセンサー）、金融を擁する世界的エンタメコングロマリット。',
      linkUrl: '/stocks/6758',
      badge: '時価総額17.8兆円',
      tags: ['ソニー', 'エンタメ', 'PlayStation', 'CMOS']
    },
    {
      id: 'person-morita-akio',
      label: '盛田 昭夫',
      type: 'person',
      subLabel: 'ソニー 共同創業者 (故人)',
      description: '井深大と共に東京通信工業（現ソニー）を創業。ウォークマンを世界的大ヒットに導いた名経営者。',
      badge: '歴史的共同創業者',
      tags: ['歴史的創業者', '盛田家']
    },
    {
      id: 'person-ibuka-masaru',
      label: '井深 大',
      type: 'person',
      subLabel: 'ソニー 共同創業者 / 技術者 (故人)',
      description: '東京通信工業創立の技術的支柱。「自由闊達にして愉快なる理想工場」の設立趣意書を起草。',
      badge: '歴史的共同創業者・技術者',
      tags: ['歴史的創業者', 'エンジニア']
    },
    {
      id: 'person-totoki-hiroyuki',
      label: '十時 裕樹',
      type: 'person',
      subLabel: '代表執行役 社長COO 兼 CFO',
      description: 'ソニー銀行・ソニーネットワークコミュニケーションズ立ち上げを主導し、現ソニーグループ社長COO兼CFO。',
      badge: '現社長COO兼CFO',
      tags: ['経営トップ', 'CFO']
    },

    // 🔬 8. キーエンス ＆ 滝崎武光氏
    {
      id: 'corp-6861',
      label: '株式会社キーエンス',
      type: 'listed_corp',
      subLabel: '東証プライム 6861 / 電気機器',
      description: 'ファクトリーオートメーション用センサ・測定器の世界的超高収益企業。営業利益率約51%、自己資本比率94.2%。',
      linkUrl: '/stocks/6861',
      badge: '営業利益率51.4%',
      tags: ['高収益', 'センサ', 'FA']
    },
    {
      id: 'person-takizaki-takemitsu',
      label: '滝崎 武光',
      type: 'person',
      subLabel: 'キーエンス 創業者 / 名誉会長 / 筆頭株主',
      description: '1974年にリード電機（現キーエンス）を創業。「最小の資本と人で最大の付加価値を上げる」直販即日納入モデルを確立。',
      badge: '創業者名誉会長 (筆頭株主)',
      tags: ['創業者', '筆頭株主', '高収益']
    },
    {
      id: 'corp-tt-asset',
      label: '株式会社ティ・ティ',
      type: 'unlisted_corp',
      subLabel: '未上場 / 滝崎家 資産管理会社',
      description: '滝崎武光氏および滝崎一族の資産管理法人。キーエンス株式の約14.8%を保有する筆頭株主法人。',
      badge: '滝崎家資産管理会社 (14.8%)',
      tags: ['資産管理会社', 'キーエンス']
    }
  ],

  edges: [
    // 🚘 1. トヨタ自動車 エッジ
    {
      id: 'e-toyoda-akio-7203',
      source: 'person-toyoda-akio',
      target: 'corp-7203',
      relationType: 'governance',
      label: '代表取締役会長',
      detail: '経営の最高責任者・マスタードライバーとしてグループ全体のモビリティ変革を指揮。'
    },
    {
      id: 'e-sato-koji-7203',
      source: 'person-sato-koji',
      target: 'corp-7203',
      relationType: 'governance',
      label: '代表取締役社長CEO',
      detail: 'EV・知能化・多様なパワートレイン戦略の執行統括。'
    },
    {
      id: 'e-toyoda-akio-sato-koji',
      source: 'person-toyoda-akio',
      target: 'person-sato-koji',
      relationType: 'governance',
      label: '会長 ⇄ 社長 (経営バディ)',
      detail: '章男会長が指名・禅譲し、二人三脚で次世代トヨタの経営を推進。'
    },
    {
      id: 'e-toyoda-kiichiro-toyoda-akio',
      source: 'person-toyoda-kiichiro',
      target: 'person-toyoda-akio',
      relationType: 'kinship',
      label: '祖父 ⇄ 孫 (創業家承継)',
      detail: '喜一郎の次男・豊田章一郎名誉会長の長男が豊田章男会長。'
    },
    {
      id: 'e-6201-7203',
      source: 'corp-6201',
      target: 'corp-7203',
      relationType: 'capital',
      label: '大株主 (8.4%) / 発祥母体',
      ratio: 8.4,
      detail: '豊田自動織機自動車部門が独立してトヨタ自動車が誕生。現在も相互保有関係を維持。'
    },
    {
      id: 'e-7203-6902',
      source: 'corp-7203',
      target: 'corp-6902',
      relationType: 'capital',
      label: '筆頭株主 (24.2%) / 資本提携',
      ratio: 24.2,
      detail: 'デンソーの筆頭株主であり、車載半導体・電動化コンポーネントを共同開発。'
    },
    {
      id: 'e-7203-7259',
      source: 'corp-7203',
      target: 'corp-7259',
      relationType: 'capital',
      label: '筆頭株主 (24.8%) / 系列中核',
      ratio: 24.8,
      detail: 'アイシンの筆頭株主。トランスミッションおよびeAxleの基幹供給先。'
    },
    {
      id: 'e-7203-8015',
      source: 'corp-7203',
      target: 'corp-8015',
      relationType: 'capital',
      label: '筆頭株主 (21.7%) / 商社機能',
      ratio: 21.7,
      detail: '豊田通商の筆頭株主。完成車輸出およびグローバル素材・リチウム調達を担当。'
    },

    // 🏢 2. 三菱グループ エッジ
    {
      id: 'e-iwasaki-8058',
      source: 'person-iwasaki-yataro',
      target: 'corp-8058',
      relationType: 'governance',
      label: '三菱財閥 開祖',
      detail: '岩崎彌太郎が興した三菱商会が、戦後の財閥解体を経て現在の三菱商事へ発展。'
    },
    {
      id: 'e-iwasaki-7011',
      source: 'person-iwasaki-yataro',
      target: 'corp-7011',
      relationType: 'governance',
      label: '三菱重工 開祖',
      detail: '長崎造船所を官営払い下げにより取得し、三菱の重工業・造船基盤を築く。'
    },
    {
      id: 'e-8058-8306',
      source: 'corp-8058',
      target: 'corp-8306',
      relationType: 'keiretsu',
      label: '三菱金曜会 中核 (相互持合い)',
      detail: '三菱グループ首脳会「金曜会」の筆頭幹事社同士として強力な資本・取引連携。'
    },
    {
      id: 'e-8058-7011',
      source: 'corp-8058',
      target: 'corp-7011',
      relationType: 'keiretsu',
      label: '三菱金曜会 御三家 (プラント・防衛)',
      detail: '三菱重工の発電プラント・防衛装備・LNG船のグローバル輸出を三菱商事が共同推進。'
    },
    {
      id: 'e-8058-8802',
      source: 'corp-8058',
      target: 'corp-8802',
      relationType: 'keiretsu',
      label: '三菱金曜会 (丸の内都市開発)',
      detail: '丸の内本拠地の開発および大型インフラファンド組成で三菱地所と密接連携。'
    },

    // 📚 3. 出版メディア ＆ 創業家 ＆ 文学財団 エッジ
    {
      id: 'e-kikuchi-kan-bungei',
      source: 'person-kikuchi-kan',
      target: 'unlisted-bungeishunju',
      relationType: 'governance',
      label: '1923年 創業者',
      detail: '作家・菊池寛が私費を投じて創刊・創立した総合出版社。'
    },
    {
      id: 'e-iikubo-bungei',
      source: 'person-iikubo-shigeyuki',
      target: 'unlisted-bungeishunju',
      relationType: 'governance',
      label: '代表取締役社長',
      detail: '代表取締役社長として出版事業の構造改革・デジタル課金シフトを推進。'
    },
    {
      id: 'e-bungei-nihon-bungaku',
      source: 'unlisted-bungeishunju',
      target: 'foundation-nihon-bungaku',
      relationType: 'foundation',
      label: '設立支援・運営母体 (芥川賞・直木賞)',
      detail: '文藝春秋本社内に事務局を置き、日本最高峰の純文学・大衆文学賞の選考・顕彰を全面バックアップ。'
    },
    {
      id: 'e-kikuchi-kan-nihon-bungaku',
      source: 'person-kikuchi-kan',
      target: 'foundation-nihon-bungaku',
      relationType: 'foundation',
      label: '芥川賞・直木賞 創設者',
      detail: '友人の芥川龍之介・直木三十五の業績を記念して菊池寛が文学賞を創設。'
    },
    {
      id: 'e-sato-giryo-shincho',
      source: 'person-sato-giryo',
      target: 'unlisted-shinchosha',
      relationType: 'governance',
      label: '1896年 創業者',
      detail: '秋田県出身の佐藤義亮が上京して創業。「新潮」「新潮文庫」の礎を築く。'
    },
    {
      id: 'e-sato-takanobu-shincho',
      source: 'person-sato-takanobu',
      target: 'unlisted-shinchosha',
      relationType: 'governance',
      label: '代表取締役社長 (創業家第4代)',
      detail: '佐藤義亮の曾孫として新潮社代表取締役社長に就任。'
    },
    {
      id: 'e-sato-giryo-sato-takanobu',
      source: 'person-sato-giryo',
      target: 'person-sato-takanobu',
      relationType: 'kinship',
      label: '曾祖父 ⇄ 曾孫 (佐藤家直系)',
      detail: '創業家佐藤家による一貫した同族オーナー経営を継承。'
    },
    {
      id: 'e-shincho-shincho-bungei',
      source: 'unlisted-shinchosha',
      target: 'foundation-shincho-bungei',
      relationType: 'foundation',
      label: '設立支援・顕彰母体 (三島賞・山本賞)',
      detail: '新潮社創立90周年記念事業として設立。三島由紀夫賞・山本周五郎賞を主宰。'
    },
    {
      id: 'e-shogakukan-shueisha',
      source: 'unlisted-shogakukan',
      target: 'unlisted-shueisha',
      relationType: 'capital',
      label: '一ツ橋グループ母体 (共同出資)',
      detail: '1926年に小学館の娯楽出版部門が独立して集英社が誕生。一ツ橋グループとして強固に提携。'
    },
    {
      id: 'e-ohga-shogakukan',
      source: 'person-ohga-nobuhiro',
      target: 'unlisted-shogakukan',
      relationType: 'governance',
      label: '代表取締役社長 (相賀家第4代)',
      detail: '創業家相賀家の直系として小学館の経営およびグループ統括を牽引。'
    },

    // 📱 4. パピレス エッジ
    {
      id: 'e-amaya-papyless',
      source: 'person-amaya-mikio',
      target: 'corp-3641',
      relationType: 'governance',
      label: '創業者 / 取締役会長 / 筆頭株主 (34.50%)',
      ratio: 34.5,
      detail: '1995年創業。現在も34.50%の議決権を保有する筆頭株主かつ取締役会長。'
    },
    {
      id: 'e-matsui-papyless',
      source: 'person-matsui-yasuko',
      target: 'corp-3641',
      relationType: 'governance',
      label: '代表取締役社長 / 第2位個人株主 (5.80%)',
      ratio: 5.8,
      detail: '創業期から天谷氏と二人三脚で事業を成長させ、2010年より代表取締役社長。5.80%保有。'
    },
    {
      id: 'e-amaya-matsui',
      source: 'person-amaya-mikio',
      target: 'person-matsui-yasuko',
      relationType: 'governance',
      label: '共同創業者 ⇄ 後継社長 (経営パートナー)',
      detail: '30年近くにわたり電子書籍プラットフォームを二人三脚で切り拓いてきた強固な共同経営関係。'
    },
    {
      id: 'e-segasammy-papyless',
      source: 'corp-6460',
      target: 'corp-3641',
      relationType: 'capital',
      label: '第3位主要大株主 (5.12%)',
      ratio: 5.12,
      detail: 'セガサミーHDが戦略的提携先としてパピレス株式の5.12%（51.2万株）を保有。'
    },
    {
      id: 'e-nippan-papyless',
      source: 'corp-nippan',
      target: 'corp-3641',
      relationType: 'capital',
      label: '第4位主要株主 (4.80%) / 出版取次提携',
      ratio: 4.8,
      detail: '出版取次大手の日販がパピレス株式の4.80%（48.0万株）を保有。'
    },

    // 👕 5. ファーストリテイリング エッジ
    {
      id: 'e-yanai-tadashi-9983',
      source: 'person-yanai-tadashi',
      target: 'corp-9983',
      relationType: 'governance',
      label: '創業者 会長兼社長 / 筆頭株主 (21.6%)',
      ratio: 21.6,
      detail: 'ユニクロを世界トップに育てた創業者。個人で約21.6%（6,800万株）を直接保有。'
    },
    {
      id: 'e-yanai-kazumi-9983',
      source: 'person-yanai-kazumi',
      target: 'corp-9983',
      relationType: 'governance',
      label: '取締役 上席執行役員 (4.5%保有)',
      ratio: 4.5,
      detail: '長男・一海氏がグループ取締役として参画。個人で約4.5%（1,400万株）を保有。'
    },
    {
      id: 'e-yanai-koji-9983',
      source: 'person-yanai-koji',
      target: 'corp-9983',
      relationType: 'governance',
      label: 'グループ上席執行役員 (4.5%保有)',
      ratio: 4.5,
      detail: '次男・康治氏がマーケティング・文化事業を統括。個人で約4.5%（1,400万株）を保有。'
    },
    {
      id: 'e-yanai-tadashi-kazumi',
      source: 'person-yanai-tadashi',
      target: 'person-yanai-kazumi',
      relationType: 'kinship',
      label: '父 ⇄ 長男 (柳井家後継)',
      detail: '世界屈指のアパレルコングロマリットにおける創業家ガバナンスと次世代承継。'
    },
    {
      id: 'e-yanai-tadashi-koji',
      source: 'person-yanai-tadashi',
      target: 'person-yanai-koji',
      relationType: 'kinship',
      label: '父 ⇄ 次男 (柳井家後継)',
      detail: 'ブランド戦略とグローバルクリエイティブを率いる次男・康治氏との家族・経営連携。'
    },
    {
      id: 'e-tty-9983',
      source: 'corp-tty-management',
      target: 'corp-9983',
      relationType: 'capital',
      label: '創業家資産管理会社 (5.3%保有)',
      ratio: 5.3,
      detail: '柳井家のプライベートアセット会社「TTY」がファストリ株を約5.3%（1,600万株）保有。'
    },
    {
      id: 'e-yanai-tadashi-tty',
      source: 'person-yanai-tadashi',
      target: 'corp-tty-management',
      relationType: 'governance',
      label: '代表者 / 実質支配',
      detail: '柳井正氏および親族が100%所有するファミリー・オフィス。'
    },

    // 💻 6. ソフトバンクグループ エッジ
    {
      id: 'e-son-9984',
      source: 'person-son-masayoshi',
      target: 'corp-9984',
      relationType: 'governance',
      label: '創業者 会長兼社長 (29%保有)',
      ratio: 29.0,
      detail: 'ソフトバンクグループ創業者。個人および資産管理会社を通じて約29%の議決権を掌握。'
    },
    {
      id: 'e-9984-9434',
      source: 'corp-9984',
      target: 'corp-9434',
      relationType: 'capital',
      label: '親会社 (40.5%保有・連結)',
      ratio: 40.5,
      detail: '国内通信事業を手がけるソフトバンク株式会社の親会社（40.5%保有）。'
    },
    {
      id: 'e-9984-arm',
      source: 'corp-9984',
      target: 'corp-arm',
      relationType: 'capital',
      label: '親会社 (約90%保有)',
      ratio: 90.0,
      detail: '2016年に約3.3兆円で買収。NASDAQ上場後もSBGが約90%の株式を保有する超中核AI資産。'
    },

    // 🎮 7. ソニーグループ エッジ
    {
      id: 'e-morita-ibuka',
      source: 'person-morita-akio',
      target: 'person-ibuka-masaru',
      relationType: 'governance',
      label: '伝説の共同創業者ペア (経営 ⇄ 技術)',
      detail: '戦後焼け跡の東京で出会い、世界的イノベーション企業ソニーを共に創り上げた名コンビ。'
    },
    {
      id: 'e-morita-6758',
      source: 'person-morita-akio',
      target: 'corp-6758',
      relationType: 'governance',
      label: '共同創業者・名誉会長',
      detail: 'グローバルブランド「SONY」の確立と海外進出を主導。'
    },
    {
      id: 'e-ibuka-6758',
      source: 'person-ibuka-masaru',
      target: 'corp-6758',
      relationType: 'governance',
      label: '共同創業者・名誉会長',
      detail: 'トランジスタラジオ、トリニトロンカラーテレビなど画期的製品開発を指揮。'
    },
    {
      id: 'e-totoki-6758',
      source: 'person-totoki-hiroyuki',
      target: 'corp-6758',
      relationType: 'governance',
      label: '代表執行役 社長COO 兼 CFO',
      detail: 'ゲーム・音楽・映画・半導体・金融の5大ポートフォリオのキャピタルアロケーションを統括。'
    },

    // 🔬 8. キーエンス エッジ
    {
      id: 'e-takizaki-6861',
      source: 'person-takizaki-takemitsu',
      target: 'corp-6861',
      relationType: 'governance',
      label: '創業者 / 取締役名誉会長',
      detail: '時価総額約17.2兆円、営業利益率50%超の超高収益モデルを創出。個人および資産管理会社で筆頭支配。'
    },
    {
      id: 'e-tt-6861',
      source: 'corp-tt-asset',
      target: 'corp-6861',
      relationType: 'capital',
      label: '筆頭株主法人 (14.8%保有)',
      ratio: 14.8,
      detail: '滝崎家の資産管理法人ティ・ティがキーエンス株式の14.8%（3,600万株）を保有。'
    },
    {
      id: 'e-takizaki-tt',
      source: 'person-takizaki-takemitsu',
      target: 'corp-tt-asset',
      relationType: 'governance',
      label: '代表者 / ファミリーオフィス',
      detail: '滝崎武光氏および親族が100%管理するファミリーアセット持株会社。'
    }
  ]
};

// 🔍 ヘルパー関数: 特定のエンティティIDに関連するサブグラフ（1〜2ホップ）を取得
export function getSubGraphForEntity(entityId: string, depth: number = 1): NetworkGraphData {
  const connectedNodeIds = new Set<string>([entityId]);
  const connectedEdges: NetworkEdge[] = [];

  // 1ホップ目
  for (const edge of MASTER_RELATIONSHIP_DATA.edges) {
    if (edge.source === entityId || edge.target === entityId) {
      connectedEdges.push(edge);
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    }
  }

  // 2ホップ目 (depth >= 2)
  if (depth >= 2) {
    const firstHopIds = new Set(connectedNodeIds);
    for (const edge of MASTER_RELATIONSHIP_DATA.edges) {
      if (firstHopIds.has(edge.source) || firstHopIds.has(edge.target)) {
        if (!connectedEdges.some(e => e.id === edge.id)) {
          connectedEdges.push(edge);
        }
        connectedNodeIds.add(edge.source);
        connectedNodeIds.add(edge.target);
      }
    }
  }

  const nodes = MASTER_RELATIONSHIP_DATA.nodes.filter(n => connectedNodeIds.has(n.id));
  return { nodes, edges: connectedEdges };
}
