# 2級建築施工管理技術検定（第一次検定）直近2回の監査

確認日：2026-11-03（UTC）

## 結果

**転載禁止の明記により収録対象から除外。追加0問・公開0問・除外100問。**

依頼の「公式サイト・PDFに転載や複製の禁止が明記されている資格は、問題本文を収録せず理由を報告」に従った。全問非公開による除外ではない。公式には対象2回の問題と正答肢が公開されている。

資格台帳に `sekou-kenchiku2` を既存の1級建築と同じ `permission-required` として記録した。問題データや図版は保存せず、演習用の `examCode` は登録しない。これは許諾待ちの未公開メタデータであり、問題のステージング完了・公開準備完了を意味しない。

## 対象回と公式根拠

回の選定根拠は、一般財団法人建設業振興基金の[過去の受検状況・検定問題・合格基準](https://www.fcip-shiken.jp/about/)にある「検定問題・正答肢」の建築施工管理技術検定「2級」「第一次検定」欄。前期は令和8年度、後期は令和7年度がリンクされていることを確認した。年度や回をファイル名から推測していない。

| 対象回 | 実施日（公式PDF表紙） | 公式問題・正答肢PDF | 出題数 | 追加数 | 除外数 |
| --- | --- | --- | ---: | ---: | ---: |
| 令和8年度前期 第一次検定 | 2026-06-14 | [令和8年度前期](https://www.fcip-shiken.jp/pdf/r08_2kgz_mondai.pdf) | 50 | 0 | 50 |
| 令和7年度後期 第一次検定 | 2025-11-09 | [令和7年度後期](https://www.fcip-shiken.jp/pdf/r07_2kg_mondai.pdf) | 50 | 0 | 50 |
| 合計 | | | 100 | 0 | 100 |

両回の表紙にNo.1～50の構成が示されている。出題50問と受検者が解答する40問を区別した。No.38～42は五肢択一、その他は四肢択一。正答肢は各PDFの末尾に付属する（令和7年度後期の表記は「正答肢（案）」）。転載条件の段階で除外したため、全100問の原文・正答・解説の収録照合を実施済みとはしない。

## 除外理由

[公式の公開一覧ページ](https://www.fcip-shiken.jp/about/)のフッターに、次の明示がある。

> 本サイトに掲載されている記事・写真・図表などの転載を禁じます。

[公式トップページ](https://www.fcip-shiken.jp/)にも同じ表示がある。PDFの閲覧提供をWeb問題集への転載許諾として扱わず、依頼の除外条件を適用した。PDF自体に同じ禁止文があると主張するものではない。

問題本文・選択肢・正答表・原図のリポジトリへの転載は行っていない。類題・生成問題への置き換えも行っていない。全選択肢解説、`hasImage` 付き図版、各問の出典URL、出題時点法令の注記は、収録対象が0問のため作成していない。将来の許諾取得後には全項目の検収が必要で、今回の除外監査を公開可の根拠にできない。

## 着手前の重複確認

- 作業ブランチ：`claude/blissful-rubin-pks6ce`。開始時の作業ツリーに変更なし。
- ローカルの `data/questions`・`lib/qualifications/catalog.ts`・`data/exam-library` と `data/qualification-staging` を検索し、この資格・対象回の既存成果なし。
- `git fetch origin '+refs/heads/claude/*:refs/remotes/origin/claude/*' '+refs/heads/qual/*:refs/remotes/origin/qual/*' '+refs/heads/codex/*:refs/remotes/origin/codex/*' --prune` を実行。
- originの359ブランチ（`claude/*` 96、`codex/*` 263、`qual/*` 0）について、同じ4箇所のツリー名とテキスト内容を検査。異なるテキストblob 3,867個を照合し、読み取り失敗0、対象資格・対象回の一致0。
- 検索語：`2級建築`、`２級建築`、`2 級 建築施工`、`sekou-kenchiku2`、`kenchiku2`、`2kenchiku`、対象PDFの `r08_2kgz`・`r07_2kg` 等。ファイル名の `kenchiku`・`建築` も検査した。
- 別資格の一級建築士・建築設備士のファイル名が一致したが、建築施工管理技術検定とは異なるため重複対象外。既存の1級建築施工管理は `permission-required` のメタデータのみで、本資格の成果ではない。

## 既存の追加方式と今回の適用

- 類似の `data/questions/civil2/index.ts` は年度別JSONを `Question` へ変換し、問題URL・正答URL・全肢解説・画像有無を保持している。
- `data/questions/index.ts` は `isExamPublished()` によって公開データを登録する。判定元は `lib/qualifications/catalog.ts` の `status: "live"`。
- `app/qualifications/page.tsx` の公開一覧も `live` のみを表示する。
- 演習ルーティングは `app/[exam]/page.tsx` 等と試験定義に依存する。本資格の試験コード・ルート・問題を登録せず、公開入口を追加しない。
- `data/exam-library/official-catalog.json` は別の公表試験カタログとして取り込まれるため、ここにも回・問題を追加しない。
- 既存の `sekou-kenchiku1` と同様、許諾待ち資格は `examCode` を持たない台帳メタデータだけで管理する。今回もこの方式を適用した。

## 検証・独立レビュー

- `pnpm install`：成功（pnpm 10.33.0、Prisma Client生成成功）。
- `pnpm validate:questions`：成功。26,444問、fail=0、warn=16,808。警告は既存データに関するもので、今回の問題追加は0問。
- `pnpm typecheck`：成功。既定のNodeヒープ上限で初回はメモリ不足（exit 134）。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` で再実行し、exit 0。
- 関連テスト：`pnpm exec vitest run __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/seo/qualification-coverage-copy.test.tsx __tests__/exam-library-coverage.test.ts`：4ファイル・1,083テスト成功。初回の `pnpm test -- ...` は意図した絞り込みが効かず全体を開始したため中断し、上記コマンドで対象を明示して実行した。
- 公開防止の実データ確認：台帳内の同slugは1件、`permission-required`、`examCode` なし、`live` 一覧に含まれないことを確認（成功）。`git diff --check` も成功。
- 指定の独立レビュー：`codex exec -m gpt-6-astra -c model_reasoning_effort=medium --sandbox read-only` で別Codexを起動。初回結果は **PASS**（実質的な不具合の指摘0）。除外条件、既存方式との一貫性、非公開、追加・除外数、重複監査記録を確認したとの回答。初回時点で未確定だった型チェックと関連テストの結果を本レポートに反映した。
- 2回目のレビュー：実装は **PASS**。レポートの「コミットもスーパーバイザに委任する」への変更提案があったが、元依頼が委任したのはpushのみのため、この提案は採用しない。下記に主担当とレビュアーの役割を明記した。また型チェックの終了コード・ヒープ設定をログだけでは確認できないとの指摘に対応し、Pythonの `subprocess.run` で再実行した。結果JSONは `{"command":["pnpm","typecheck"],"NODE_OPTIONS":"--max-old-space-size=8192","exitCode":0}`。このJSONと対応ログを最終レビュアーへ提供する。
- 最終再レビュー：同じ指定コマンドで新規の別Codexを起動し、上記の明確化と検証証跡を確認。結果は **最終PASS**。「重大な問題・修正必須の指摘はありません」「前回指摘の解消を確認しました」と回答した。公式一覧の転載禁止・対象回、非公開、型チェックの設定とexit 0、問題検証・関連テスト・重複監査の数値、コミットとpushの役割分担の整合を確認済みとの回答。未解消の指摘0。

`pnpm build`・デプロイ・Vercel・PR作成・mainへのpushは実施しない。元依頼の「資格ごとにコミット」と「pushは現在のclaude/ブランチのみ(スーパーバイザが行う)」に従い、主担当が資格単位のコミットを現在のclaudeブランチに作成し、pushはスーパーバイザに委ねる。独立レビュアーは読み取り専用で、コミット・pushを実行しない。
