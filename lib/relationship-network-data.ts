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

// 🏛️ 公式ナレッジグラフ マスターデータ (全主要メガキャップ・名門企業・創業家・子会社・関連会社・財団)
export const MASTER_RELATIONSHIP_DATA: NetworkGraphData = {
  nodes: [
    // ==========================================
    // 🚘 1. トヨタ自動車グループ & 豊田家
    // ==========================================
    { id: 'corp-7203', label: 'トヨタ自動車株式会社', type: 'listed_corp', subLabel: '7203 / 東証プライム', description: '日本最大のグローバル自動車メーカー。', linkUrl: '/stocks/7203', tags: ['自動車', '系列', '愛知'] },
    { id: 'corp-6902', label: '株式会社デンソー', type: 'listed_corp', subLabel: '6902 / 東証プライム', description: '世界屈指の総合自動車電装・半導体部品メガサプライヤー。', linkUrl: '/stocks/6902', tags: ['系列', '電装部品'] },
    { id: 'corp-7259', label: '株式会社アイシン', type: 'listed_corp', subLabel: '7259 / 東証プライム', description: '世界トップのオートマチックトランスミッション・電動アクスルメーカー。', linkUrl: '/stocks/7259', tags: ['系列', '駆動系'] },
    { id: 'corp-6201', label: '株式会社豊田自動織機', type: 'listed_corp', subLabel: '6201 / 東証プライム', description: 'トヨタグループの本家・源流企業。産業車両・エンジン・フォークリフト世界一。', linkUrl: '/stocks/6201', tags: ['本家', '源流'] },
    { id: 'corp-8015', label: '豊田通商株式会社', type: 'listed_corp', subLabel: '8015 / 東証プライム', description: 'トヨタグループの総合商社。アフリカ事業・車載電池リチウム資源開発。', linkUrl: '/stocks/8015', tags: ['商社', '系列'] },
    { id: 'corp-7270', label: '株式会社SUBARU', type: 'listed_corp', subLabel: '7270 / 東証プライム', description: '水平対向エンジン・AWD技術に強み。トヨタ持分法適用関連会社。', linkUrl: '/stocks/7270', tags: ['自動車', '資本提携'] },
    { id: 'corp-7205', label: '日野自動車株式会社', type: 'listed_corp', subLabel: '7205 / 東証プライム', description: '商用トラック・バス大手。トヨタ連結子会社。', linkUrl: '/stocks/7205', tags: ['トラック', '子会社'] },
    { id: 'corp-daihatsu', label: 'ダイハツ工業株式会社', type: 'unlisted_corp', subLabel: 'トヨタ完全子会社', description: '軽自動車・小型車専業メーカー。トヨタ100%子会社。', tags: ['軽自動車', '完全子会社'] },
    { id: 'corp-toyota-body', label: 'トヨタ車体株式会社', type: 'unlisted_corp', subLabel: 'トヨタ完全子会社', description: 'アルファード・ヴェルファイア・ランドクルーザー等の完成車開発・生産。', tags: ['完成車', '完全子会社'] },
    { id: 'person-akio-toyoda', label: '豊田章男', type: 'person', subLabel: '代表取締役会長 / マスタードライバー', description: '豊田家4代目トップ。GAZOO Racing創設、モビリティカンパニーへの変革を牽引。', tags: ['創業家', '会長'] },
    { id: 'person-shoichiro-toyoda', label: '豊田章一郎', type: 'person', subLabel: '元社長・名誉会長', description: 'トヨタ自動車第5代社長、経団連会長。章男氏の父。', tags: ['創業家', '歴代トップ'] },
    { id: 'person-kiichiro-toyoda', label: '豊田喜一郎', type: 'person', subLabel: 'トヨタ自動車創業者', description: '国産乗用車の父。自動織機の技術を応用しトヨタ自動車工業を創業。', tags: ['創業者'] },
    { id: 'person-koji-sato', label: '佐藤恒治', type: 'person', subLabel: '代表取締役社長', description: 'Lexus・GRブランドプレジデントを経て2023年社長就任。', tags: ['代表取締役'] },
    { id: 'foundation-toyota', label: '公益財団法人トヨタ財団', type: 'foundation', subLabel: '創業家設立助成財団', description: '豊田喜一郎氏の理念に基づき研究助成・社会課題解決を推進。', tags: ['財団', '文化振興'] },

    // ==========================================
    // 🎮 2. 任天堂 (7974) & 山内家・子会社
    // ==========================================
    { id: 'corp-7974', label: '任天堂株式会社', type: 'listed_corp', subLabel: '7974 / 東証プライム', description: '世界最高峰のゲーム機・IPコンテンツ開発企業。', linkUrl: '/stocks/7974', tags: ['ゲーム', 'IP', '京都'] },
    { id: 'corp-pokemon', label: '株式会社ポケモン', type: 'unlisted_corp', subLabel: '任天堂出資 (32.0%)', description: '世界的人気キャラクター「ポケットモンスター」のIPブランドマネジメント。', tags: ['IP', '関連会社'] },
    { id: 'corp-monolith', label: '株式会社モノリスソフト', type: 'unlisted_corp', subLabel: '任天堂完全子会社 (100%)', description: '「ゼノブレイド」シリーズ開発、ゼルダの伝説開発協力。', tags: ['開発子会社'] },
    { id: 'corp-nintendo-sys', label: 'ニンテンドーシステムズ株式会社', type: 'unlisted_corp', subLabel: '任天堂 (80%) × DeNA (20%)', description: '任天堂のネットワークサービス・デジタルインフラ開発運営。', tags: ['システム子会社'] },
    { id: 'person-hiroshi-yamauchi', label: '山内溥', type: 'person', subLabel: '任天堂第3代社長 (中興の祖)', description: '花札・トランプ企業から世界的ゲームコンソール企業へ大転換させた伝説の経営者。', tags: ['創業家', '中興の祖'] },
    { id: 'person-shuntaro-furukawa', label: '古川俊太郎', type: 'person', subLabel: '代表取締役社長', description: 'グローバルマーケティング・経営企画を経て現社長。Nintendo Switchの世界的展開を統括。', tags: ['代表取締役'] },
    { id: 'person-shigeru-miyamoto', label: '宮本茂', type: 'person', subLabel: '代表取締役フェロー', description: '「マリオ」「ゼルダの伝説」「ドンキーコング」の生みの親。文化功労者。', tags: ['クリエイター', '取締役'] },

    // ==========================================
    // 👕 3. ファーストリテイリング (9983) & 柳井家
    // ==========================================
    { id: 'corp-9983', label: '株式会社ファーストリテイリング', type: 'listed_corp', subLabel: '9983 / 東証プライム', description: 'ユニクロ、GU、Theory等を展開する世界大手アパレルSPA。', linkUrl: '/stocks/9983', tags: ['アパレル', 'SPA', 'グローバル'] },
    { id: 'corp-gu', label: '株式会社ジーユー (GU)', type: 'unlisted_corp', subLabel: 'ファーストリテイリング完全子会社', description: '低価格・トレンドファッションブランドの企画開発・販売。', tags: ['アパレル子会社'] },
    { id: 'corp-theory', label: 'Theory LLC (リンク・セオリー・ジャパン)', type: 'unlisted_corp', subLabel: 'ファーストリテイリング完全子会社', description: 'ニューヨーク発のコンテンポラリー高級ファッションブランド。', tags: ['海外ブランド子会社'] },
    { id: 'corp-tty', label: '有限会社ティーティワイ (TTY)', type: 'unlisted_corp', subLabel: '柳井家 資産管理会社 (5.31%)', description: '柳井正氏および一族のプライベート資産管理会社。', tags: ['資産管理会社', '創業家'] },
    { id: 'person-tadashi-yanai', label: '柳井正', type: 'person', subLabel: '代表取締役会長兼社長 (21.6%)', description: 'ファーストリテイリング創業者。山口県宇部市の個人紳士服店から世界的アパレル帝国を築く。', tags: ['創業者', '筆頭株主'] },
    { id: 'person-kazumi-yanai', label: '柳井一海', type: 'person', subLabel: '取締役 (4.51%)', description: '柳井正氏の長男。グループ取締役、ボストン大学MBA。', tags: ['創業家', '取締役'] },
    { id: 'person-koji-yanai', label: '柳井康治', type: 'person', subLabel: 'グループ上席執行役員 (4.51%)', description: '柳井正氏の次男。THE TOKYO TOILETプロジェクト等ブランディング統括。', tags: ['創業家', '執行役員'] },

    // ==========================================
    // 🔬 4. キーエンス (6861) & 滝崎家
    // ==========================================
    { id: 'corp-6861', label: '株式会社キーエンス', type: 'listed_corp', subLabel: '6861 / 東証プライム', description: 'ファクトリーオートメーション用センサ・測定器・画像処理機器。営業利益率50%超。', linkUrl: '/stocks/6861', tags: ['FAセンサ', '超高収益', '大阪'] },
    { id: 'corp-keyence-eng', label: '株式会社キーエンスエンジニアリング', type: 'unlisted_corp', subLabel: 'キーエンス完全子会社', description: 'キーエンス製品のアフターサービス・技術サポート・品質保証。', tags: ['子会社'] },
    { id: 'corp-apiste', label: '株式会社アピステ', type: 'unlisted_corp', subLabel: 'キーエンス完全子会社', description: '産業用環境改善機器・精密温調機器の開発販売。', tags: ['環境機器子会社'] },
    { id: 'corp-tt', label: '株式会社ティ・ティ', type: 'unlisted_corp', subLabel: '滝崎家 資産管理会社 (14.8%)', description: '滝崎武光氏の資産管理会社でありキーエンスの筆頭大株主。', tags: ['資産管理会社', '筆頭株主'] },
    { id: 'person-takemitsu-takizaki', label: '滝崎武光', type: 'person', subLabel: '名誉会長・創業者 (7.7%)', description: 'キーエンス創業者。ダイレクトセールスとファブレス生産で世界的超高収益モデルを創出。', tags: ['創業者', '創業家'] },
    { id: 'person-yu-nakata', label: '中田有', type: 'person', subLabel: '代表取締役社長', description: '営業部門出身、キーエンス代表取締役社長。', tags: ['代表取締役'] },

    // ==========================================
    // 💻 5. ソフトバンクグループ (9984) & 孫正義
    // ==========================================
    { id: 'corp-9984', label: 'ソフトバンクグループ株式会社', type: 'listed_corp', subLabel: '9984 / 東証プライム', description: 'AI・半導体・先端テクノロジーに特化した世界的投資持株会社。', linkUrl: '/stocks/9984', tags: ['投資会社', 'AI', 'グローバル'] },
    { id: 'corp-arm', label: 'Arm Holdings plc', type: 'listed_corp', subLabel: 'NASDAQ: ARM / SBG (90.0%)', description: '世界中のスマートフォン・AIチップ設計を独占する英国半導体IP大手。', tags: ['半導体', '中核子会社'] },
    { id: 'corp-9434', label: 'ソフトバンク株式会社 (通信)', type: 'listed_corp', subLabel: '9434 / 東証プライム', description: '国内通信メガキャリア。PayPay、LINEヤフーを傘下に収める。', linkUrl: '/stocks/9434', tags: ['通信', '上場子会社'] },
    { id: 'corp-4689', label: 'LINEヤフー株式会社', type: 'listed_corp', subLabel: '4689 / 東証プライム', description: '国内最大のポータルサイトYahoo! JAPANとメッセンジャーLINEを運営。', linkUrl: '/stocks/4689', tags: ['ネット', '孫会社'] },
    { id: 'corp-paypay', label: 'PayPay株式会社', type: 'unlisted_corp', subLabel: 'SB通信 × LINEヤフー × SBG', description: '国内登録者数6,500万人超のQRコード決済プラットフォーム。', tags: ['フィンテック', '関連会社'] },
    { id: 'person-masayoshi-son', label: '孫正義', type: 'person', subLabel: '代表取締役会長兼社長 (29.0%)', description: 'ソフトバンクグループ創業者。Alibaba、Arm、OpenAI等への先見的メガ投資で知られる。', tags: ['創業者', '筆頭株主'] },

    // ==========================================
    // 🎮 6. ソニーグループ (6758) & 創業家
    // ==========================================
    { id: 'corp-6758', label: 'ソニーグループ株式会社', type: 'listed_corp', subLabel: '6758 / 東証プライム', description: 'ゲーム・音楽・映画・イメージセンサ・エンタメ金融の複合メガコングロマリット。', linkUrl: '/stocks/6758', tags: ['エンタメ', '半導体', '複合企業'] },
    { id: 'corp-sie', label: 'Sony Interactive Entertainment LLC', type: 'unlisted_corp', subLabel: 'ソニー完全子会社 (100%)', description: 'PlayStationプラットフォーム、ゲームタイトルのグローバル開発販売。', tags: ['ゲーム子会社'] },
    { id: 'corp-sme', label: '株式会社ソニー・ミュージックエンタテインメント', type: 'unlisted_corp', subLabel: 'ソニー完全子会社 (100%)', description: '音楽レーベル、アニメ（アニプレックス）、Fate/Grand Order等のIP企画。', tags: ['音楽アニメ子会社'] },
    { id: 'corp-spe', label: 'Sony Pictures Entertainment Inc.', type: 'unlisted_corp', subLabel: 'ソニー完全子会社 (100%)', description: 'ハリウッドメジャースタジオ（スパイダーマン、コロンビア・ピクチャーズ等）。', tags: ['映画子会社'] },
    { id: 'corp-sss', label: 'ソニーセミコンダクタソリューションズ株式会社', type: 'unlisted_corp', subLabel: 'ソニー完全子会社 (100%)', description: '世界シェア首位のCMOSイメージセンサの研究開発・量産。', tags: ['半導体子会社'] },
    { id: 'person-akio-morita', label: '盛田昭夫', type: 'person', subLabel: 'ソニー共同創業者', description: 'ウォークマンを世界的大ヒットに導き、ソニーをグローバルブランドへ育てた名経営者。', tags: ['共同創業者'] },
    { id: 'person-masaru-ibuka', label: '井深大', type: 'person', subLabel: 'ソニー共同創業者', description: '技術担当としてトリニトロンカラーテレビ等の革新的エレクトロニクスを発明。', tags: ['共同創業者', '技術者'] },
    { id: 'person-hiroki-totoki', label: '十時裕樹', type: 'person', subLabel: '代表取締役社長兼COO兼CFO', description: 'ソニー銀行立ち上げからグループ財務構造改革を率い、2023年社長就任。', tags: ['代表取締役'] },

    // ==========================================
    // 🏢 7. 三菱商事 (8058) & 三菱グループ
    // ==========================================
    { id: 'corp-8058', label: '三菱商事株式会社', type: 'listed_corp', subLabel: '8058 / 東証プライム', description: '日本最大の総合商社。資源、エネルギー、流通、インフラをグローバル展開。', linkUrl: '/stocks/8058', tags: ['総合商社', '三菱金曜会'] },
    { id: 'corp-lawson', label: '株式会社ローソン', type: 'unlisted_corp', subLabel: '三菱商事 (50.0%) × KDDI (50.0%)', description: '大手コンビニエンスストアチェーン。2024年非公開化し共同経営へ。', tags: ['流通', '共同子会社'] },
    { id: 'corp-7451', label: '三菱食品株式会社', type: 'listed_corp', subLabel: '7451 / 東証プライム', description: '日本最大の総合食品卸売企業。三菱商事連結子会社 (50.1%)。', linkUrl: '/stocks/7451', tags: ['食品卸', '上場子会社'] },
    { id: 'corp-6366', label: '千代田化工建設株式会社', type: 'listed_corp', subLabel: '6366 / 東証スタンダード', description: '総合エンジニアリング大手。LNGプラント建設に強み。三菱商事持分法適用。', linkUrl: '/stocks/6366', tags: ['プラント', '持分法適用'] },
    { id: 'corp-8306', label: '株式会社三菱UFJフィナンシャル・グループ', type: 'listed_corp', subLabel: '8306 / 東証プライム', description: '日本最大の総合メガバンク金融グループ。', linkUrl: '/stocks/8306', tags: ['メガバンク', '三菱金曜会'] },
    { id: 'person-yataro-iwasaki', label: '岩崎彌太郎', type: 'person', subLabel: '三菱グループ創業者', description: '土佐藩九十九商会から三菱商会を創業し、海運・炭鉱・商社を開拓。', tags: ['開祖', '創業者'] },

    // ==========================================
    // 🏢 8. 伊藤忠商事 (8001) & ファミマ・CTC
    // ==========================================
    { id: 'corp-8001', label: '伊藤忠商事株式会社', type: 'listed_corp', subLabel: '8001 / 東証プライム', description: '非資源分野ナンバーワン総合商社。生活消費・情報通信・繊維に圧倒的強み。', linkUrl: '/stocks/8001', tags: ['総合商社', '非資源'] },
    { id: 'corp-familymart', label: '株式会社ファミリーマート', type: 'unlisted_corp', subLabel: '伊藤忠商事完全子会社 (100%)', description: '国内第2位のコンビニエンスストアチェーン。', tags: ['流通', '完全子会社'] },
    { id: 'corp-ctc', label: '伊藤忠テクノソリューションズ (CTC)', type: 'unlisted_corp', subLabel: '伊藤忠商事完全子会社 (100%)', description: '国内屈指のシステムインテグレーター・クラウド基盤構築大手。2023年非公開化。', tags: ['IT', '完全子会社'] },
    { id: 'corp-8133', label: '伊藤忠エネクス株式会社', type: 'listed_corp', subLabel: '8133 / 東証プライム', description: '石油製品・ガス・エネルギー卸小売大手。伊藤忠子会社 (54.0%)。', linkUrl: '/stocks/8133', tags: ['エネルギー', '上場子会社'] },
    { id: 'person-chubei-ito', label: '初代 伊藤忠兵衛', type: 'person', subLabel: '伊藤忠商事・丸紅 創業者', description: '近江麻布の行商から身を起こし、伊藤忠・丸紅の源流を築く。', tags: ['創業者'] },

    // ==========================================
    // 📚 9. 出版・メディア (新潮社・講談社・集英社・小学館・文藝春秋)
    // ==========================================
    { id: 'unlisted-shinchosha', label: '株式会社新潮社', type: 'unlisted_corp', subLabel: '未上場・名門出版社 (第80期)', description: '文芸書、新潮文庫、週刊新潮、波を発行。創業家（佐藤家）が経営統括。', linkUrl: '/unlisted/shinchosha', tags: ['出版', '創業家経営', '東京'] },
    { id: 'person-takanobu-sato', label: '佐藤隆信', type: 'person', subLabel: '代表取締役社長 (佐藤家4代目)', description: '新潮社代表取締役社長。日本書籍出版協会副理事長等を歴任。', tags: ['代表取締役', '創業家'] },
    { id: 'person-giyou-sato', label: '佐藤義亮', type: 'person', subLabel: '新潮社創業者', description: '1896年新潮社を創業。日本文学史を彩る文芸出版の礎を築く。', tags: ['創業者'] },
    { id: 'foundation-shincho', label: '公益財団法人新潮文芸振興会', type: 'foundation', subLabel: '文学顕彰機関', description: '三島由紀夫賞、山本周五郎賞、小林秀雄賞、新潮ドキュメント賞の主宰運営母体。', tags: ['文学賞', '財団'] },

    { id: 'unlisted-kodansha', label: '株式会社講談社', type: 'unlisted_corp', subLabel: '未上場・総合出版大手 (第88期)', description: 'コミック、文芸、学術、デジタル出版最大手。創業家（野間家）統括。', linkUrl: '/unlisted/kodansha', tags: ['出版', '創業家経営'] },
    { id: 'corp-kobunsha', label: '株式会社光文社', type: 'unlisted_corp', subLabel: '音羽グループ中核総合出版社', description: '『VERY』『CLASSY.』『FLASH』『光文社文庫』『光文社新書』等の出版事業。', tags: ['出版子会社', '音羽グループ'] },
    { id: 'corp-king-records', label: 'キングレコード株式会社', type: 'unlisted_corp', subLabel: '講談社完全子会社 (100%)', description: '大手レコード会社・アニメ音楽製作レーベル（KING AMUSEMENT CREATIVE）。', tags: ['音楽子会社'] },
    { id: 'corp-nikkan-gendai', label: '株式会社日刊現代', type: 'unlisted_corp', subLabel: '講談社子会社 (日刊ゲンダイ)', description: '夕刊紙『日刊ゲンダイ』の発行およびデジタルニュースメディア運営。', tags: ['新聞子会社'] },
    { id: 'corp-seikaisha', label: '株式会社星海社', type: 'unlisted_corp', subLabel: '講談社完全子会社 (100%)', description: '星海社新書・星海社FICTIONS・若手クリエイター出版。', tags: ['出版子会社'] },
    { id: 'corp-hokoku-printing', label: '株式会社豊国印刷', type: 'unlisted_corp', subLabel: '講談社グループ専門印刷会社', description: '講談社コミックス・雑誌・書籍の製版・高速オフセット印刷・製本。', tags: ['印刷会社', 'グループ製造'] },
    { id: 'corp-kodansha-logicom', label: '株式会社講談社ロジコム', type: 'unlisted_corp', subLabel: '講談社物流子会社', description: '書籍・雑誌の全国取次・書店向け入出荷、在庫保管・返品管理。', tags: ['物流子会社'] },
    { id: 'person-yoshifumi-noma', label: '野間省伸', type: 'person', subLabel: '代表取締役社長 (野間家)', description: '講談社第7代社長。デジタルグローバル戦略「Inspire Impossible Stories」を牽引。', tags: ['代表取締役', '創業家'] },
    { id: 'person-seiji-noma', label: '野間清治', type: 'person', subLabel: '講談社創業者', description: '「キング」「少年倶楽部」等を発行し大衆雑誌出版の父と呼ばれる。', tags: ['創業者'] },
    { id: 'foundation-noma', label: '公益財団法人野間文化財団', type: 'foundation', subLabel: '文化顕彰財団', description: '野間文芸賞、野間児童文芸賞、野間出版文化賞を主宰運営。', tags: ['文学賞', '財団'] },

    { id: 'unlisted-bungeishunju', label: '株式会社文藝春秋', type: 'unlisted_corp', subLabel: '未上場・名門総合出版社 (第97期)', description: '「文藝春秋」「週刊文春」「Number」を発行。', linkUrl: '/unlisted/bungeishunju', tags: ['出版', '言論'] },
    { id: 'person-narihiko-iikubo', label: '飯窪成彦', type: 'person', subLabel: '代表取締役社長', description: '「週刊文春」編集長等を経て文藝春秋代表取締役社長。', tags: ['代表取締役'] },
    { id: 'person-kan-kikuchi', label: '菊池寛', type: 'person', subLabel: '文藝春秋創業者・文豪', description: '小説家・劇作家。芥川龍之介賞・直木三十五賞を創設。', tags: ['創業者', '文豪'] },
    { id: 'foundation-bungaku', label: '公益財団法人日本文学振興会', type: 'foundation', subLabel: '文藝春秋内 顕彰母体', description: '芥川賞・直木賞・大宅壮一ノンフィクション賞・菊池寛賞を主宰。', tags: ['芥川賞', '直木賞'] },

    // ==========================================
    // 🍺 10. サントリーホールディングス & 創業家
    // ==========================================
    { id: 'unlisted-suntory', label: 'サントリーホールディングス株式会社', type: 'unlisted_corp', subLabel: '未上場・グローバル酒類飲料大手', description: 'ウイスキー、ビール、清涼飲料、健康食品を世界展開。創業家（鳥井・佐治家）経営。', linkUrl: '/unlisted/suntory', tags: ['飲料', '酒類', '未上場名門'] },
    { id: 'corp-2587', label: 'サントリー食品インターナショナル株式会社', type: 'listed_corp', subLabel: '2587 / 東証プライム', description: 'サントリーHD傘下の清涼飲料事業会社 (60.1%)。サントリー天然水・BOSS。', linkUrl: '/stocks/2587', tags: ['清涼飲料', '上場子会社'] },
    { id: 'corp-beam-suntory', label: 'Beam Suntory Inc. (Suntory Global Spirits)', type: 'unlisted_corp', subLabel: 'サントリー完全子会社 (100%)', description: '米名門ウイスキー「ジムビーム」等を傘下に収める世界第3位のプレミアムスピリッツ企業。', tags: ['海外酒類子会社'] },
    { id: 'corp-kotobuki', label: '寿不動産株式会社', type: 'unlisted_corp', subLabel: '創業家 資産管理会社 (サントリーHD 89.3%)', description: '鳥井・佐治家のプライベート資産管理会社でありサントリーHDの筆頭支配株主。', tags: ['資産管理会社', '支配株主'] },
    { id: 'person-shinjiro-torii', label: '鳥井信治郎', type: 'person', subLabel: 'サントリー創業者', description: '「やってみなはれ」精神で日本初の本格国産ウイスキー山崎蒸溜所を建設。', tags: ['創業者'] },
    { id: 'person-nobutada-saji', label: '佐治信忠', type: 'person', subLabel: '代表取締役会長 (佐治家)', description: 'サントリーHD代表取締役会長。ビーム社買収等グローバル展開を断行。', tags: ['創業家', '会長'] },
    { id: 'person-shingo-torii', label: '鳥井信吾', type: 'person', subLabel: '代表取締役副会長 (鳥井家)', description: '鳥井家3代目。サントリーHD副会長、大阪商工会議所会頭。', tags: ['創業家', '副会長'] },
    { id: 'foundation-suntory', label: '公益財団法人サントリー文化財団', type: 'foundation', subLabel: '文化学術振興財団', description: 'サントリー学芸賞の主宰、サントリーホール運営を通じた芸術振興。', tags: ['文化財団', '学芸賞'] }
  ],

  edges: [
    // トヨタグループ
    { id: 'e-ty-denso', source: 'corp-7203', target: 'corp-6902', relationType: 'capital', label: '出資比率 24.2%', detail: '持分法適用関連会社・基幹電装品共同開発', ratio: 24.2 },
    { id: 'e-ty-aishin', source: 'corp-7203', target: 'corp-7259', relationType: 'capital', label: '出資比率 24.8%', detail: '持分法適用関連会社・トランスミッション供給', ratio: 24.8 },
    { id: 'e-ty-shokki', source: 'corp-7203', target: 'corp-6201', relationType: 'capital', label: '出資比率 24.7%', detail: 'トヨタグループ本家・相互持合い (織機側もトヨタ株7.4%保有)', ratio: 24.7 },
    { id: 'e-ty-tsusho', source: 'corp-7203', target: 'corp-8015', relationType: 'capital', label: '出資比率 21.7%', detail: '持分法適用関連会社・グループ専任総合商社', ratio: 21.7 },
    { id: 'e-ty-subaru', source: 'corp-7203', target: 'corp-7270', relationType: 'capital', label: '出資比率 20.0%', detail: '持分法適用関連会社・86/BRZ共同開発アライアンス', ratio: 20.0 },
    { id: 'e-ty-hino', source: 'corp-7203', target: 'corp-7205', relationType: 'capital', label: '連結子会社 50.1%', detail: '大型商用車部門', ratio: 50.1 },
    { id: 'e-ty-daihatsu', source: 'corp-7203', target: 'corp-daihatsu', relationType: 'capital', label: '完全子会社 100%', detail: '軽自動車・小型車部門統括', ratio: 100.0 },
    { id: 'e-ty-body', source: 'corp-7203', target: 'corp-toyota-body', relationType: 'capital', label: '完全子会社 100%', detail: 'アルファード・ランクル完成車生産', ratio: 100.0 },
    { id: 'e-ty-akio', source: 'person-akio-toyoda', target: 'corp-7203', relationType: 'governance', label: '代表取締役会長', detail: '豊田家4代目トップ' },
    { id: 'e-ty-sato', source: 'person-koji-sato', target: 'corp-7203', relationType: 'governance', label: '代表取締役社長', detail: '業務執行統括' },
    { id: 'e-ty-kiichiro', source: 'person-kiichiro-toyoda', target: 'corp-7203', relationType: 'governance', label: '創業者', detail: 'トヨタ自動車工業設立' },
    { id: 'e-ty-shoichiro', source: 'person-shoichiro-toyoda', target: 'person-akio-toyoda', relationType: 'kinship', label: '父子直系', detail: '豊田家直系承継' },
    { id: 'e-ty-fnd', source: 'corp-7203', target: 'foundation-toyota', relationType: 'foundation', label: '設立母体', detail: '研究助成・社会貢献' },

    // 任天堂
    { id: 'e-nin-poke', source: 'corp-7974', target: 'corp-pokemon', relationType: 'capital', label: '出資比率 32.0%', detail: 'ポケモンIP共同ライセンス管理', ratio: 32.0 },
    { id: 'e-nin-mono', source: 'corp-7974', target: 'corp-monolith', relationType: 'capital', label: '完全子会社 100%', detail: 'ゼノブレイド・ゼルダ開発', ratio: 100.0 },
    { id: 'e-nin-sys', source: 'corp-7974', target: 'corp-nintendo-sys', relationType: 'capital', label: '子会社 80.0%', detail: '任天堂アカウント・クラウドインフラ', ratio: 80.0 },
    { id: 'e-nin-yamauchi', source: 'person-hiroshi-yamauchi', target: 'corp-7974', relationType: 'governance', label: '元社長・中興の祖', detail: 'ファミコン・ゲームボーイを生み出した伝説のトップ' },
    { id: 'e-nin-furukawa', source: 'person-shuntaro-furukawa', target: 'corp-7974', relationType: 'governance', label: '代表取締役社長', detail: 'Switchグローバル統括' },
    { id: 'e-nin-miyamoto', source: 'person-shigeru-miyamoto', target: 'corp-7974', relationType: 'governance', label: '代表取締役フェロー', detail: 'マリオ・ゼルダ生みの親' },

    // ファーストリテイリング
    { id: 'e-fr-gu', source: 'corp-9983', target: 'corp-gu', relationType: 'capital', label: '完全子会社 100%', detail: '低価格カジュアルGU事業', ratio: 100.0 },
    { id: 'e-fr-theory', source: 'corp-9983', target: 'corp-theory', relationType: 'capital', label: '完全子会社 100%', detail: 'ニューヨーク高級コンテンポラリー', ratio: 100.0 },
    { id: 'e-fr-tty', source: 'corp-tty', target: 'corp-9983', relationType: 'capital', label: '株主 5.31%', detail: '柳井家資産管理会社', ratio: 5.31 },
    { id: 'e-fr-tadashi', source: 'person-tadashi-yanai', target: 'corp-9983', relationType: 'governance', label: '会長兼社長 (21.6%)', detail: '創業者・筆頭大株主' },
    { id: 'e-fr-kazumi', source: 'person-kazumi-yanai', target: 'corp-9983', relationType: 'governance', label: '取締役 (4.51%)', detail: '柳井家長男' },
    { id: 'e-fr-koji', source: 'person-koji-yanai', target: 'corp-9983', relationType: 'governance', label: '執行役員 (4.51%)', detail: '柳井家次男' },
    { id: 'e-fr-family', source: 'person-tadashi-yanai', target: 'person-kazumi-yanai', relationType: 'kinship', label: '父子直系', detail: '創業家ガバナンス' },

    // キーエンス
    { id: 'e-key-eng', source: 'corp-6861', target: 'corp-keyence-eng', relationType: 'capital', label: '完全子会社 100%', detail: '技術サポート・品質保証', ratio: 100.0 },
    { id: 'e-key-apiste', source: 'corp-6861', target: 'corp-apiste', relationType: 'capital', label: '完全子会社 100%', detail: '精密環境温調機器', ratio: 100.0 },
    { id: 'e-key-tt', source: 'corp-tt', target: 'corp-6861', relationType: 'capital', label: '筆頭株主 14.8%', detail: '滝崎家資産管理会社', ratio: 14.8 },
    { id: 'e-key-takizaki', source: 'person-takemitsu-takizaki', target: 'corp-6861', relationType: 'governance', label: '名誉会長・創業者 (7.7%)', detail: '超高収益ビジネスモデル創出' },
    { id: 'e-key-nakata', source: 'person-yu-nakata', target: 'corp-6861', relationType: 'governance', label: '代表取締役社長', detail: '業務統括' },

    // ソフトバンクグループ
    { id: 'e-sbg-arm', source: 'corp-9984', target: 'corp-arm', relationType: 'capital', label: '中核子会社 90.0%', detail: 'AI半導体IP独占設計', ratio: 90.0 },
    { id: 'e-sbg-telecom', source: 'corp-9984', target: 'corp-9434', relationType: 'capital', label: '上場子会社 40.5%', detail: '国内通信事業', ratio: 40.5 },
    { id: 'e-sbg-lineya', source: 'corp-9434', target: 'corp-4689', relationType: 'capital', label: '連結子会社 64.8%', detail: 'Aホールディングス経由支配', ratio: 64.8 },
    { id: 'e-sbg-paypay', source: 'corp-9434', target: 'corp-paypay', relationType: 'capital', label: '持分比率 34.9%', detail: 'QR決済メガプラットフォーム', ratio: 34.9 },
    { id: 'e-sbg-son', source: 'person-masayoshi-son', target: 'corp-9984', relationType: 'governance', label: '代表取締役会長兼社長 (29.0%)', detail: '創業者・筆頭大株主' },

    // ソニーグループ
    { id: 'e-sn-sie', source: 'corp-6758', target: 'corp-sie', relationType: 'capital', label: '完全子会社 100%', detail: 'PlayStation事業', ratio: 100.0 },
    { id: 'e-sn-sme', source: 'corp-6758', target: 'corp-sme', relationType: 'capital', label: '完全子会社 100%', detail: '音楽レーベル・アニプレックス', ratio: 100.0 },
    { id: 'e-sn-spe', source: 'corp-6758', target: 'corp-spe', relationType: 'capital', label: '完全子会社 100%', detail: 'ハリウッド映画スタジオ', ratio: 100.0 },
    { id: 'e-sn-sss', source: 'corp-6758', target: 'corp-sss', relationType: 'capital', label: '完全子会社 100%', detail: 'CMOSイメージセンサ半導体', ratio: 100.0 },
    { id: 'e-sn-morita', source: 'person-akio-morita', target: 'corp-6758', relationType: 'governance', label: '共同創業者', detail: 'グローバル展開を主導' },
    { id: 'e-sn-ibuka', source: 'person-masaru-ibuka', target: 'corp-6758', relationType: 'governance', label: '共同創業者', detail: '技術開発の祖' },
    { id: 'e-sn-totoki', source: 'person-hiroki-totoki', target: 'corp-6758', relationType: 'governance', label: '代表取締役社長兼COO', detail: '経営執行統括' },

    // 三菱商事 & 三菱グループ
    { id: 'e-mc-lawson', source: 'corp-8058', target: 'corp-lawson', relationType: 'capital', label: '共同親会社 50.0%', detail: 'KDDIとのコンビニ共同経営', ratio: 50.0 },
    { id: 'e-mc-food', source: 'corp-8058', target: 'corp-7451', relationType: 'capital', label: '連結子会社 50.1%', detail: '総合食品卸売最大手', ratio: 50.1 },
    { id: 'e-mc-chiyoda', source: 'corp-8058', target: 'corp-6366', relationType: 'capital', label: '持分法適用 33.6%', detail: 'LNGプラントエンジニアリング', ratio: 33.6 },
    { id: 'e-mc-mufg', source: 'corp-8058', target: 'corp-8306', relationType: 'keiretsu', label: '三菱金曜会 (相互持合)', detail: '三菱グループ中核金融' },
    { id: 'e-mc-yataro', source: 'person-yataro-iwasaki', target: 'corp-8058', relationType: 'governance', label: '三菱グループ開祖', detail: '九十九商会・三菱商会設立' },

    // 伊藤忠商事
    { id: 'e-ito-famima', source: 'corp-8001', target: 'corp-familymart', relationType: 'capital', label: '完全子会社 100%', detail: 'コンビニエンスストア事業', ratio: 100.0 },
    { id: 'e-ito-ctc', source: 'corp-8001', target: 'corp-ctc', relationType: 'capital', label: '完全子会社 100%', detail: 'SI・クラウドIT中核', ratio: 100.0 },
    { id: 'e-ito-enex', source: 'corp-8001', target: 'corp-8133', relationType: 'capital', label: '連結子会社 54.0%', detail: '石油・ガスエネルギー販売', ratio: 54.0 },
    { id: 'e-ito-chubei', source: 'person-chubei-ito', target: 'corp-8001', relationType: 'governance', label: '創業者', detail: '近江商人・伊藤忠丸紅開祖' },

    // 新潮社
    { id: 'e-sc-takanobu', source: 'person-takanobu-sato', target: 'unlisted-shinchosha', relationType: 'governance', label: '代表取締役社長', detail: '佐藤家4代目経営統括' },
    { id: 'e-sc-giyou', source: 'person-giyou-sato', target: 'unlisted-shinchosha', relationType: 'governance', label: '創業者', detail: '1896年新潮社設立' },
    { id: 'e-sc-fnd', source: 'unlisted-shinchosha', target: 'foundation-shincho', relationType: 'foundation', label: '主宰設立母体', detail: '三島賞・山本賞運営' },

    // 講談社 (音羽グループ)
    { id: 'e-kd-kobunsha', source: 'unlisted-kodansha', target: 'corp-kobunsha', relationType: 'capital', label: '音羽グループ中核', detail: '女性誌・文芸・新書事業', ratio: 100.0 },
    { id: 'e-kd-king', source: 'unlisted-kodansha', target: 'corp-king-records', relationType: 'capital', label: '完全子会社 100%', detail: '音楽・映像レーベル', ratio: 100.0 },
    { id: 'e-kd-gendai', source: 'unlisted-kodansha', target: 'corp-nikkan-gendai', relationType: 'capital', label: '子会社 100%', detail: '夕刊紙・デジタル報道', ratio: 100.0 },
    { id: 'e-kd-seikaisha', source: 'unlisted-kodansha', target: 'corp-seikaisha', relationType: 'capital', label: '完全子会社 100%', detail: '新世代出版・ジセダイ', ratio: 100.0 },
    { id: 'e-kd-hokoku', source: 'unlisted-kodansha', target: 'corp-hokoku-printing', relationType: 'capital', label: '専門印刷 100%', detail: '書籍・雑誌オフセット印刷', ratio: 100.0 },
    { id: 'e-kd-logicom', source: 'unlisted-kodansha', target: 'corp-kodansha-logicom', relationType: 'capital', label: '物流子会社 100%', detail: '全国出版流通・倉庫管理', ratio: 100.0 },
    { id: 'e-kd-noma', source: 'person-yoshifumi-noma', target: 'unlisted-kodansha', relationType: 'governance', label: '代表取締役社長', detail: '野間家第7代社長' },
    { id: 'e-kd-seiji', source: 'person-seiji-noma', target: 'unlisted-kodansha', relationType: 'governance', label: '創業者', detail: '大衆雑誌出版の祖' },
    { id: 'e-kd-fnd', source: 'unlisted-kodansha', target: 'foundation-noma', relationType: 'foundation', label: '主宰設立母体', detail: '野間文芸賞運営' },

    // 文藝春秋
    { id: 'e-bc-iikubo', source: 'person-narihiko-iikubo', target: 'unlisted-bungeishunju', relationType: 'governance', label: '代表取締役社長', detail: '経営統括' },
    { id: 'e-bc-kikuchi', source: 'person-kan-kikuchi', target: 'unlisted-bungeishunju', relationType: 'governance', label: '創業者・文豪', detail: '文藝春秋・芥川賞創設' },
    { id: 'e-bc-fnd', source: 'unlisted-bungeishunju', target: 'foundation-bungaku', relationType: 'foundation', label: '主宰設立母体', detail: '芥川賞・直木賞運営' },

    // サントリー
    { id: 'e-st-2587', source: 'unlisted-suntory', target: 'corp-2587', relationType: 'capital', label: '上場子会社 60.1%', detail: '清涼飲料事業 (天然水・BOSS)', ratio: 60.1 },
    { id: 'e-st-beam', source: 'unlisted-suntory', target: 'corp-beam-suntory', relationType: 'capital', label: '完全子会社 100%', detail: 'ジムビーム等グローバル蒸留酒事業', ratio: 100.0 },
    { id: 'e-st-kotobuki', source: 'corp-kotobuki', target: 'unlisted-suntory', relationType: 'capital', label: '筆頭支配株主 89.3%', detail: '鳥井・佐治家 資産管理会社', ratio: 89.3 },
    { id: 'e-st-nobutada', source: 'person-nobutada-saji', target: 'unlisted-suntory', relationType: 'governance', label: '代表取締役会長', detail: '佐治家トップ' },
    { id: 'e-st-shingo', source: 'person-shingo-torii', target: 'unlisted-suntory', relationType: 'governance', label: '代表取締役副会長', detail: '鳥井家トップ' },
    { id: 'e-st-shinjiro', source: 'person-shinjiro-torii', target: 'unlisted-suntory', relationType: 'governance', label: '創業者', detail: '国産ウイスキーの祖' },
    { id: 'e-st-fnd', source: 'unlisted-suntory', target: 'foundation-suntory', relationType: 'foundation', label: '主宰設立母体', detail: 'サントリー学芸賞・ホール運営' }
  ]
};

/**
 * 特定のエンティティを中心としたサブグラフを抽出する関数
 */
export function getSubGraphForEntity(entityId: string, maxHops: number = 2): NetworkGraphData {
  const nodeSet = new Set<string>([entityId]);
  let currentFrontier = new Set<string>([entityId]);

  for (let hop = 0; hop < maxHops; hop++) {
    const nextFrontier = new Set<string>();
    for (const edge of MASTER_RELATIONSHIP_DATA.edges) {
      if (currentFrontier.has(edge.source)) {
        nodeSet.add(edge.target);
        nextFrontier.add(edge.target);
      }
      if (currentFrontier.has(edge.target)) {
        nodeSet.add(edge.source);
        nextFrontier.add(edge.source);
      }
    }
    currentFrontier = nextFrontier;
  }

  const nodes = MASTER_RELATIONSHIP_DATA.nodes.filter(n => nodeSet.has(n.id));
  const edges = MASTER_RELATIONSHIP_DATA.edges.filter(
    e => nodeSet.has(e.source) && nodeSet.has(e.target)
  );

  return { nodes, edges };
}
