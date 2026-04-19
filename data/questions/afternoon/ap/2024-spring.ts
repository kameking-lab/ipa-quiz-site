// Mock data for development. 実データは scripts/parse-afternoon/parse-ap-afternoon.ts で生成する。
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
    title: "中堅製造業のSaaS導入に伴うID管理の見直し（モック）",
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
          "[課題1]に対して、IDaaSを導入することで得られる効果を、ユーザー利便性と管理面の両面から、それぞれ40字以内で述べよ。",
        type: "long-text",
        maxLength: 40,
        modelAnswer:
          "ユーザー面: 1度の認証で全SaaSを利用でき、複数のID/パスワードを覚える必要がなくなる。\n管理面: 退職者のアカウントをIDaaS上で一括無効化でき、各SaaSでの削除漏れを防げる。",
        scoringRubric:
          "ユーザー面: シングルサインオン(SSO)の効果に言及していれば加点。「1回の認証」「複数のIDを覚えなくてよい」がキーワード。\n管理面: 一元管理・退職時の即時無効化・削除漏れ防止のいずれかに言及していれば加点。",
        points: 40,
      },
      {
        label: "設問2",
        prompt:
          "[課題2]に対する対策として、IDaaSが提供する機能を1つ挙げ、その機能名と効果を25字以内で述べよ。",
        type: "short-text",
        maxLength: 25,
        modelAnswer:
          "機能名: 多要素認証(MFA)\n効果: パスワード漏洩時も不正ログインを防止できる",
        scoringRubric:
          "多要素認証(MFA)・リスクベース認証・条件付きアクセスのいずれかに言及していれば加点。効果として認証強度向上・不正アクセス防止に言及していること。",
        points: 30,
      },
      {
        label: "設問3",
        prompt:
          "[課題3]に対する対策として、IDaaSのログを活用する方法を、30字以内で述べよ。",
        type: "long-text",
        maxLength: 30,
        modelAnswer:
          "IDaaSに集約されたログをSIEMに連携し、異常なアクセスパターンを自動検知する。",
        scoringRubric:
          "「ログ集約」「SIEM/監査基盤との連携」「異常検知の自動化」のいずれかに言及していれば加点。具体性が高いほど高得点。",
        points: 30,
      },
    ],
    pdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h05_1/2024h05h_ap_pm_qs.pdf",
    license: "IPA-public",
    totalTimeMinutes: 150,
  },
];
