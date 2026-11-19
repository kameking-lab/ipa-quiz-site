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
    slug: "industry-essays",
    title: "業種別 論述事例集 ── ST/SA/PM/SM/AU",
    description:
      "IT ストラテジスト・システムアーキテクト・プロジェクトマネージャ・IT サービスマネージャ・システム監査の論文式試験向けに、業種別の模範論述例を提供。書き出しの一行が劇的に変わる。",
    hero: {
      badge: "差別化機能",
      headline: "業種別 論述事例集",
      subhead:
        "業種別の参考答案から、論述の題材と構成を確認できます。",
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
        title: "答案の構成を見直す",
        body: "編集部作成の練習答案で、背景・課題・施策・振り返りのつながりを確かめます。実際の合格答案や、一定時間で書けることを示す実績ではありません。",
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
        body: "背景・課題・施策・効果の構成を参考に、自分の業務事例を整理します。",
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
    slug: "copilot",
    title: "AIに質問する ── 問題画面で解き方を確認",
    description:
      "問題の選択肢の違いや分からない用語を、その場で質問できます。問題と解説を確認しながら学習を進められます。",
    hero: {
      badge: "中核機能",
      headline: "問題への質問の使い方",
      subhead:
        "選択肢の比較や用語の意味を、問題画面から質問できます。",
    },
    benefits: [
      {
        title: "引用元を確認する",
        body: "回答には IPA 公式問題・解答・用語集の参照箇所が引用カードとして並ぶ。AI の生成内容と一次情報を 1 タップで照合できる。",
      },
      {
        title: "聞きたい内容を選ぶ",
        body: "選択肢の比較や用語解説など、聞きたい内容を選んで質問できます。",
      },
      {
        title: "関連質問のレコメンド",
        body: "回答を読んでから、続けて質問できます。",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "質問欄を開く",
        body: "問題画面の「この問題をAIに質問」を押します。",
      },
      {
        step: "02",
        title: "クイックアクション or 自由質問",
        body: "「この用語を別の例で」「誤答した理由を教えて」など、用途別ボタンを選ぶか、自由入力で質問。",
      },
      {
        step: "03",
        title: "引用カードで根拠を確認",
        body: "回答下部の引用カードから IPA 公式 PDF・関連用語ページ・類似過去問へ即遷移。",
      },
    ],
    primaryCta: { href: "/ap", label: "応用情報の問題で AI コパイロットを試す" },
    relatedLinks: [
      {
        href: "/transparency",
        label: "AI 出力の透明性レポート",
        description: "どのモデル・どの入力で生成しているかを公開。",
      },
      {
        href: "/keywords/ai-copilot-how-to-use",
        label: "コパイロット質問テンプレ 10 選",
        description: "効果が出やすい質問パターンを学ぶ。",
      },
    ],
    faqs: [
      {
        q: "コパイロットはどのモデルを使っていますか？",
        a: "Google Geminiを使用しています。送信する情報はプライバシーポリシーで確認できます。",
      },
      {
        q: "引用カードの情報はどこから来ていますか？",
        a: "IPA 公式問題・公式解答・サイト内用語集ページから抽出しています。各カードから一次情報へ 1 タップで遷移可能です。",
      },
      {
        q: "オフラインでも使えますか？",
        a: "コパイロットはオンライン API を呼び出すため、オフラインでは利用できません。問題演習自体は PWA のキャッシュ済み範囲で継続できます。",
      },
    ],
  },

  {
    slug: "mock-exam",
    title: "模試モード ── 本番想定の時間配分とスコア分析",
    description:
      "収録問題を設定された問題数・制限時間で解く模試モード。終了後に自分の成績と復習対象を確認できます。受験回の公式形式と設定が一致するか確認してください。",
    hero: {
      badge: "本番想定演習",
      headline: "模試モードの使い方と結果分析",
      subhead:
        "20 問・50 問・全 80 問を選び、本番と同じ時間で演習。終了後は分野別スコア・苦手分野・復習ルートが自動で提示。",
    },
    benefits: [
      {
        title: "本番のペースが体に馴染む",
        body: "開始画面に示す問題数・制限時間で演習します。過去の形式と現在の試験形式は異なる場合があるため、受験する回の公式案内を確認してください。",
      },
      {
        title: "分野別の弱点が即可視化",
        body: "終了画面で 13 分野別の正答率がチャート表示。どこに学習時間を投じるべきかが終了 1 分後に見える。",
      },
      {
        title: "復習動線が 1 タップ",
        body: "解き終えた問題の解説や公式資料を確認して復習できます。",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "試験区分と問題数を選ぶ",
        body: "AP / FE / 高度試験の午前 II など、対応試験区分と 20 問・50 問・全問から選択。",
      },
      {
        step: "02",
        title: "本番想定の制限時間でスタート",
        body: "本番と同じ時間（または比例縮小）でカウントダウン。途中保存・離脱復帰にも対応。",
      },
      {
        step: "03",
        title: "結果分析と復習ルートを確認",
        body: "総合正答率・分野別スコア・苦手分野ハイライト・誤答問題リストが一画面に集約。",
      },
    ],
    primaryCta: { href: "/mock-exam", label: "模試モードを始める" },
    relatedLinks: [
      {
        href: "/account/dashboard",
        label: "学習進捗ダッシュボード",
        description: "過去の模試結果と学習履歴を一覧で確認。",
      },
      {
        href: "/features/study-plan",
        label: "学習計画の使い方",
        description: "模試結果を起点に学習計画を組み立てる。",
      },
      {
        href: "/blog/kakomon-nankai-tokinaosu",
        label: "過去問は何回解き直すべきか",
        description: "模試と通常演習の組み合わせ方。",
      },
    ],
    faqs: [
      {
        q: "模試は何種類ありますか？",
        a: "応用情報・基本情報のほか、高度試験の午前 II も対応しています。問題数は 20 問・50 問・全問から選択できます。",
      },
      {
        q: "途中で中断したら結果は失われますか？",
        a: "ローカル保存（localStorage）に進行状態を保存しているため、ブラウザを閉じても再開可能です。ログイン時はクラウド同期もサポート予定です。",
      },
      {
        q: "結果はどこで見返せますか？",
        a: "結果画面のリンクから、学習進捗ダッシュボードに自動保存されます。直近 10 回までの推移を比較できます。",
      },
    ],
  },

  {
    slug: "study-plan",
    title: "学習計画 ── 受験日から逆算した週次タスク自動生成",
    description:
      "受験日と現在の学習レベルを入力すると、週次のタスクと進捗マイルストーンを自動生成する学習計画機能。過去問演習・参考書・模試の配分を確認できます。",
    hero: {
      badge: "計画支援",
      headline: "学習計画の組み立て方",
      subhead:
        "受験日と現状レベルから逆算した週次タスクを自動生成。隔週で進捗を見直し、足りない分野に演習時間を寄せていく。",
    },
    benefits: [
      {
        title: "残り日数から逆算でタスク化",
        body: "「あと 90 日」「あと 30 日」など、残り日数を入れるだけで週次タスクに分解。1 週間ごとに『今やるべきこと』が決まる。",
      },
      {
        title: "分野ごとの配分を確認",
        body: "模試結果や演習履歴を参照し、苦手分野に時間を寄せた配分を提案。漫然と過去問を流すのではなく、戦略的に時間を投じられる。",
      },
      {
        title: "進捗マイルストーンで自己評価",
        body: "「2 週目末で午前 70% 安定」「4 週目末で模試 60% 突破」など、節目ごとに到達基準を明示。継続のモチベーション維持に効く。",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "受験日と試験区分を入力",
        body: "目標とする試験区分・受験予定日・現在の学習レベルを入力。",
      },
      {
        step: "02",
        title: "週次タスクを生成",
        body: "残り週数を分割し、過去問演習・参考書・模試の配分を週単位で提示。",
      },
      {
        step: "03",
        title: "週次レビューで調整",
        body: "タスクの達成状況を確認し、学習を続けます。",
      },
    ],
    primaryCta: { href: "/study-plan", label: "学習計画を作成する" },
    relatedLinks: [
      {
        href: "/features/mock-exam",
        label: "模試モード",
        description: "計画の節目ごとに到達度を測る。",
      },
      {
        href: "/blog/ipa-shiken-shakaijin-jikan-kakuho",
        label: "社会人の時間確保 5 つの工夫",
        description: "限られた時間を計画に組み込む実例。",
      },
      {
        href: "/blog/kakumon-gakushuu-science",
        label: "過去問演習の科学",
        description: "間隔反復・テスト効果を計画に応用する。",
      },
    ],
    faqs: [
      {
        q: "学習計画は誰でも作れますか？",
        a: "はい。ログイン不要で、ブラウザの localStorage に保存されます。複数端末で同期したい場合はログインを推奨します。",
      },
      {
        q: "計画を途中で変更できますか？",
        a: "いつでも再生成可能です。週次レビューでタスクの達成率を入力すると、翌週以降のタスクが自動で再計算されます。",
      },
      {
        q: "計画通りに進まない場合は？",
        a: "達成したタスクを確認し、次に取り組む内容を選びます。",
      },
    ],
  },
];

export function getFeatureBySlug(slug: string): FeatureLandingPage | undefined {
  return FEATURE_LANDING_PAGES.find((p) => p.slug === slug);
}
