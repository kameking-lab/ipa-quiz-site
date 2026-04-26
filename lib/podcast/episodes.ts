export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  exam: string;
  category: string;
  durationMin: number;
  publishedAt: string;
  script: string;
  status: "available" | "coming-soon";
}

const EPISODES: PodcastEpisode[] = [
  {
    id: "ap-network-osi-7layer",
    title: "OSI 参照モデル 7 階層を 5 分でおさらい",
    description: "応用情報・基本情報で頻出のOSI 7階層を、各層の役割と代表プロトコルで一気に整理します。",
    exam: "ap",
    category: "ネットワーク",
    durationMin: 5,
    publishedAt: "2026-04-20",
    status: "available",
    script: `OSI 参照モデル 7 階層を、上から順に確認します。

第7層、アプリケーション層は、HTTP、SMTP、FTP など、ユーザーが直接利用するサービスを提供する層です。
第6層、プレゼンテーション層は、文字コードや暗号化など、データの表現形式を変換する層です。
第5層、セッション層は、通信の開始から終了までを管理し、対話の流れを制御します。
第4層、トランスポート層は、TCP や UDP が動作し、エンドツーエンドの信頼性ある通信を担います。
第3層、ネットワーク層は、IP プロトコルが動作し、宛先までの経路選択、つまりルーティングを行います。
第2層、データリンク層は、隣接ノード間のフレーム転送を担い、Ethernet や PPP がこの層に属します。
第1層、物理層は、電気信号や光信号といった、実際のビット列の伝送を扱う層です。

覚え方は「アプセトネデブ」。アプリケーション、プレゼンテーション、セッション、トランスポート、ネットワーク、データリンク、物理。
試験では、各プロトコルがどの層に属するかを問う問題が頻出です。特に TCP は4層、IP は3層、Ethernet は2層、と紐づけて覚えてください。`,
  },
  {
    id: "ap-security-cia-triad",
    title: "情報セキュリティ CIA：機密性・完全性・可用性",
    description: "セキュリティ三要素 CIA を実例ベースで解説。情報処理安全確保支援士の頻出ポイント。",
    exam: "sc",
    category: "セキュリティ",
    durationMin: 6,
    publishedAt: "2026-04-22",
    status: "available",
    script: `情報セキュリティの三要素、CIA について解説します。

C は Confidentiality、機密性です。許可された者だけが情報にアクセスできることを意味します。
代表的な対策は、アクセス制御、暗号化、認証です。

I は Integrity、完全性です。情報が改ざんされておらず正確であることを保証します。
ハッシュ値検証、デジタル署名、ジャーナリングなどが対策に該当します。

A は Availability、可用性です。必要なときに情報や機能が利用できる状態であることです。
冗長化、バックアップ、DDoS 対策、UPS によるバックアップ電源などがこれに当たります。

最近は、これに真正性、責任追跡性、否認防止、信頼性を加えた7要素も問われます。
特に「真正性 = 利用者やデータが本物であること」と、「否認防止 = 後から行為を否定できない仕組み」をセットで覚えておくと得点源になります。`,
  },
  {
    id: "ap-db-normalization",
    title: "データベース正規化 第1〜第3正規形",
    description: "DB スペシャリストで必出の正規化を、繰り返し項目の排除から推移的関数従属の除去まで段階的に。",
    exam: "db",
    category: "データベース",
    durationMin: 7,
    publishedAt: "2026-04-23",
    status: "available",
    script: `データベース正規化の第1から第3までを説明します。

第1正規形は、繰り返し項目を排除し、すべての属性が原子値、つまり単一の値を持つ状態です。
たとえば「商品列に複数商品をカンマ区切りで入れる」のは違反です。商品ごとに行を分けます。

第2正規形は、第1正規形の条件に加えて、部分関数従属を排除した状態です。
複合主キーの一部のみに依存する非キー属性が存在しない状態を指します。
具体例として、注文ID と商品ID の複合主キーで、商品名が商品ID にだけ依存しているなら、商品名は別表に切り出します。

第3正規形は、第2正規形の条件に加えて、推移的関数従属を排除した状態です。
非キー属性が、別の非キー属性を経由して主キーに依存している状態をなくします。
社員ID から部署ID、部署ID から部署名、という連鎖がある場合、部署名は部署表に切り出します。

試験では「この表が第何正規形を満たしているか」「正規化を進める手順」を問う問題が頻出です。`,
  },
  {
    id: "ap-pm-earned-value",
    title: "EVM（アーンドバリュー法）の3つの値",
    description: "プロジェクトマネージャ試験で必須の EVM。PV/EV/AC とコスト・スケジュール乖離の計算式まで。",
    exam: "pm",
    category: "プロジェクトマネジメント",
    durationMin: 6,
    publishedAt: "2026-04-24",
    status: "available",
    script: `アーンドバリューマネジメント、EVM の基礎を整理します。

3つの基本値があります。
PV、Planned Value は計画価値、ある時点までに実施する予定だった作業のコスト見積です。
EV、Earned Value は出来高、実際に完了した作業のコスト見積です。
AC、Actual Cost は実コスト、その作業に実際にかかった費用です。

ここから2つの差異を計算します。
コスト差異 CV = EV − AC。プラスならコスト超過なし、マイナスなら超過です。
スケジュール差異 SV = EV − PV。プラスなら予定より進んでいる、マイナスなら遅れです。

さらに2つの効率指標があります。
コスト効率指数 CPI = EV ÷ AC。1以上なら効率良好。
スケジュール効率指数 SPI = EV ÷ PV。1以上なら予定通り進行。

試験で頻出なのは、グラフから PV、EV、AC を読み取り、CV、SV、CPI、SPI を計算する形式です。
EV を中心に左右どちらと比較するか、で名前を覚えると混乱しません。`,
  },
  {
    id: "ip-strategy-swot",
    title: "ITパスポート：SWOT 分析の使い方",
    description: "ストラテジ系の頻出フレームワーク SWOT を、内部外部・プラスマイナスの4象限で整理。",
    exam: "ip",
    category: "経営戦略",
    durationMin: 4,
    publishedAt: "2026-04-25",
    status: "available",
    script: `SWOT 分析を解説します。

SWOT は、内部環境と外部環境を、それぞれプラス要因とマイナス要因に分けて整理する手法です。

内部のプラスは S、Strengths、強みです。自社の優位な経営資源やノウハウなどが該当します。
内部のマイナスは W、Weaknesses、弱みです。改善すべき自社の課題や不足です。
外部のプラスは O、Opportunities、機会です。市場の成長や規制緩和など追い風となる外部要因です。
外部のマイナスは T、Threats、脅威です。競合参入や法規制強化など向かい風となる外部要因です。

ITパスポート試験では「ある記述がどの象限に当たるか」が問われます。
判別のコツは、まず自社の中の話か、自社の外の話かで内外を判定し、次に得か損かで正負を分ける2段階で考えることです。`,
  },
  {
    id: "fe-algorithm-bigo",
    title: "基本情報：オーダー記法と計算量",
    description: "O(1)、O(log n)、O(n)、O(n log n)、O(n²) を実例で。ソート/探索の計算量も合わせて。",
    exam: "fe",
    category: "アルゴリズム",
    durationMin: 6,
    publishedAt: "2026-04-26",
    status: "available",
    script: `アルゴリズムの計算量、オーダー記法を整理します。

O(1)、定数時間。データ量によらず一定。配列の添字アクセスなどが該当します。
O(log n)、対数時間。二分探索が代表例で、データ量が倍になっても1ステップ増えるだけです。
O(n)、線形時間。線形探索のように、データ量に比例して時間が増えます。
O(n log n)、準線形時間。マージソートやクイックソートの平均計算量で、効率の良いソートはここに来ます。
O(n²)、二次時間。バブルソート、選択ソート、挿入ソートの最悪計算量。データ量が10倍なら時間は100倍です。
O(2^n)、指数時間。素朴な再帰でフィボナッチ数列を計算するなど、現実的に計算が困難な領域です。

基本情報では、ソートアルゴリズムごとの計算量と、二分探索の前提条件として「整列済み」が必要、という点が頻出です。`,
  },
];

export function listPodcastEpisodes(): PodcastEpisode[] {
  return [...EPISODES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function findPodcastEpisode(id: string): PodcastEpisode | null {
  return EPISODES.find((e) => e.id === id) ?? null;
}
