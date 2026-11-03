# エネルギー管理士・高圧ガス製造保安責任者 直近2回監査

確認日: 2026-11-03（UTC）。試験と研修修了試験・講習検定を区別する。

## 既存実装の確認

- `data/questions/denken3` は年度・科目別、`data/questions/gas/kou` は区分別の構成。集約は `data/questions/index.ts`。
- 資格登録・未公開管理は `lib/qualifications/catalog.ts`。既存の建築施工管理・行政書士と同じ `permission-required`、`examCode` なしの候補登録を利用する。
- `lib/exam-config.ts` の公開資格一覧、`app/[exam]` の動的ルーティング、`app/qualifications/page.tsx` の `live` フィルターを確認。本文収録を見送る候補は演習レジストリ・公開ルートへ登録しない。空の問題や生成問題で補わない。

## エネルギー管理士

対象は国家試験の第48回（令和8年度、2026-08-02実施）と第47回（令和7年度、2025-08-03実施）。過去問一覧だけで最新を判断せず、当年度の標準解答ページと照合した。

- 当年度公式: https://www.eccj.or.jp/mgr1/test/answer.html （2026-08-04更新、実施日と第48回を明記。熱・電気両分野の問題・解答リンクあり）
- 過去年度公式・利用条件: https://www.eccj.or.jp/mgr1/test_past/ （2026-08-04更新、先頭の実施回は令和7年8月3日）
- 第48回の回数確認用標準解答: https://www.eccj.or.jp/mgr1/test_past/pdf/r08/r08_k_1.pdf
- 第47回の回数確認用標準解答: https://www.eccj.or.jp/mgr1/test_past/pdf/r07/r07_k_1.pdf

除外理由: 過去問公式ページ冒頭に「これらの全部又は一部を無断で複製・転写することを固く禁じます。」と明記。個人利用を超える場合は試験部への連絡が必要とされている。ユーザー指定の除外条件に該当するため、熱・電気・共通基礎の全対象を本文収録から除外。許諾取得済みとは扱わない。

追加問数: **0問**。資格台帳に未公開の候補として登録。問題文・選択肢・図・正答データ・解説は追加していない。

## 検証

エネルギー管理士分:

- `pnpm install`: 成功（lockfile変更なし）。
- `pnpm validate:questions`: 成功、26,444問、失敗0、既存警告16,808。
- `pnpm typecheck`: 初回はNodeヒープ上限で終了。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で成功。
- `pnpm exec vitest run __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/lib/home-directory.test.ts`: 3ファイル、1,084件成功。
- `git diff --check`: 成功。

`pnpm build`・デプロイは実施していない。
