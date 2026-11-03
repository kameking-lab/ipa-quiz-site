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

## 国内旅行業務取扱管理者

対象回: **直近2回の公表資料は未確定**。年度を推測して確定値にしない。

- [公式受験案内](https://www.anta.or.jp/exam/shiken/annai.html) の公式ドメイン検索結果には令和8年度（2026年度）、CBT実施期間9月3日〜25日、10月2日の「試験問題（出題例）」掲載予定を確認。
- [令和7年度公式PDFの検索結果](https://www.anta.or.jp/exam/shiken/pdf/R07_mondairei.pdf) は「試験問題（出題例）」という表題。ただし直接取得はメンテナンス画面に転送され、PDFを確認できなかった。
- [公式サイト](https://www.anta.or.jp/)・受験案内・過去問候補URLは[メンテナンス画面](https://www.anta.or.jp/maintenance.html)に転送。令和8年度合格証書を10月30日付で発送した旨は確認できたが、直近2回の問題・正答の一覧は取得できない。

追加 **0問**。実際に出題された全問の公式公開を確認できず、出題例を実出題として扱わない。転載禁止の有無も未確定であり、禁止を確認したとは記録しない。本文・選択肢・正答・解説・図を収録せず、既存の `terms-review-required` で未公開の調査台帳に追加。年度・正答PDFのURLを推測して作成せず、古い公開年度への置換もしない。メンテナンス終了後の公式原本再確認が必要。

検証（国内旅行業務取扱管理者）: `pnpm validate:questions` 成功（26,444問、fail=0、既存警告16,808件）、`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` 成功、上記関連2ファイル・13テスト成功。

## 総合旅行業務取扱管理者

対象: **令和7年度（2025年度）・令和6年度（2024年度）**。暦年から推測せず、公式公開一覧の最新2回を採用。令和8年度というナビゲーション表示はあるが、問題・正解の公開一覧には掲載されていないため対象にしない。

- [公式公開一覧（更新日2026-08-26）](https://www.jata-net.or.jp/seminar/page-41637/exam_xaminationquestion/) は令和7〜3年度を掲載。
- [令和7年度問題・正解（更新日2026-10-23）](https://www.jata-net.or.jp/seminar/page-41637/exam_xaminationquestion/r7_question/)
- [令和6年度問題・正解（更新日2026-10-23）](https://www.jata-net.or.jp/seminar/page-41637/exam_xaminationquestion/r6_question/)

各年度ページには旅行業法令・約款・国内旅行実務・海外旅行実務・資料編・公式正解表へのリンクがある。同ページは試験実施当時の法令等のまま掲載している旨も説明している。

追加 **0問**。公式一覧・年度別ページのフッターに文章・データ等の無断転写・複製禁止が明記されているため、指定の除外条件に従い2年度の本文を資格単位で除外。PDFを転記・保存せず、正答・独自解説・図も収録しない。既存の `permission-required` で未公開台帳に追加。

## 追加数と公開状態

| 資格 | 対象回 | 追加問数 | 未公開状態・理由 |
| --- | --- | ---: | --- |
| 全国通訳案内士（筆記） | 2026・2025年度 | 0 | permission-required: 全問非公開・無断複製等への制限 |
| 国内旅行業務取扱管理者 | 直近2回未確定 | 0 | terms-review-required: メンテナンスで原本・一覧未確認、出題例を実出題として扱わない |
| 総合旅行業務取扱管理者 | 令和7・6年度 | 0 | permission-required: 無断転写・複製禁止 |

本文の収録がないため、各問の出典・正答照合・法令時点の解説・hasImageは該当なし。公開用データに代替問題・類題を入れていない。監査と台帳登録を資格ごとに完了してから個別コミット・作業ブランチへのpushを行う。mainへのpush、PR作成、build、デプロイ、Vercel操作は実施しない。

検証（総合旅行業務取扱管理者・最終状態）: `pnpm validate:questions` 成功（26,444問、fail=0、既存警告16,808件）、`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` 成功、上記関連2ファイル・13テスト成功。`git diff --check` 成功。
