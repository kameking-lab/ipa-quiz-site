// Mock data for development. 実データは scripts/parse-afternoon/parse-ap-afternoon.ts で生成する。
import type { AfternoonQuestion } from "@/lib/afternoon/types";

export const AP_AFTERNOON_2023_SPRING: AfternoonQuestion[] = [
  {
    id: "ap-2023h-pm-q3",
    exam: "ap",
    year: 2023,
    season: "spring",
    qNumber: 3,
    type: "descriptive",
    category: "プログラミング",
    title: "在庫管理システムにおけるバッチ処理の最適化（モック）",
    context: `D社の在庫管理システムは、毎晩深夜にバッチ処理で全店舗の在庫データを集計している。店舗数の増加に伴い、バッチ処理の所要時間が当初の30分から3時間に増大し、翌朝の業務開始までに完了しないリスクが顕在化している。

現在の処理:
- 店舗ごとに順次SQLクエリを発行し、結果を1つの集計テーブルに INSERT する
- 店舗数: 約1,000店舗
- 1店舗あたりの平均処理時間: 約11秒（うち9割がDB待ち時間）

E社員は、処理時間短縮のため、並列化と一括INSERTの2つの改善案を検討している。`,
    subQuestions: [
      {
        label: "設問1",
        prompt:
          "現在の処理がボトルネックとなっている主な理由を、I/O観点から30字以内で述べよ。",
        type: "long-text",
        maxLength: 30,
        modelAnswer:
          "店舗ごとに直列でDB問い合わせを行うため、I/O待ちで CPU が遊ぶ時間が大半を占めるから。",
        scoringRubric:
          "「直列処理」「I/O待ち」「CPU 遊休」のいずれかに言及していれば加点。「DB アクセスがシリアル」も可。",
        points: 30,
      },
      {
        label: "設問2",
        prompt:
          "並列化を導入する場合の注意点を1つ挙げ、35字以内で述べよ。",
        type: "long-text",
        maxLength: 35,
        modelAnswer:
          "DB のコネクション数や同時実行数の上限を超えないよう、並列度に上限を設ける。",
        scoringRubric:
          "「DB コネクション上限」「同時実行数の制御」「ロック競合」「メモリ消費」のいずれかに言及していれば加点。",
        points: 35,
      },
      {
        label: "設問3",
        prompt:
          "一括INSERTを採用する場合に得られる効果を、ネットワーク/トランザクション観点から30字以内で述べよ。",
        type: "long-text",
        maxLength: 30,
        modelAnswer:
          "ラウンドトリップとコミット回数を減らし、ネットワークオーバーヘッドが下がる。",
        scoringRubric:
          "「ラウンドトリップ削減」「コミット回数削減」「ネットワークオーバーヘッド削減」のいずれかに言及していれば加点。",
        points: 35,
      },
    ],
    pdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_1/2023h05h_ap_pm_qs.pdf",
    license: "IPA-public",
    totalTimeMinutes: 150,
  },
];
