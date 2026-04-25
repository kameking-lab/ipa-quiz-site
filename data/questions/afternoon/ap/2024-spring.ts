// 編集者キュレーション。実問題は scripts/parse-afternoon/parse-ap-afternoon.ts で抽出する。
import type { AfternoonQuestion } from "@/lib/afternoon/types";

export const AP_AFTERNOON_2024_SPRING: AfternoonQuestion[] = [
  {
    id: "ap-2024h-pm-q1",
    exam: "ap",
    year: 2024,
    season: "spring",
    qNumber: 1,
    type: "descriptive",
    category: "情報セキュリティ",
    title: "中堅製造業のSaaS導入に伴うID管理の見直し",
    context: `A社は中堅製造業で、社員数は約1,500名である。これまで社内システムは全てオンプレミスで運用してきたが、業務効率化のため、複数のSaaSサービスを導入することを決定した。

導入予定のSaaS:
- グループウェアG（メール・カレンダー・ドキュメント共有）
- 営業支援システムS（顧客管理）
- 経費精算システムK（経費申請・承認）

これに伴い、情報システム部のB課長は、以下の課題を整理した。

[課題1] 各SaaSごとにID/パスワードを管理すると、ユーザーの利便性が低下し、また退職者のアカウント削除漏れが発生するおそれがある。
[課題2] 社内ネットワーク外からSaaSへアクセスする場合の認証強度が不十分である。
[課題3] 各SaaS上のアクセスログが分散しており、不正アクセスの早期検知が困難である。

B課長は、これらの課題に対応するため、IDaaS（Identity as a Service）の導入を検討している。`,
    subQuestions: [
      {
        label: "設問1",
        prompt:
          "[課題1]に対して、IDaaSを導入することで得られる効果を、ユーザー利便性の観点から40字以内で述べよ。",
        type: "long-text",
        maxLength: 40,
        modelAnswer:
          "1度の認証で全SaaSにシングルサインオンでき、複数のID/パスワードの管理が不要になる。",
        scoringRubric:
          "【満点】SSO/シングルサインオン に明確に言及し、かつ「複数ID管理不要」「1回の認証」のいずれかを含む。\n【部分点】SSO に言及するが効果説明が弱い／「ログインの手間が減る」など抽象的表現にとどまる。\n【0点】管理面の効果のみで利便性に触れていない／IDaaS の機能を誤認している。\nNGキーワード: 「認証強度」「MFA」（→課題2の解答であり混同）。",
        points: 20,
      },
      {
        label: "設問2",
        prompt:
          "[課題1]に対して、IDaaSを導入することで得られる効果を、管理面の観点から40字以内で述べよ。",
        type: "long-text",
        maxLength: 40,
        modelAnswer:
          "退職者のアカウントをIDaaSで一括無効化でき、各SaaSでの削除漏れを防止できる。",
        scoringRubric:
          "【満点】「一元管理」「一括無効化」「削除漏れ防止」のうち2要素以上に言及。\n【部分点】退職時のリスク低減に触れるが手段が曖昧／プロビジョニング自動化に触れるが効果未記載。\n【0点】ユーザー利便性のみ言及／コスト削減など本問と関係ない論点に逸脱。",
        points: 20,
      },
      {
        label: "設問3",
        prompt:
          "[課題2]に対する対策として、IDaaSが提供すべき機能名と、その効果を50字以内で述べよ。",
        type: "long-text",
        maxLength: 50,
        modelAnswer:
          "多要素認証(MFA)を有効化し、パスワードが漏洩した場合でも所持要素なしには不正ログインできないようにする。",
        scoringRubric:
          "【満点】機能名（MFA／多要素認証／二要素認証／リスクベース認証／条件付きアクセスのいずれか）＋効果（パスワード漏洩耐性／不正アクセス防止）を両方記述。\n【部分点】機能名のみ／効果のみ。\n【0点】「強いパスワード」「定期変更」など、課題2の認証強度向上に直結しない対策。",
        points: 30,
      },
      {
        label: "設問4",
        prompt:
          "[課題3]に対する対策として、IDaaSのログを活用する具体的方法を40字以内で述べよ。",
        type: "long-text",
        maxLength: 40,
        modelAnswer:
          "IDaaSに集約された認証ログをSIEMへ連携し、異常アクセスを自動検知する仕組みを構築する。",
        scoringRubric:
          "【満点】「ログ集約」＋「SIEM／監査基盤連携」＋「異常検知の自動化」の3要素のうち2つ以上を含む。\n【部分点】手動でのログ確認のみ言及（運用負荷の問題が残る）／ログ保管のみで活用に触れない。\n【0点】ログの活用方法ではなくアクセス制御の話に逸脱。",
        points: 30,
      },
    ],
    pdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h05_1/2024h05h_ap_pm_qs.pdf",
    license: "IPA-public",
    totalTimeMinutes: 150,
  },
];
