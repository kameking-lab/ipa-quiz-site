# 賃貸不動産経営管理士 直近2回の収録監査

確認日：2026-11-03。対象資格：賃貸不動産経営管理士（国土交通大臣登録試験）。実施団体：一般社団法人賃貸不動産経営管理士協議会。

## 結論・追加数・除外理由

問題追加は **0問**。既存の資格判断台帳 `lib/qualifications/catalog.ts` に `chintai` を `permission-required` として登録し、未公開のまま保持する。問題本文・選択肢・解説・図版は収録しない。

[公式の過去の試験問題一覧](https://www.chintaikanrishi.jp/exam/past)には、次の使用条件が掲載されている。

> 試験問題を書籍やWebサイト、アプリ等に使用する際は、著作物使用許諾申請書をご提出していただく必要がございます。

同ページは申請書を希望する場合の問い合わせ先も案内している。これは「転載・複製を一律に禁止」という表示ではなく、使用に申請を必要とする条件である。本作業では利用許諾の取得記録を確認できないため、無許諾で本文を収録せず、対象100問をすべて収録対象から除外した。許諾取得を推定せず、公式PDFの公開自体を転載の許可として扱わない。許諾の問い合わせ・申請の送信は実施していない。

## 対象回と公式根拠

対象回は公式一覧の先頭2件で決定した。令和8年度を推測で採用していない。回数はそれぞれの公式正解番号表の表題で確認した。

| 対象回 | 実施日 | 問題・正答の根拠 | 公式問題数 | 追加問数 | 除外問数 |
| --- | --- | --- | ---: | ---: | ---: |
| 令和7年度（第13回） | 2025-11-16 | [問題PDF](https://www.chintaikanrishi.jp/assets/common/else/past_question_2025.pdf)・[正解番号表PDF](https://www.chintaikanrishi.jp/assets/common/else/past_answer_2025.pdf) | 50 | 0 | 50 |
| 令和6年度（第12回） | 2024-11-17 | [問題PDF](https://www.chintaikanrishi.jp/assets/common/else/past_question_2024.pdf)・[正解番号表PDF](https://www.chintaikanrishi.jp/assets/common/else/past_answer_2024.pdf) | 50 | 0 | 50 |
| 合計 | | | 100 | 0 | 100 |

両問題PDFの表紙は四肢択一50問と明示しており、末尾の問50と公式正解番号表の問1〜50を確認した。令和7年度は表紙を含め28ページ、令和6年度は29ページ。公式には全問の問題と正答が公開されており、非公開問題が理由の除外ではない。

令和7年度の問9は公式正解番号表で全解答正解とされ、正解番号欄は「-」。将来許諾を取得して収録する際にも単一の正解番号を捏造しない。法令基準日は問題PDF表紙の注意事項(5)により、令和7年度が2025-04-01、令和6年度が2024-04-01。収録再開時には出題時点の法令に基づく旨を各問・解説で明示する。

## 作業前の重複確認

作業開始時の作業ツリーはクリーン。資格登録の変更前に以下を確認した。

- ローカルの `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` に資格名・`chintai`・公式ドメイン等の既存成果なし。
- `git fetch origin --prune` 成功後、`origin/claude/*` 96ブランチ、`origin/codex/*` 263ブランチを確認。`origin/qual/*` は0ブランチ。合計359ブランチの名前にも対象資格の一致なし。
- 全359ブランチの上記3箇所と `data/qualification-staging` を `git ls-tree -r` で調べ、パスの一致なし。異なる内容のblob計4,168件を `git cat-file --batch` で読み、資格名・`chintai`・`chintaikanrishi` 等の一致なし。同資格・同回の既存成果は検出されなかった。

## 既存方式と今回の変更範囲

`data/questions/takken` の年度別ファイルと集約用 `index.ts`、問題レジストリ、資格台帳、`data/exam-library/official-catalog.json`、公開資格一覧とルーティングを確認した。

既存の許諾待ち資格（行政書士など）と同じく、資格台帳のみを `permission-required` で登録し、`examCode` と問題レジストリ登録・公開ルート・問題ライブラリ登録は追加しない。`app/qualifications/page.tsx` と `lib/home/home-directory.ts` の既存の `live` 判定により公開一覧には掲載されない。利用可能な過去問がない状態で公開導線を作らない。

許諾が必要なため問題データのステージング自体も作成していない。全問の原文・全選択肢解説・必要図版・各問の正答照合は収録再開時の残作業であり、完了したとは扱わない。類題・生成問題による代替も行わない。公開可能な全問セットの完成ではなく、指定の収録除外条件に従った許諾待ち登録と監査を今回の成果とする。

## 検証・独立レビュー

- `pnpm install`：成功。
- `pnpm validate:questions`：成功。26,444問、失敗0、既存警告16,808件。今回の追加問題は0問。
- `pnpm typecheck`：既定の約2GBヒープ上限でメモリ不足（終了134）。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` の再実行は終了0で成功。
- `pnpm test __tests__/lib/home-directory.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/seo/qualification-coverage-copy.test.tsx __tests__/exam-library-coverage.test.ts`：5ファイル・1,094テスト成功。
- `pnpm test __tests__/admin/exam-usage-fetch.test.ts __tests__/lib/study-presence.test.ts`：2ファイル・30テスト成功。関連テストは計7ファイル・1,124件成功。
- `pnpm build`・デプロイ：実施していない。
- 指定の別Codex（`codex exec -m gpt-6-astra -c model_reasoning_effort=medium`、読み取り専用）による初回独立レビュー：PASS、修正必須の指摘なし。公式一覧・4PDF・回数・問9の扱い・使用条件・未公開維持・359ブランチの4,168blobの重複検索を独自に確認。レビュアーからoriginへの直接照会は失敗しており、fetch成功の独立確認と型チェック再実行の終了結果は未確認という制限が付いた。fetchは本作業側で成功を確認済み。
- 検証結果を確定して報告書に反映後、同じ指定モデルを新たに起動して最終再レビュー：**PASS、修正必須の指摘なし**。差分・報告書・公式根拠・保持済みリモート追跡ブランチの重複なし・検証ログを再確認した。型チェックの終了0は本作業側が取得した実行結果に基づく評価で、originの最新状態と過去のfetch成功そのものは独立確認の対象外という制限を記録する。
