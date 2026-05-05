/**
 * 競合との差別化を狙った機能特集 LP。
 * 検索流入の多い差別化キーワードに対する受け皿。
 */
export interface FeatureLandingPage {
  slug: string;
  title: string;
  description: string;
  /** ヒーロー領域のキャッチコピー */
  hero: {
    badge: string;
    headline: string;
    subhead: string;
  };
  /** 「特長 3 点」で見せるベネフィット */
  benefits: { title: string; body: string }[];
  /** 仕組み解説 */
  howItWorks: { step: string; title: string; body: string }[];
  /** 主要 CTA リンク */
  primaryCta: { href: string; label: string };
  /** 関連リンク */
  relatedLinks: { href: string; label: string; description: string }[];
  /** FAQ（FAQPage schema にも使う） */
  faqs: { q: string; a: string }[];
}

export const FEATURE_LANDING_PAGES: FeatureLandingPage[] = [
  {
    slug: "ai-explanation",
    title: "AI 解説で過去問を学ぶ ── 過去問AI",
    description:
      "Google Gemini を活用した AI 解説で、IPA 情報処理技術者試験の過去問を効率的に学習。選択肢の違い・用語解説・類題生成・覚え方を対話形式で深掘りできます。",
    hero: {
      badge: "差別化機能",
      headline: "AI 解説で過去問を解き直す",
      subhead:
        "選択肢の違い・用語解説・類題生成を対話で。静的な解説では届かない深さを、Gemini が即座に提供。",
    },
    benefits: [
      {
        title: "用語をその場で噛み砕く",
        body: "『中学生でも分かるように』『SQL の例で』など、自分の理解レベルに合わせた解説を瞬時に取得。読むだけでは飛ばしがちな抽象用語が、対話で腹落ちする。",
      },
      {
        title: "誤答した理由を可視化",
        body: "選んだ選択肢ごとに『なぜ違うか』を AI が個別に解説。消去法を機械的にやるのではなく、『各選択肢が何を意味するか』を理解した上で正解を選べるようになる。",
      },
      {
        title: "類題を 1 問だけ即生成",
        body: "同じ論点で別パターンの問題を AI に作らせて、即座に応用力を確認できる。インプット → アウトプットのサイクルが極めて短い。",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "問題を選ぶ",
        body: "全 13 試験区分・12,000 問超から、年度別 / 分野別 / トピック別に選択。",
      },
      {
        step: "02",
        title: "AI コパイロットを呼び出す",
        body: "PC は右ペイン、モバイルは下からシートが立ち上がる。クイックアクション or 自由テキストで質問。",
      },
      {
        step: "03",
        title: "対話で深掘りする",
        body: "解説 → 類題 → 別観点で再質問、というサイクルで一問を多角的に学べる。1 日 10 問でも理解の解像度が大きく変わる。",
      },
    ],
    primaryCta: { href: "/ap", label: "応用情報の問題で AI 解説を試す" },
    relatedLinks: [
      {
        href: "/transparency",
        label: "AI 解説の透明性レポート",
        description: "どのモデル・どの入力で生成しているかを公開。",
      },
      {
        href: "/keywords/ai-copilot-how-to-use",
        label: "AI コパイロットの効果的な使い方",
        description: "10 個の質問テンプレートで活用幅を広げる。",
      },
      {
        href: "/glossary",
        label: "IT 用語集",
        description: "用語ごとの定義と関連トピックハブへの導線。",
      },
    ],
    faqs: [
      {
        q: "AI 解説は無料で使えますか？",
        a: "教育貢献プロジェクトとして、初回 10 回まではどなたでもご利用可能。フィードバックを 1 度ご投稿いただくと、以降は実質無制限になります。",
      },
      {
        q: "AI 解説の精度は信頼できますか？",
        a: "Google Gemini に IPA 公式問題と公式解答を入力に生成しています。一般的には有用ですが、稀に誤りを含む可能性があるため、各問題ページから IPA 公式 PDF にもアクセスできます。",
      },
      {
        q: "対話履歴は保存されますか？",
        a: "ログイン時はクラウドに保存され、複数端末から続きを参照できます。未ログイン時はブラウザの localStorage に保存されます。",
      },
    ],
  },

  {
    slug: "industry-essays",
    title: "業種別 論述事例集 ── ST/SA/PM/SM/AU",
    description:
      "IT ストラテジスト・システムアーキテクト・プロジェクトマネージャ・IT サービスマネージャ・システム監査の論文式試験向けに、業種別の模範論述例を提供。書き出しの一行が劇的に変わる。",
    hero: {
      badge: "差別化機能",
      headline: "業種別 論述事例集",
      subhead:
        "金融・製造・小売・公共・医療・エネルギーなど業種別の業務事例を AI が起点として提案。論文の『そもそも何を書くか』に悩まない。",
    },
    benefits: [
      {
        title: "業務事例の引き出しが増える",
        body: "論文式試験で最も詰まるのは『題材選び』。業種別事例集は、自分の経験に近いケースを選んで肉付けする方法を提案する。",
      },
      {
        title: "テンプレ依存からの脱却",
        body: "ありがちな『どこの会社にも当てはまる』論文ではなく、業種特有の制約・利害関係者を盛り込むことで採点者の評価を高める。",
      },
      {
        title: "論文骨子を 5 分で仕込む",
        body: "AI が業種 × テーマで骨子を生成。あとは自分の経験を肉付けするだけで、本番でも 1 時間以内に書き上げる感覚を養える。",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "試験区分とテーマを選ぶ",
        body: "ST/SA/PM/SM/AU の各試験ページから、過去問テーマや汎用テーマを選択。",
      },
      {
        step: "02",
        title: "業種を指定",
        body: "金融・製造・小売・公共・医療・エネルギー・通信・教育などから業種を指定。",
      },
      {
        step: "03",
        title: "骨子を生成して加筆",
        body: "AI が論文骨子（背景 → 課題 → 施策 → 効果）を業種特有の論点込みで生成。あなた自身の業務事例で肉付け。",
      },
    ],
    primaryCta: { href: "/essay", label: "論文事例を見る" },
    relatedLinks: [
      {
        href: "/keywords/st-essay-structure-pattern",
        label: "ST 論文の構成パターン 5 選",
        description: "評価が安定する論文骨子の使い分け。",
      },
      {
        href: "/keywords/auditor-coso-cobit",
        label: "AU 試験 COSO・COBIT 使い分け",
        description: "監査論文の権威性を一段引き上げる引用。",
      },
      {
        href: "/features/essay-grading",
        label: "AI 論述添削",
        description: "書いた論文を AI が即座に添削する別機能。",
      },
    ],
    faqs: [
      {
        q: "対象となる試験区分は？",
        a: "IT ストラテジスト（ST）/ システムアーキテクト（SA）/ プロジェクトマネージャ（PM）/ IT サービスマネージャ（SM）/ システム監査技術者（AU）の 5 区分です。",
      },
      {
        q: "業種別事例は何種類ありますか？",
        a: "金融・製造・小売・公共・医療・エネルギー・通信・教育の 8 業種を中心に提供。順次拡充しています。",
      },
      {
        q: "事例をそのまま提出してよいですか？",
        a: "事例はあくまで『着想を得るための題材』です。本番論文は必ず自分の経験で肉付けしてください（試験は実経験の表現を求めています）。",
      },
    ],
  },

  {
    slug: "essay-grading",
    title: "AI 論述添削 ── 午後記述・論文の即時フィードバック",
    description:
      "応用情報の午後記述、SC/NW/DB/ES/PM/SM/AU の午後 I・午後 II、ST/SA/PM/SM/AU の論文を AI が即座に添削。配点根拠と改善点を提示します。",
    hero: {
      badge: "差別化機能",
      headline: "AI 論述添削",
      subhead:
        "書いた答案を貼り付けるだけで、AI が IPA 採点基準を参照しながら『どこで何点引かれるか』を即座にフィードバック。",
    },
    benefits: [
      {
        title: "添削サイクルが 24 時間 → 30 秒",
        body: "予備校の添削サービスは数日〜1 週間。AI 添削なら同じサイクルを 30 秒で回せる。1 日に 5 本書く練習も現実的。",
      },
      {
        title: "配点ロジックを学べる",
        body: "『この一文は加点 / 減点』の判断根拠を AI が説明。次回からどこに気を付ければ点が伸びるかが言語化される。",
      },
      {
        title: "全試験区分・記述問題に対応",
        body: "午後記述（AP/SC/NW/DB/ES/PM/SM）と論文（ST/SA/PM/SM/AU）の両方に対応。試験区分ごとの採点傾向を踏まえる。",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "試験区分・大問を選ぶ",
        body: "対応試験区分から、添削したい大問の問題文を選択。",
      },
      {
        step: "02",
        title: "答案を貼り付け",
        body: "テキストエリアに答案を貼り付ける（200〜2,200 字）。OCR で手書き取り込みも準備中。",
      },
      {
        step: "03",
        title: "添削結果を受け取る",
        body: "総合点 / 設問別点 / 改善コメント / キーワード抽出の 4 視点で結果を提示。再添削も無制限。",
      },
    ],
    primaryCta: { href: "/demo/essay-grading", label: "AI 論述添削を試す（β）" },
    relatedLinks: [
      {
        href: "/features/industry-essays",
        label: "業種別 論述事例集",
        description: "そもそも何を書くかに悩まない題材集。",
      },
      {
        href: "/keywords/sc-incident-response",
        label: "SC 午後 II インシデント対応の傾向",
        description: "頻出設問パターンと答案構成。",
      },
      {
        href: "/transparency",
        label: "AI 採点の透明性レポート",
        description: "採点ロジック・データ取り扱いの開示。",
      },
    ],
    faqs: [
      {
        q: "AI 採点の精度は本物の採点と一致しますか？",
        a: "本試験の採点者と完全に一致するものではありませんが、IPA 公式解答例とキーワードを基準に評価しているため、改善のための参考目安として活用できます。",
      },
      {
        q: "1 日に何回まで添削できますか？",
        a: "通常利用の範囲では実質無制限です（ソフトリミット: 1 分 10 リクエスト）。",
      },
      {
        q: "添削結果は保存されますか？",
        a: "ログイン時のみクラウドに保存されます。未ログイン時はブラウザの localStorage に最新 10 件まで保持されます。",
      },
    ],
  },
];

export function getFeatureBySlug(slug: string): FeatureLandingPage | undefined {
  return FEATURE_LANDING_PAGES.find((p) => p.slug === slug);
}
