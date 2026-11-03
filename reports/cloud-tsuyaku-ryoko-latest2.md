# 全国通訳案内士・旅行業務取扱管理者 直近2回監査

確認日: 2026-11-03。推測した年度や非公式の復元問題は採用しない。

## 既存方式の確認

- `data/questions/ap/index.ts`、`data/questions/index.ts` の資格別モジュール・共通登録と `lib/questions/get-questions.ts` のローダーを確認。
- `lib/qualifications/catalog.ts` が掲載条件の判断台帳。未許諾の行政書士・日商簿記3級は examCode を登録せず `permission-required` として管理。
- `app/qualifications/page.tsx` は status が live の資格だけ表示。`app/[exam]/page.tsx` は既存の利用可能資格を基にルーティングする。
- 本文収録を見送る資格はこの既存方式を使い、公開用 ExamCode・ローダー・ルート・問題データを作らない。空の過去問や生成問題も作らない。

## 全国通訳案内士（筆記）

対象: **2026年度・2025年度**。公式一覧の先頭2年度と年度別ページで確認。

- [公式一覧](https://www.jnto.go.jp/projects/visitor-support/interpreter-guide-exams/past-exam-archives/)
- [2026年度筆記試験問題（一部）](https://www.jnto.go.jp/projects/visitor-support/interpreter-guide-exams/past-exam-archives/2026.html)
- [2025年度筆記試験問題（一部）](https://www.jnto.go.jp/projects/visitor-support/interpreter-guide-exams/past-exam-archives/2025.html)
- [サイトポリシー・著作権](https://www.jnto.go.jp/site-info/site-policy.html)

追加 **0問**、対象2年度の本文を資格単位で除外。公式一覧は引用文章・画像を著作権に配慮して掲載していないと説明。全問公開ではないという指定除外条件に該当する。ポリシーにも権利者に無断で複製等を行うことへの制限がある。科目の一部だけを抜き出して収録することもしない。公式正答の転記・解説作成・画像の保存は実施せず、未公開台帳のみ追加。

## 検証（全国通訳案内士）

- `pnpm install`: 成功。
- `pnpm validate:questions`: 成功、26,444問、fail=0（既存警告16,808件）。
- `pnpm typecheck`: 既定の約2GBヒープ上限で停止したため、`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で再実行し成功。
- `pnpm exec vitest run __tests__/questions/live-qualification-coverage.test.ts __tests__/seo/qualification-coverage-copy.test.tsx`: 2ファイル・13テスト成功。
- 最初の `pnpm test -- ...` は全体を実行したため中断し、上記の明示的な関連テスト指定で確認。build・デプロイは実行していない。
