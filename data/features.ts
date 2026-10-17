/**
 * 競合との差別化を狙った機能特集 LP。
 * 検索流入の多い差別化キーワードに対する受け皿。
 */
import { APPROX_QUESTION_COUNT_LABEL } from "@/lib/constants/question-counts";

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
      "Google Gemini を活用した AI 解説で、IPA 情報処理技術者試験の過去問を効率的に学習。選択肢の違い・用語解説・既存過去問の比較・覚え方を対話形式で深掘りできます。",
    hero: {
      badge: "差別化機能",
      headline: "AI 解説で過去問を解き直す",
      subhead:
        "選択肢の違い・用語解説・既存過去問の比較を対話で。静的な解説では届かない深さを、Gemini が即座に提供。",
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
        title: "別の過去問で理解を確認",
        body: "年度や分野を変えて公開済みの過去問を解き、同じ論点を別の出題で確かめられる。",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "問題を選ぶ",
        body: `全 13 試験区分・${APPROX_QUESTION_COUNT_LABEL} 問超から、年度別 / 分野別 / トピック別に選択。`,
      },
      {
        step: "02",
        title: "AI コパイロットを呼び出す",
        body: "PC は右ペイン、モバイルは下からシートが立ち上がる。クイックアクション or 自由テキストで質問。",
      },
      {
        step: "03",
        title: "対話で深掘りする",
        body: "解説 → 既存の過去問で確認 → 別観点で再質問、というサイクルで一問を多角的に学べる。1 日 10 問でも理解の解像度が大きく変わる。",
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
        a: "教育貢献プロジェクトとして無料で利用できます。初回10回の質問上限はありません。連続利用や大量送信には適正利用制限があります。",
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
    title: "午後II 論述の題材選び ── IPA 公式過去問から考える",
    description: "ST・SA・PM・SM・AU の午後II論述について、IPA 公開の問題冊子・出題趣旨・採点講評を使った題材選びを案内します。",
    hero: {
      badge: "公式資料案内",
      headline: "論述の題材を公式過去問から考える",
      subhead: "実際の午後II設問を読み、自分の業務経験の中から設問条件に合う事例を選びましょう。",
    },
    benefits: [
      { title: "出題条件を確認", body: "IPA 公開の問題冊子で、設問が求める役割・経験・具体性を確認します。" },
      { title: "経験を整理", body: "担当した業務の背景・課題・対応・結果を、事実に基づいて整理します。" },
      { title: "採点講評を参照", body: "IPA 公開の出題趣旨・採点講評で、論述で重視された観点を確認します。" },
    ],
    howItWorks: [
      { step: "01", title: "公式過去問を開く", body: "IPA の年度別ページから対象区分の午後II問題冊子を開きます。" },
      { step: "02", title: "設問条件を読む", body: "問われる立場・題材・記述内容を整理します。" },
      { step: "03", title: "答案を見直す", body: "自分の経験を使って答案を作り、出題趣旨・採点講評と照合します。" },
    ],
    primaryCta: { href: "/essay", label: "IPA 公式の午後II過去問を見る" },
    relatedLinks: [
      { href: "/blog/koudo-ronjutsu-kakikata-kotsu", label: "論述の書き方", description: "設問の読み方と文章構成を確認します。" },
    ],
    faqs: [
      { q: "このサイトで独自の論述問題を提供していますか？", a: "提供していません。IPA 公開の問題冊子・解答例・採点講評への案内を掲載しています。" },
    ],
  },
  {
    slug: "essay-grading",
    title: "午後II 論述の自己点検 ── IPA 公式資料の使い方",
    description: "IPA 公開の出題趣旨と採点講評を使い、午後II論述の答案を見直す手順を紹介します。",
    hero: {
      badge: "公式資料案内",
      headline: "午後II論述を公式資料で見直す",
      subhead: "書いた答案と IPA 公開の出題趣旨・採点講評を照らし、設問条件への対応を確認します。",
    },
    benefits: [
      { title: "出題趣旨を確認", body: "実際の設問が求めた内容を IPA の資料で確かめます。" },
      { title: "答案を照合", body: "役割・課題・対応・結果が設問条件に沿っているか見直します。" },
      { title: "次の演習へ", body: "別年度の公式過去問でも同じ観点を練習します。" },
    ],
    howItWorks: [
      { step: "01", title: "年度と区分を選ぶ", body: "IPA の公式過去問一覧から午後IIの問題冊子を開きます。" },
      { step: "02", title: "答案を書く", body: "実際の設問に沿って、自分の業務経験に基づく答案を書きます。" },
      { step: "03", title: "公式資料と照合", body: "出題趣旨・採点講評を読み、説明が不足した点を見直します。" },
    ],
    primaryCta: { href: "/essay", label: "IPA 公式の午後II過去問を見る" },
    relatedLinks: [
      { href: "/blog/koudo-ronjutsu-kakikata-kotsu", label: "論述の書き方", description: "答案の構成を考える際の学習ガイドです。" },
    ],
    faqs: [
      { q: "このサイトで論述答案を採点できますか？", a: "現在、論述答案の自動採点は提供していません。IPA の公式資料を使った自己点検を案内しています。" },
    ],
  },

  {
    slug: "copilot",
    title: "AI コパイロット ── RAG 引用つき対話で過去問を深掘る",
    description:
      "過去問AI の AI コパイロットは、Google Gemini に IPA 公式問題と解説を入力し、引用元つきで回答を生成。誤答分析・選択肢の比較・用語解説をワンタップで呼び出せます。",
    hero: {
      badge: "中核機能",
      headline: "AI コパイロットの仕組みと使い方",
      subhead:
        "問題ごとに常駐する AI が、引用元つきで解説。クイックアクションで「選択肢を比較」「中学生でも分かるように」を即実行。",
    },
    benefits: [
      {
        title: "RAG 引用つきで根拠が見える",
        body: "回答には IPA 公式問題・解答・用語集の参照箇所が引用カードとして並ぶ。AI の生成内容と一次情報を 1 タップで照合できる。",
      },
      {
        title: "クイックアクションで質問が止まらない",
        body: "「選択肢の違いを比較」「中学生でも分かるように」など、用途別ボタンが常時表示。自由テキストに戻る必要がない。",
      },
      {
        title: "関連質問のレコメンド",
        body: "1 回答ごとに「次に聞くと良い質問」を 3 つ提案。理解の縦深を維持したまま、対話が自走する。",
      },
    ],
    howItWorks: [
      {
        step: "01",
        title: "問題ページで AI コパイロットを開く",
        body: "PC は右ペイン、モバイルは下からのボトムシート。常時起動・呼び出しゼロタップ。",
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
        href: "/features/ai-explanation",
        label: "AI 解説の全体像",
        description: "コパイロットを含む AI 解説機能の俯瞰。",
      },
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
        a: "Google Gemini を使用しています。プロバイダは lib/ai/provider.ts の抽象レイヤ経由で実装されており、変更時は公開記録（更新履歴）に明示します。",
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
      "応用情報・基本情報・高度試験の午前を本番想定の制限時間で演習できる模試モード。終了後は分野別正答率・苦手分野ハイライト・復習動線が一画面で確認できます。",
    hero: {
      badge: "本番想定演習",
      headline: "模試モードの使い方と結果分析",
      subhead:
        "20 問・50 問・全 80 問を選び、本番と同じ時間で演習。終了後は分野別スコア・苦手分野・復習ルートが自動で提示。",
    },
    benefits: [
      {
        title: "本番のペースが体に馴染む",
        body: "応用情報なら 150 分 / 80 問など、本番と同じ制限時間で演習可能。配分感覚を直前期までに固められる。",
      },
      {
        title: "分野別の弱点が即可視化",
        body: "終了画面で 13 分野別の正答率がチャート表示。どこに学習時間を投じるべきかが終了 1 分後に見える。",
      },
      {
        title: "復習動線が 1 タップ",
        body: "誤答問題は AI コパイロット呼び出し・既存過去問の復習・公式 PDF 参照が、結果画面からそのままタップで開ける。",
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
      "受験日と現在の学習レベルを入力すると、週次のタスクと進捗マイルストーンを自動生成する学習計画機能。過去問演習・参考書読み込み・模試の配分を AI が提案します。",
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
        title: "分野配分を AI が提案",
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
        body: "毎週日曜などにレビューを行い、達成率に応じて翌週のタスクを AI に再生成させる。",
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
        a: "達成率を正直に入力すれば、AI が現実的に到達可能な範囲で再配分します。完璧な遂行を求めるのではなく、継続を重視した設計です。",
      },
    ],
  },
];

export function getFeatureBySlug(slug: string): FeatureLandingPage | undefined {
  return FEATURE_LANDING_PAGES.find((p) => p.slug === slug);
}
