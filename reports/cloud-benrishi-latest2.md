# 弁理士（短答式）直近2回の収録監査

監査日：2026-11-03（UTC）

## 結果

**収録未完了。追加0問。** 資格台帳に未公開の候補として記録した。問題PDFを取得できず、問題文・選択肢・図・正答の照合を完了できないため、問題データや試験ルートは登録していない。ステージングへの問題追加が完了したという報告ではない。

## 対象回と根拠

公式ページの検索インデックスに掲載された年度・更新日・資料名を確認した。直近2回は令和8年度（2026年度）と令和7年度（2025年度）。現在年度だけから対象回を推測していない。ページ本体とPDFの直接取得はHTTP 403となったため、検索結果による掲載確認とPDF原本の照合を区別する。

| 対象回 | 公式掲載ページ | 掲載更新日 | 追加問数 |
| --- | --- | --- | ---: |
| 令和8年度 | https://www.jpo.go.jp/news/benrishi/shiken-mondai/2026tanto.html | 2026-05-18 | 0 |
| 令和7年度 | https://www.jpo.go.jp/news/benrishi/shiken-mondai/2025tanto.html | 2025-05-19 | 0 |

年度の確認に用いた公式索引：

- 令和8年度試験問題：https://www.jpo.go.jp/news/benrishi/shiken-mondai/2026index.html
- 過去の試験問題：https://www.jpo.go.jp/news/benrishi/shiken-mondai/index.html

対象の公式資料URL：

- 2026問題：https://www.jpo.go.jp/news/benrishi/shiken-mondai/document/2026tanto/question.pdf
- 2026正答：https://www.jpo.go.jp/news/benrishi/shiken-mondai/document/2026tanto/answer.pdf
- 2025問題：https://www.jpo.go.jp/news/benrishi/shiken-mondai/document/2025tanto/question.pdf
- 2025正答：https://www.jpo.go.jp/news/benrishi/shiken-mondai/document/2025tanto/answer.pdf

## 除外・保留と理由

両年度の全問を収録保留とした。公式の掲載案内には問題・正答のPDFがあるが、この環境のHTTPクライアントとブラウズツールによる取得は403となった。クエリ付きURL等でも取得できなかった。検索断片だけでは全問題・全選択肢・図・欠落の有無を照合できない。2025正答PDFも直接取得を再確認した。

「公式が全問を公開していない」と判定したわけではない。公開範囲の原本確認自体が未完了である。第三者の転載、類題、生成問題による代用は行っていない。正答・独自解説・画像・hasImageは未作成。再開時は全問公開の確認後、出題時点の法令である旨を各解説に明記し、各問に公式問題・正答URLを記録する。

## 既存方式の確認と変更範囲

- 類似資格：`data/questions/kanteishi/{index.ts,questions.json}`、`data/questions/kaikeishi/{index.ts,questions.json}`。問題データの取込と公開判定を分離している。
- `lib/qualifications/catalog.ts` は外部資格の単一台帳。`status: live` のみ公開。試験コードを持たない未収録資格の記録も既存方式である。
- `data/questions/index.ts`、`lib/questions/get-questions.ts` は公開判定付きの登録。`lib/exam-config.ts` が試験設定を管理する。
- `app/qualifications/page.tsx` は公開資格だけを一覧に出す。`app/[exam]` 以下が試験ルート。
- 今回は台帳に `benrishi` を `terms-review-required` で記録。PDF取得・照合前のため `examCode` を与えていない。問題データ・公開ルート・一覧への追加は保留。未公開の問題データ登録まで完了していない。
- 利用条件の確認先：https://www.jpo.go.jp/toppage/about/index.html 。検索結果ではPDL1.0適用の案内を確認したが、PDF個別の権利表示は未確認。ユーザーへの追加承認要求は設けていない。

## 検証

- `pnpm install`：成功（Prisma Client生成も成功）。
- `pnpm validate:questions`：成功。26,444問、エラー0、既存警告16,808件。今回の追加問題は0問なので弁理士原問の品質合格を示すものではない。
- `pnpm exec vitest run __tests__/lib/exam-config-integrity.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/seo/qualification-coverage-copy.test.tsx`：3ファイル19テスト成功。
- 初回の `pnpm test -- ...` は意図せず全体実行となったため停止し、上記の関連テスト指定で実行し直した。全体テストの成功は主張しない。
- `pnpm typecheck`：標準ヒープ上限ではメモリ不足（exit 134）。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で再実行し成功（exit 0）。
- `git diff --check`：成功。
- build・デプロイは未実行。
