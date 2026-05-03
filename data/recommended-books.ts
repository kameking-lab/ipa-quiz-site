import type { ExamCode } from "@/lib/questions/types";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  /** Amazon ASIN. Set to "ASIN_TO_BE_FILLED" until manually updated by the operator. */
  asin: string;
  /** Rakuten Books item ID. Set to "RAKUTEN_ID_TO_BE_FILLED" until manually updated. */
  rakutenId: string;
  tags: string[];
  difficulty: Difficulty;
  recommendedFor: string;
  description: string;
}

const PLACEHOLDER_ASIN = "ASIN_TO_BE_FILLED";
const PLACEHOLDER_RAKUTEN = "RAKUTEN_ID_TO_BE_FILLED";

export function isAsinFilled(asin: string | undefined): boolean {
  return !!asin && asin.trim() !== "" && asin !== PLACEHOLDER_ASIN;
}

export function isRakutenIdFilled(id: string | undefined): boolean {
  return !!id && id.trim() !== "" && id !== PLACEHOLDER_RAKUTEN;
}

export function buildAmazonUrl(asin: string): string {
  const tag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG ?? "";
  const base = `https://www.amazon.co.jp/dp/${asin}`;
  return tag ? `${base}?tag=${tag}` : base;
}

export function buildRakutenUrl(rakutenId: string): string {
  const affiliateId = process.env.NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID ?? "";
  const productUrl = `https://books.rakuten.co.jp/rb/${rakutenId}/`;
  if (!affiliateId) return productUrl;
  return `https://hb.afl.rakuten.co.jp/hgc/${affiliateId}/?pc=${encodeURIComponent(productUrl)}`;
}

