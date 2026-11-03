# 公認心理師：直近2回の公式資料調査・第8・9回取り込み監査

確認日：2026-11-03。資格コード・URL slug：`shinrishi`。

## 対象回の確認

公式の[合格発表一覧](https://www.jccpp.or.jp/shiken/shikenjoho/)に掲載された直近2回を確認した。ファイル名の `09` から回次を推定していない。第8回にも同じ末尾のファイル名が使われているため、掲載ページの見出し・PDF表紙・正答表の回次を根拠に区別した。

| 回 | 実施日 | 公式掲載ページ | 今回追加 |
| --- | --- | --- | --- |
| 第9回 | 2026-03-01 | https://www.jccpp.or.jp/shiken/shikenjoho/dai9.html | 午前77問＋午後77問＝154問 |
| 第8回 | 2025-03-02 | https://www.jccpp.or.jp/shiken/shikenjoho/dai8.html | 午前77問（午後77問は作業中） |

第10回は公式サイト上で試験概要・申込みを案内している段階で、合格発表一覧の最新公表問題は第9回であった。

### 第9回の一次資料

- 午前問題：https://www.jccpp.or.jp/files/items/222/File/04_gokaku_happyo_09.pdf
- 午後問題：https://www.jccpp.or.jp/files/items/222/File/05_gokaku_happyo_09pm.pdf
- 合格基準・正答：https://www.jccpp.or.jp/files/items/222/File/03_gokaku_happyo_09.pdf

### 第8回の一次資料

- 午前問題：https://www.jccpp.or.jp/files/items/132/File/04_gokaku_happyo_09.pdf
- 午後問題：https://www.jccpp.or.jp/files/items/132/File/05_gokaku_happyo_09.pdf
- 合格基準・正答：https://www.jccpp.or.jp/files/items/132/File/03_gokaku_happyo_09.pdf

## 追加データと照合

`data/questions/shinrishi/2026-annual.json` に第9回の全154原問を格納。事例を含めて本文・4肢または5肢をテキストで保存した。通し番号は午前1〜77、午後78〜154を保持する。生成問題・類題・冊子冒頭の解答方法の例題は追加していない。

各問に問題PDFのページ付きURL、正答PDF URL、出典表記、実施日、独自の学習用解説を保存した。内部キーはア〜オだが既存の番号表示を登録し、画面上は1〜5となる。一般解説は各問固有の内容を独自に執筆し、`explanationCoverage: official-summary` として全肢解説とは区別した。公開前候補に限ってこの一般解説を検証可能にし、公開後には既存の外部資格と同じ全肢解説要件が適用される。

本文と選択肢は、公式PDFの文字層から取り込み、組版用の改行・空白を整理した。問46のt検定の数値表記は原本表示で確認し、抽出時に入る数値間の余分な空白を補正した。問27はベクターで描かれた横の区切り線をテキストの `──` で保持した。午前・午後の問題ページ全体の表示を確認し、画像併用が必要な事例図・表はなかったため、全154問を `hasImage: false` とした。

`scripts/audit-shinrishi.py` は公式PDFを再取得可能で、本文・全選択肢を空白と問27の区切り線を除いて照合し、公式正答表を独立に解析して正答・選択数・出典ページを照合する。全154問が一致した。資料のSHA-256、各問のページ・公式正答・原文正規化ハッシュは `reports/shinrishi-9-source-audit.json` に記録した。

複数選択問題は問54〜58、129〜135、154の計13問。正答配列と `requiredSelections: 2` を保存し、片方だけの選択を不正解とする既存の採点方式を利用した。第9回の正答表には全員正解・採点除外・いずれか一肢を正解とする特例の記載はなく、141問が単一正答、13問が2肢選択である。

## 登録・公開制御

`seishin`・`shakai`・`kangoshi` の問題データ、資格台帳、同期レジストリ、遅延ローダー、試験設定、番号表示、資格一覧と動的ルートの接続方法を確認した。既存の `isExamPublished` と資格台帳を使用し、`status: terms-review-required` に設定した。

候補データは検証・レビュー用に直接取得できるが、公開用エクスポートは空配列。同期レジストリ、非同期ローダー、公開資格コード一覧、トップページの資格一覧には出ない。`/[exam]`・`/[exam]/[yearSeason]` 等の既存ルートは公開問題の存在を確認するため、新しい公開ルートは開放していない。`JCCPP-attributed` は出典識別のための内部値であり、転載許諾取得済みを意味しない。

## 除外と残作業

- 第9回：除外0問。全154問をステージングに保存した。公開演習への掲載は154問とも保留。
- 第8回：午前の問1〜77をステージングに保存。午後の問78〜154は作業中。
- 公開判断：転載条件・必要な手続の確認、および既存の公開品質要件に合わせた全肢解説の追加が残る。台帳をliveに変更していない。

## 検証

- `pnpm install`：成功（Prisma Client生成を含む）。
- `pnpm validate:questions`：全26,598問、成功26,598・エラー0。既存分を含む警告16,832件。今回の24件は一般解説が50文字未満という長さ警告であり、原文・正答の不一致ではない。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。既定の約2GBヒープではメモリ不足となったため、実行時のヒープ上限を増やして再実行した。
- `python scripts/audit-shinrishi.py --source-dir /tmp/shinrishi`：154問の原文・選択肢・公式正答・必要選択数・出典ページの照合成功。
- `git -c core.whitespace=cr-at-eol diff --check`：成功（既存ファイルのCRLFを維持）。
- `pnpm build` とデプロイは実施していない。
- `pnpm exec vitest run __tests__/questions/shinrishi-staging.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/unit/exam-source-label.test.ts __tests__/questions/qualification-expansion.test.ts`：4ファイル・1,077テスト成功。保存範囲、原問の4/5肢、公式正答、複数選択の採点、回次表示、公開台帳、同期・非同期プールからの除外を検証した。

## 第8回の追加（午前完了）

`data/questions/shinrishi/2025-annual.json` に午前77問を追加した。本文・選択肢は公式PDFの文字層から取得し、組版用の空白を整理したテキストで保存。問題ページ（PDF 5〜52ページ）の表示も確認し、画像を必要とする図表はなかった。全問に独自の一般解説（`official-summary`）、実施日、問題ページURL、公式正答表URLを付けた。午前の4肢問題は問50〜54・74、2肢選択は問55〜58・75〜77。正答表の特例はない。

監査を `--round 8 --session am` に対応させ、77問の本文・全選択肢・公式正答・選択数・出典ページの一致を確認。証跡は `reports/shinrishi-8-source-audit.json` に保存した。第9回の監査方式と公開制御を維持し、第8回も公開プールから除外した。

午前追加時の検証：`pnpm validate:questions` は26,675問成功・エラー0・既存警告16,832件（第8回の追加警告0件）。typecheck・関連4ファイルのテストも成功。build・デプロイ・PR作成は実施しない。