export const RECOMMENDED_BOOKS: Record<ExamCode, RecommendedBook[]> = {
  ip: [
    {
      id: "ip-kitami",
      title: "キタミ式イラストIT塾 ITパスポート",
      author: "きたみりゅうじ",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297152991",
      rakutenId: "18403846",
      tags: ["入門", "イラスト", "オールインワン"],
      difficulty: "beginner",
      recommendedFor: "IT未経験者・初学者",
      description:
        "豊富なイラストでIT用語を徹底的にかみ砕いて解説するロングセラー。完全初学者でも挫折せず一冊で全範囲を一気通貫できる。",
    },
    {
      id: "ip-kayanoki",
      title: "栢木先生のITパスポート教室",
      author: "栢木 厚",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297152436",
      rakutenId: "18404213",
      tags: ["入門", "教科書", "ストラテジ系強化"],
      difficulty: "beginner",
      recommendedFor: "ストラテジ系・マネジメント系を厚めに学びたい人",
      description:
        "ベストセラー基本情報「栢木先生」シリーズのITパスポート版。読み物として読みやすく、ビジネス系のテーマに強い。",
    },
    {
      id: "ip-ichiban-yasashii",
      title: "いちばんやさしい ITパスポート 絶対合格の教科書＋出る順問題集",
      author: "高橋 京介",
      publisher: "SBクリエイティブ",
      year: 2026,
      asin: "4815638209",
      rakutenId: "18432510",
      tags: ["教科書一体型", "頻出順", "オールインワン"],
      difficulty: "beginner",
      recommendedFor: "短期集中で合格点を取りたい人",
      description:
        "テキストと頻出順の問題集が一冊にまとまった効率重視の構成。試験で問われやすい順に学べるため、時間がない受験者に向く。",
    },
    {
      id: "ip-perfect-learning",
      title: "ITパスポート パーフェクトラーニング過去問題集",
      author: "五十嵐 聡",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297152304",
      rakutenId: "18402409",
      tags: ["過去問", "問題集", "解説詳細"],
      difficulty: "beginner",
      recommendedFor: "過去問演習を主軸に対策したい人",
      description:
        "ITパスポート過去問演習の定番。問題ごとの解説が丁寧で、本サイトの過去問AIとの併用で弱点を立体的に補強できる。",
    },
    {
      id: "ip-fom-yokuwakaru",
      title: "よくわかるマスター ITパスポート試験 対策テキスト＆過去問題集",
      author: "富士通ラーニングメディア",
      publisher: "FOM出版",
      year: 2026,
      asin: "4867751901",
      rakutenId: "18466564",
      tags: ["教科書", "過去問", "図解"],
      difficulty: "beginner",
      recommendedFor: "企業研修・学校教材で慣れている人",
      description:
        "FOM出版らしい図表中心の見やすいレイアウト。社内研修・学校教材としてもよく採用されており、安定した品質。",
    },
    {
      id: "ip-ukaru",
      title: "2026年度版 みんなが欲しかった！ ITパスポートの教科書＆問題集",
      author: "TAC出版情報処理試験研究会",
      publisher: "TAC出版",
      year: 2026,
      asin: "4300117527",
      rakutenId: "18376981",
      tags: ["教科書一体型", "フルカラー", "オールインワン"],
      difficulty: "beginner",
      recommendedFor: "教科書と問題集を一冊で完結させたい人",
      description:
        "TAC出版の定番『みんなが欲しかった！』シリーズ最新版。フルカラー・赤シート対応で、教科書と問題集が一冊にまとまった効率重視の構成。",
    },
  ],

  sg: [
    {
      id: "sg-uehara",
      title: "令和8年 情報処理教科書 出るとこだけ！情報セキュリティマネジメント［科目A］［科目B］テキスト 2026年版",
      author: "橋本 祐史",
      publisher: "翔泳社",
      year: 2026,
      asin: "4798194433",
      rakutenId: "18381771",
      tags: ["教科書", "定番", "解説詳細"],
      difficulty: "beginner",
      recommendedFor: "セキュリティ初学者・2026年度受験者",
      description:
        "SGの最新シラバスに準拠した翽泳社の定番教科書。科目A・科目B両方を一冊でカバーし、要点を絞った効率重視の構成。",
    },
    {
      id: "sg-okajima",
      title: "情報セキュリティマネジメント 合格教本",
      author: "岡嶋 裕史",
      publisher: "技術評論社",
      year: 2026,
      asin: "429715269X",
      rakutenId: "18397576",
      tags: ["教科書", "読み物", "理解重視"],
      difficulty: "beginner",
      recommendedFor: "暗記より理解で押したい人",
      description:
        "岡嶋先生の語り口で読み物として読み進められる定番。SGで問われる組織・法務領域を背景まで含めて理解できる。",
    },
    {
      id: "sg-kitami",
      title: "キタミ式イラストIT塾 情報セキュリティマネジメント",
      author: "きたみりゅうじ",
      publisher: "技術評論社",
      year: 2026,
      asin: "429715305X",
      rakutenId: "18403790",
      tags: ["入門", "イラスト"],
      difficulty: "beginner",
      recommendedFor: "用語に苦手意識がある人",
      description:
        "イラストでセキュリティ用語を直感的に押さえるシリーズ最新版。完全初学者の最初の一冊として有力。",
    },
    {
      id: "sg-perfect-learning",
      title: "情報セキュリティマネジメント パーフェクトラーニング過去問題集",
      author: "庄司 勝哉 / 近藤 有馬",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297152614",
      rakutenId: "18402405",
      tags: ["過去問", "問題集"],
      difficulty: "beginner",
      recommendedFor: "過去問演習量を確保したい人",
      description:
        "SGの過去問演習定番書。本サイトのAI解説で「なぜ」を深掘りしつつ、紙の問題集で網羅性を担保する組み合わせがおすすめ。",
    },
    {
      id: "sg-spec-text",
      title: "2025年度版 ニュースペックテキスト 情報セキュリティマネジメント",
      author: "TAC情報処理講座",
      publisher: "TAC出版",
      year: 2025,
      asin: "4300114633",
      rakutenId: "18028907",
      tags: ["教科書", "図表中心"],
      difficulty: "beginner",
      recommendedFor: "図表で構造的に整理したい人",
      description:
        "TACの講座テキストをベースにしたシリーズ。フレームワーク・規格名を体系図で一望できるのが強み。",
    },
  ],

  fe: [
    {
      id: "fe-kitami",
      title: "キタミ式イラストIT塾 基本情報技術者",
      author: "きたみりゅうじ",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297153017",
      rakutenId: "18403793",
      tags: ["入門", "イラスト", "教科書"],
      difficulty: "beginner",
      recommendedFor: "FE完全初学者・独学",
      description:
        "FEといえばこの一冊。イラストと砕けた語り口で挫折ポイントを丁寧に潰してくれる。最初に読み切る本として最強クラス。",
    },
    {
      id: "fe-kayanoki",
      title: "栢木先生の基本情報技術者教室",
      author: "栢木 厚",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297152452",
      rakutenId: "18404212",
      tags: ["教科書", "ベストセラー"],
      difficulty: "beginner",
      recommendedFor: "幅広く満遍なく学びたい人",
      description:
        "20年以上売れ続けている定番。試験範囲全体を均等にカバーし、独学者からの信頼が厚い。",
    },
    {
      id: "fe-otaki-kakutoku",
      title: "基本情報技術者 合格教本",
      author: "イエローテールコンピュータ",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297152630",
      rakutenId: "18400866",
      tags: ["教科書", "理論強化"],
      difficulty: "intermediate",
      recommendedFor: "アルゴリズム・基礎理論をきちんと固めたい人",
      description:
        "大滝先生の理論面の強さが光る定番教科書。新試験のアルゴリズム（科目B）対策にも有効。",
    },
    {
      id: "fe-ichiban-yasashii",
      title: "いちばんやさしい 基本情報技術者 絶対合格の教科書＋出る順問題集",
      author: "高橋 京介",
      publisher: "SBクリエイティブ",
      year: 2026,
      asin: "4815638217",
      rakutenId: "18432509",
      tags: ["教科書一体型", "頻出順"],
      difficulty: "beginner",
      recommendedFor: "効率重視で合格ラインを狙う人",
      description:
        "頻出順構成と章末問題で「合格点までの最短距離」を意識した一冊。仕事と並行して短期で仕上げたい人向け。",
    },
    {
      id: "fe-perfect-learning",
      title: "基本情報技術者 パーフェクトラーニング過去問題集",
      author: "山本 三雄",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297151340",
      rakutenId: "18379680",
      tags: ["過去問", "問題集"],
      difficulty: "intermediate",
      recommendedFor: "過去問を主軸に対策したい人",
      description:
        "FE過去問演習の定番。CBT化で同じ過去問が出ないとはいえ、典型パターン演習は強力。本サイトのAI解説と併用すると理解の深さが段違い。",
    },
    {
      id: "fe-uchida-algo",
      title: "情報処理教科書 出るとこだけ！基本情報技術者［科目A］［科目B］2026年版",
      author: "矢沢 久雄",
      publisher: "翔泳社",
      year: 2026,
      asin: "4798194409",
      rakutenId: "18389604",
      tags: ["科目B", "アルゴリズム", "擬似言語"],
      difficulty: "intermediate",
      recommendedFor: "科目Bのアルゴリズム問題で詰まる人",
      description:
        "新試験で配点比重が高い擬似言語（アルゴリズム）対策に特化した一冊。科目Aは取れても科目Bで落ちる人の救済本。",
    },
  ],

  ap: [
    {
      id: "ap-otaki-okajima",
      title: "応用情報技術者 合格教本",
      author: "大滝 みや子 / 岡嶋 裕史",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297152673",
      rakutenId: "18414495",
      tags: ["教科書", "定番", "オールインワン"],
      difficulty: "intermediate",
      recommendedFor: "AP独学・最初の一冊",
      description:
        "AP独学者の鉄板書。理論強化の大滝先生＋読みやすい岡嶋先生のタッグで、午前・午後の両方をカバーする。",
    },
    {
      id: "ap-kitami",
      title: "キタミ式イラストIT塾 応用情報技術者",
      author: "きたみりゅうじ",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297153033",
      rakutenId: "18403791",
      tags: ["教科書", "イラスト"],
      difficulty: "intermediate",
      recommendedFor: "FE版で挫折せず読めた人",
      description:
        "FEのキタミ式が合った人にとってのAP最有力候補。AP範囲は広いが本書で全体像を一望できる。",
    },
    {
      id: "ap-perfect-learning-am",
      title: "応用情報技術者 パーフェクトラーニング過去問題集",
      author: "加藤 昭 / 高見澤 秀幸",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297152819",
      rakutenId: "18421613",
      tags: ["過去問", "午前", "午後"],
      difficulty: "intermediate",
      recommendedFor: "過去問道場的に量をこなしたい人",
      description:
        "午前・午後の両方を一冊に収めた過去問集。本サイトの過去問AIで弱点を狙い撃ちしつつ、書籍で全範囲をローラーする運用が王道。",
    },
    {
      id: "ap-pm-juten",
      title: "応用情報技術者 午後問題の重点対策",
      author: "小口 達夫",
      publisher: "アイテック",
      year: 2025,
      asin: "4865753338",
      rakutenId: "18030492",
      tags: ["午後", "記述", "重点対策"],
      difficulty: "intermediate",
      recommendedFor: "午後の記述で得点が安定しない人",
      description:
        "AP午後の定番対策本。設問タイプ別の解き筋と模範解答プロセスを徹底解説。AI採点と組み合わせると最強。",
    },
    {
      id: "ap-toriidori",
      title: "応用情報技術者 試験によくでる問題集【科目A】",
      author: "大滝 みや子",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297153335",
      rakutenId: "18427428",
      tags: ["午前", "頻出問題集"],
      difficulty: "intermediate",
      recommendedFor: "午前を効率よく仕上げたい人",
      description:
        "頻出問題に絞った午前対策本。短期間で午前のボーダーを越えたいときに有効。",
    },
    {
      id: "ap-spec-text",
      title: "2025年度版 ニュースペックテキスト 応用情報技術者",
      author: "TAC情報処理講座",
      publisher: "TAC出版",
      year: 2025,
      asin: "430011465X",
      rakutenId: "18028902",
      tags: ["教科書", "TAC"],
      difficulty: "intermediate",
      recommendedFor: "予備校テキスト調を好む人",
      description:
        "TACの講座運用に合わせた網羅型テキスト。図表が多く、後から見返したときに参照しやすい。",
    },
    {
      id: "ap-ukaru",
      title: "うかる！ 応用情報技術者 ［午後］ 速効問題集",
      author: "村山 直紀",
      publisher: "日経BP 日本経済新聞出版",
      year: 2023,
      asin: "4296117084",
      rakutenId: "17376258",
      tags: ["午後", "問題集", "速効"],
      difficulty: "intermediate",
      recommendedFor: "午後問題で得点を伸ばしたい人",
      description:
        "AP午後の頻出パターンに焦点を絞った問題集。設問タイプ別の解法が短時間で身につき、記述で点を取り切る力を鍛えられる。",
    },
  ],

  sc: [
    {
      id: "sc-uehara",
      title: "情報処理教科書 情報処理安全確保支援士 2026年版",
      author: "上原 孝之",
      publisher: "翔泳社",
      year: 2026,
      asin: "4798194639",
      rakutenId: "18382304",
      tags: ["教科書", "定番", "通称：上原本"],
      difficulty: "advanced",
      recommendedFor: "支援士独学者・最初の一冊",
      description:
        "通称「上原本」。支援士対策の事実上の標準教科書で、午後事例の出題傾向を踏まえた解説が秀逸。",
    },
    {
      id: "sc-juten",
      title: "2026 情報処理安全確保支援士「専門知識＋科目B」の重点対策",
      author: "三好 康之",
      publisher: "アイテック",
      year: 2026,
      asin: "4865753486",
      rakutenId: "18414042",
      tags: ["午後", "重点対策"],
      difficulty: "advanced",
      recommendedFor: "午後で得点を伸ばしたい人",
      description:
        "アイテックの重点対策シリーズ。午後問題の設問パターン別アプローチと模範解答プロセスが詳しい。",
    },
    {
      id: "sc-okajima",
      title: "令和08年【春期】【秋期】情報処理安全確保支援士 合格教本",
      author: "岡嶋 裕史",
      publisher: "技術評論社",
      year: 2026,
      asin: "4297152533",
      rakutenId: "18415806",
      tags: ["教科書", "読み物"],
      difficulty: "advanced",
      recommendedFor: "上原本の前段に読みたい人",
      description:
        "岡嶋先生による読み物寄りの教科書。背景・歴史も語られるので、上原本へつなぐ一冊として相性が良い。",
    },
    {
      id: "sc-pocket-study",
      title: "ポケットスタディ 情報処理安全確保支援士",
      author: "村山 直紀",
      publisher: "秀和システム",
      year: 2017,
      asin: "479804931X",
      rakutenId: "14714305",
      tags: ["ハンディ", "通勤学習"],
      difficulty: "advanced",
      recommendedFor: "通勤・休憩時間に回したい人",
      description:
        "ハンディサイズの暗記＆要点整理本。試験直前の総ざらいや、通勤時間の高速回転に向く。",
    },
    {
      id: "sc-itec-text",
      title: "2026年度版 ALL IN ONE パーフェクトマスター 情報処理安全確保支援士",
      author: "TAC株式会社（情報処理講座）",
      publisher: "TAC出版",
      year: 2026,
      asin: "4300117500",
      rakutenId: "18267062",
      tags: ["教科書", "問題演習"],
      difficulty: "advanced",
      recommendedFor: "アイテック流の体系で学びたい人",
      description:
        "アイテック標準の試験対策書。演習問題と模試が多めで、午後の演習量を稼ぎたいときに便利。",
    },
  ],

  nw: [
    {
      id: "nw-seto",
      title: "情報処理教科書 ネットワークスペシャリスト 2026年版",
      author: "ICTワークショップ",
      publisher: "翔泳社",
      year: 2026,
      asin: "4798193844",
      rakutenId: "18319286",
      tags: ["教科書", "定番"],
      difficulty: "advanced",
      recommendedFor: "NW独学者・最初の一冊",
      description:
        "NW対策の事実上の定番教科書。最新の試験傾向（ゼロトラスト・クラウド系）まで反映されている。",
    },
    {
      id: "nw-nesupe-kiso",
      title: "ネスペの基礎力 プラス20点の午後対策",
      author: "左門 至峰",
      publisher: "技術評論社",
      year: 2017,
      asin: "4774189863",
      rakutenId: "14917360",
      tags: ["午後", "理解重視"],
      difficulty: "advanced",
      recommendedFor: "午後で詰まっている人",
      description:
        "「ネスペ」シリーズの基礎力編。プロトコル挙動を丁寧に追うスタイルで、午後の記述で点を取り切る力が付く。",
    },
    {
      id: "nw-juten",
      title: "2025-2026 ネットワークスペシャリスト「専門知識＋午後問題」の重点対策",
      author: "長谷 和幸",
      publisher: "アイテック",
      year: 2025,
      asin: "4865753389",
      rakutenId: "18030486",
      tags: ["午後", "重点対策"],
      difficulty: "advanced",
      recommendedFor: "午後事例を量で仕上げたい人",
      description:
        "アイテック重点対策シリーズ。午後IIまで含めた事例演習量が豊富で、紙でゴリゴリ書きたい層に向く。",
    },
    {
      id: "nw-tetteikouryaku",
      title: "徹底攻略 ネットワークスペシャリスト教科書 令和8年度",
      author: "瀬戸 美月",
      publisher: "インプレス",
      year: 2026,
      asin: "4295022594",
      rakutenId: "18272252",
      tags: ["教科書", "図表"],
      difficulty: "advanced",
      recommendedFor: "情報処理教科書と読み比べたい人",
      description:
        "インプレス徹底攻略シリーズのNW版。翔泳社の「情報処理教科書」と読み比べて理解を立体化するのに有効。",
    },
    {
      id: "nw-pocket-study",
      title: "ポケットスタディ ネットワークスペシャリスト［第2版］",
      author: "村山 直紀",
      publisher: "秀和システム",
      year: 2013,
      asin: "4798038199",
      rakutenId: "12343863",
      tags: ["ハンディ", "暗記"],
      difficulty: "advanced",
      recommendedFor: "通勤学習・直前総ざらい",
      description:
        "暗記要点と過去問のエッセンスをハンディに圧縮。直前期の総ざらいに重宝する。",
    },
  ],

  db: [
    {
      id: "db-miyoshi",
      title: "令和8～9年 情報処理教科書 データベーススペシャリスト 2026～2027年版",
      author: "ITのプロ46 / 三好 康之",
      publisher: "翔泳社",
      year: 2026,
      asin: "4798196258",
      rakutenId: "18518360",
      tags: ["教科書", "定番"],
      difficulty: "advanced",
      recommendedFor: "DB独学者・最初の一冊",
      description:
        "三好先生によるDB定番教科書。SQL・正規化・概念データモデルといった頻出論点を網羅。",
    },
    {
      id: "db-kaneko",
      title: "データベーススペシャリスト 合格教本",
      author: "金子 則彦",
      publisher: "技術評論社",
      year: 2019,
      asin: "B07XR5NTTP",
      rakutenId: "16016808",
      tags: ["教科書", "読み物"],
      difficulty: "advanced",
      recommendedFor: "実務目線で押さえたい人",
      description:
        "DB合格教本の決定版。実務で使うトランザクション・ロック制御まで踏み込んだ解説で、業務との接続が良い。",
    },
    {
      id: "db-juten",
      title: "2025-2026 データベーススペシャリスト「専門知識＋午後問題」の重点対策",
      author: "山本 森樹",
      publisher: "アイテック",
      year: 2025,
      asin: "4865753419",
      rakutenId: "18204971",
      tags: ["午後", "重点対策"],
      difficulty: "advanced",
      recommendedFor: "概念データモデルと向き合いたい人",
      description:
        "DB午後I・午後IIの事例演習に特化。概念データモデル（ERD）系の頻出パターンが体系化されている。",
    },
    {
      id: "db-tettei",
      title: "徹底攻略 データベーススペシャリスト教科書 令和8年度",
      author: "株式会社わくわくスタディワールド",
      publisher: "インプレス",
      year: 2026,
      asin: "4295024066",
      rakutenId: "18491562",
      tags: ["教科書", "図解"],
      difficulty: "advanced",
      recommendedFor: "図解多めで読み進めたい人",
      description:
        "図解と問題演習をバランス良く配置。情報処理教科書と表現が異なるので、つまずいた論点の再学習に向く。",
    },
    {
      id: "db-pocket-study",
      title: "ポケットスタディ データベーススペシャリスト",
      author: "具志堅 融 / 河科 湊",
      publisher: "秀和システム",
      year: 2015,
      asin: "4798045268",
      rakutenId: "13514033",
      tags: ["ハンディ", "暗記"],
      difficulty: "advanced",
      recommendedFor: "通勤・直前期の暗記",
      description:
        "DB論点をハンディに圧縮。通勤時間の高速回転と直前確認に向く。",
    },
  ],

  es: [
    {
      id: "es-fukushima",
      title: "情報処理教科書 エンベデッドシステムスペシャリスト 2026～2027年版",
      author: "牧 隆史 / 松原 敬二",
      publisher: "翔泳社",
      year: 2026,
      asin: "4798196282",
      rakutenId: "18518362",
      tags: ["教科書", "定番"],
      difficulty: "advanced",
      recommendedFor: "ES独学者・最初の一冊",
      description:
        "ES対策の数少ない総合教科書。組込み特有のRTOS・割込み・ハードウェア論点を一冊で押さえられる。",
    },
    {
      id: "es-juten",
      title: "エンベデッドシステムスペシャリスト「専門知識＋午後問題」の重点対策 論文試験対応",
      author: "山本 森樹",
      publisher: "アイテック",
      year: 2025,
      asin: "4865753427",
      rakutenId: "18204972",
      tags: ["午後", "重点対策"],
      difficulty: "advanced",
      recommendedFor: "午後事例で得点を伸ばしたい人",
      description:
        "ESの午後対策本として最も入手しやすい一冊。組込み事例の出題パターンが整理されている。",
    },
    {
      id: "es-itec-mondai",
      title: "徹底解説 エンベデッドシステムスペシャリスト本試験問題",
      author: "アイテック情報技術教育研究部",
      publisher: "アイテック",
      year: 2020,
      asin: "4865751890",
      rakutenId: "16031287",
      tags: ["過去問", "解説", "本試験"],
      difficulty: "advanced",
      recommendedFor: "本試験問題を通じて実力を確認したい人",
      description:
        "アイテックによるES本試験問題の徹底解説集。教科書・重点対策で培った知識を実際の出題形式で検証できる。",
    },
    {
      id: "es-itec-textbook",
      title: "エンベデッドシステムスペシャリスト 合格論文の書き方・事例集",
      author: "岡山 昌二 / 長嶋 仁",
      publisher: "アイテック",
      year: 2024,
      asin: "4865753184",
      rakutenId: "17807792",
      tags: ["教科書", "問題演習"],
      difficulty: "advanced",
      recommendedFor: "教科書と演習を一冊で揃えたい人",
      description:
        "教科書と演習問題を一体化したアイテックのオールインワン。ES学習リソースが少ない中で重宝する。",
    },
  ],

  st: [
    {
      id: "st-mitsukawa",
      title: "情報処理教科書 ITストラテジスト 2026～2027年版",
      author: "広田 航二",
      publisher: "翔泳社",
      year: 2026,
      asin: "4798193879",
      rakutenId: "18319284",
      tags: ["教科書", "定番"],
      difficulty: "advanced",
      recommendedFor: "ST独学者・最初の一冊",
      description:
        "ST対策の定番教科書。経営戦略フレームワークから事業計画まで、論文骨子に直結する論点を整理できる。",
    },
    {
      id: "st-juten",
      title: "2025-2026 ITストラテジスト「専門知識＋午後問題」の重点対策",
      author: "満川 一彦",
      publisher: "アイテック",
      year: 2025,
      asin: "4865753346",
      rakutenId: "18030484",
      tags: ["午後", "重点対策"],
      difficulty: "advanced",
      recommendedFor: "午後I記述・午後II論文の準備",
      description:
        "アイテック重点対策のST版。午後I記述と午後II論文の両方をカバーし、解答骨子の作り方まで具体的に学べる。",
    },
    {
      id: "st-ronbun-okayama",
      title: "ITストラテジスト 合格論文の書き方・事例集 第6版",
      author: "岡山 昌二 / 庄司 敏浩",
      publisher: "アイテック",
      year: 2022,
      asin: "4865753028",
      rakutenId: "17293032",
      tags: ["論文", "午後II", "事例"],
      difficulty: "advanced",
      recommendedFor: "論文を初めて書く人",
      description:
        "論文系試験の最重要書。岡山先生の合格論文事例と添削プロセスで、論文の型を一気に習得できる。",
    },
    {
      id: "st-allinone",
      title: "2026年度版 ALL IN ONE パーフェクトマスター ITストラテジスト",
      author: "TAC情報処理講座",
      publisher: "TAC出版",
      year: 2026,
      asin: "4300117462",
      rakutenId: "18267060",
      tags: ["教科書", "問題演習"],
      difficulty: "advanced",
      recommendedFor: "TAC講座テキスト派",
      description:
        "TACのオールインワン本。教科書・問題演習・論文事例をまとめて手元に置きたい人向け。",
    },
  ],

  sa: [
    {
      id: "sa-mitsukawa",
      title: "情報処理教科書 システムアーキテクト 2025～2026年版",
      author: "松原 敬二 / 満川 一彦",
      publisher: "翔泳社",
      year: 2025,
      asin: "479818828X",
      rakutenId: "17946173",
      tags: ["教科書", "定番"],
      difficulty: "advanced",
      recommendedFor: "SA独学者・最初の一冊",
      description:
        "SA対策の定番教科書。要件定義・方式設計・移行計画など現場直結の論点が整理されている。",
    },
    {
      id: "sa-juten",
      title: "2025-2026 システムアーキテクト「専門知識＋午後問題」の重点対策",
      author: "岡山 昌二",
      publisher: "アイテック",
      year: 2025,
      asin: "4865753354",
      rakutenId: "18030485",
      tags: ["午後", "重点対策"],
      difficulty: "advanced",
      recommendedFor: "午後I・午後IIの実戦対策",
      description:
        "SA午後対策の中心書。設問タイプ別に解き筋を整理し、午後IIの論文骨子の組み方まで踏み込む。",
    },
    {
      id: "sa-ronbun",
      title: "システムアーキテクト 合格論文の書き方・事例集 第6版",
      author: "岡山 昌二 / 満川 一彦",
      publisher: "アイテック",
      year: 2022,
      asin: "4865753036",
      rakutenId: "17293033",
      tags: ["論文", "午後II", "事例"],
      difficulty: "advanced",
      recommendedFor: "論文初学者",
      description:
        "SAでも論文は最大の壁。合格事例集で型を写経しながら、自分の現場経験を当てはめる練習が効く。",
    },
    {
      id: "sa-allinone",
      title: "2026年度版 ALL IN ONE パーフェクトマスター システムアーキテクト",
      author: "TAC情報処理講座",
      publisher: "TAC出版",
      year: 2026,
      asin: "4300117477",
      rakutenId: "18267059",
      tags: ["教科書", "問題演習"],
      difficulty: "advanced",
      recommendedFor: "TAC講座と併走",
      description:
        "TACのオールインワン本。SAは現場経験との接続が鍵で、本書のフレームワークを使うと答案がぐっと整う。",
    },
  ],

  pm: [
    {
      id: "pm-miyoshi",
      title: "令和8～9年 情報処理教科書 プロジェクトマネージャ 2026～2027年版",
      author: "ITのプロ46 / 三好 康之",
      publisher: "翔泳社",
      year: 2026,
      asin: "4798196274",
      rakutenId: "18518359",
      tags: ["教科書", "定番"],
      difficulty: "advanced",
      recommendedFor: "PM独学者・最初の一冊",
      description:
        "PM対策の鉄板書。PMBOK準拠の知識体系と、IPA特有の出題傾向を橋渡ししてくれる。",
    },
    {
      id: "pm-juten",
      title: "2025-2026 プロジェクトマネージャ「専門知識＋午後問題」の重点対策",
      author: "庄司 敏浩",
      publisher: "アイテック",
      year: 2025,
      asin: "4865753435",
      rakutenId: "18204973",
      tags: ["午後", "重点対策"],
      difficulty: "advanced",
      recommendedFor: "午後I記述と午後II論文の対策",
      description:
        "アイテック重点対策のPM版。設問タイプ別の解き筋と、午後IIで使える論文骨子集が強力。",
    },
    {
      id: "pm-ronbun",
      title: "プロジェクトマネージャ 合格論文の書き方・事例集 第6版",
      author: "岡山 昌二 / 落合 和雄",
      publisher: "アイテック",
      year: 2020,
      asin: "4865752358",
      rakutenId: "16436446",
      tags: ["論文", "午後II", "事例"],
      difficulty: "advanced",
      recommendedFor: "論文を書き慣れていない人",
      description:
        "PM論文の事例集として最も読まれている一冊。論文の段落構成・粒度・採点観点を体系的に学べる。",
    },
    {
      id: "pm-allinone",
      title: "2026-2027年度版 ALL IN ONE パーフェクトマスター プロジェクトマネージャ",
      author: "TAC情報処理講座",
      publisher: "TAC出版",
      year: 2026,
      asin: "4300120538",
      rakutenId: "18475615",
      tags: ["教科書", "問題演習"],
      difficulty: "advanced",
      recommendedFor: "TAC講座テキスト派",
      description:
        "TACのオールインワン。教科書＋演習＋論文事例を一括で揃えたい人向け。",
    },
  ],

  sm: [
    {
      id: "sm-murayama",
      title: "情報処理教科書 ITサービスマネージャ 改訂版",
      author: "金子 則彦",
      publisher: "翔泳社",
      year: 2025,
      asin: "4798193852",
      rakutenId: "18319287",
      tags: ["教科書", "定番"],
      difficulty: "advanced",
      recommendedFor: "SM独学者・最初の一冊",
      description:
        "SM対策の定番教科書。ITIL準拠の知識体系を試験文脈に落とし込んで解説する。",
    },
    {
      id: "sm-juten",
      title: "2025-2026 ITサービスマネージャ「専門知識＋午後問題」の重点対策",
      author: "平田 賀一",
      publisher: "アイテック",
      year: 2025,
      asin: "4865753362",
      rakutenId: "18030493",
      tags: ["午後", "重点対策"],
      difficulty: "advanced",
      recommendedFor: "午後I記述・午後II論文の対策",
      description:
        "アイテック重点対策SM版。インシデント・問題管理・変更管理など頻出テーマの設問パターンを整理。",
    },
    {
      id: "sm-ronbun",
      title: "ITサービスマネージャ 合格論文の書き方・事例集 第6版",
      author: "岡山 昌二 / 庄司 敏浩",
      publisher: "アイテック",
      year: 2022,
      asin: "4865753044",
      rakutenId: "17293030",
      tags: ["論文", "午後II", "事例"],
      difficulty: "advanced",
      recommendedFor: "論文初学者",
      description:
        "SM論文の事例集。運用現場の体験を試験論文の型に落とすコツが学べる。",
    },
    {
      id: "sm-allinone",
      title: "2026年度版 ALL IN ONE パーフェクトマスター ITサービスマネージャ",
      author: "TAC情報処理講座",
      publisher: "TAC出版",
      year: 2026,
      asin: "4300117497",
      rakutenId: "18267056",
      tags: ["教科書", "問題演習"],
      difficulty: "advanced",
      recommendedFor: "TAC講座と併走したい人",
      description:
        "教科書・問題演習・論文事例を一冊にまとめたオールインワン。SMは教材が少ないので貴重。",
    },
  ],

  au: [
    {
      id: "au-ochiai",
      title: "情報処理教科書 システム監査技術者 2025～2026年版",
      author: "落合 和雄",
      publisher: "翔泳社",
      year: 2025,
      asin: "4798190977",
      rakutenId: "18126208",
      tags: ["教科書", "定番"],
      difficulty: "advanced",
      recommendedFor: "AU独学者・最初の一冊",
      description:
        "AU対策の定番教科書。システム監査基準・管理基準の押さえ方と、午後事例での観点の取り方を学べる。",
    },
    {
      id: "au-juten",
      title: "新版 システム監査技術者「専門知識＋午後問題」の重点対策",
      author: "古山 文義",
      publisher: "アイテック",
      year: 2024,
      asin: "4865753257",
      rakutenId: "17859713",
      tags: ["午後", "重点対策"],
      difficulty: "advanced",
      recommendedFor: "午後I記述・午後II論文の対策",
      description:
        "AU午後の決定版。監査人視点の答案作法と、リスク・コントロールマトリクスの書き方まで踏み込む。",
    },
    {
      id: "au-ronbun",
      title: "システム監査技術者 合格論文の書き方・事例集 第6版",
      author: "岡山 昌二 / 落合 和雄",
      publisher: "アイテック",
      year: 2020,
      asin: "4865752366",
      rakutenId: "16436447",
      tags: ["論文", "午後II", "事例"],
      difficulty: "advanced",
      recommendedFor: "監査論文初学者",
      description:
        "AU論文事例集。監査人立場の論文では特有の書き方が必要で、本書で型を仕込むのが効率的。",
    },
    {
      id: "au-allinone",
      title: "2026-2027年度版 ALL IN ONE パーフェクトマスター システム監査技術者",
      author: "TAC情報処理講座",
      publisher: "TAC出版",
      year: 2026,
      asin: "4300120552",
      rakutenId: "18475614",
      tags: ["教科書", "問題演習"],
      difficulty: "advanced",
      recommendedFor: "TAC講座テキスト派",
      description:
        "教科書＋演習＋論文事例の一体本。AUは教材が少ないので、本書のオールインワン構成は貴重。",
    },
  ],
};

export function getRecommendedBooks(exam: ExamCode): RecommendedBook[] {
  return RECOMMENDED_BOOKS[exam] ?? [];
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  if (difficulty === "beginner") return "入門";
  if (difficulty === "intermediate") return "中級";
  return "上級";
}
