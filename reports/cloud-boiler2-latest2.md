# 2級ボイラー技士：直近2公表回の追加監査

確認日：2026-11-03。資格コード：`boiler2`。公開状態：**未公開（ステージング）**。

## 対象回を決めた一次資料

[安全衛生技術試験協会・公表試験問題一覧](https://www.exam.or.jp/lckohyo/) の「二級ボイラー技士」行で、以下の2掲載回とリンク先を確認した。既存の衛生管理者データの年度やPDFのURLから回を推測していない。

| 公表回 | 一覧に示された実施期間 | 公式問題・正答PDF | 収録 |
| --- | --- | --- | --- |
| 令和8年10月掲載 | 令和8年1～6月 | [LC20262103.pdf](https://www.exam.or.jp/wp-content/uploads/2026/10/LC20262103.pdf) | 問1～40、40問 |
| 令和8年4月掲載 | 令和7年7～12月 | [LC20260403.pdf](https://www.exam.or.jp/wp-content/uploads/2026/09/LC20260403.pdf) | 問1～40、40問 |

4月掲載のリンク先は `/2026/09/` にあるが、これは公表回を9月とする根拠ではない。公式一覧の表示を採用した。両PDFは表紙込み20ページ。公式一覧は、選択肢番号の前に付けた○が正答であると明記している。問題と正答は同じPDFにある。

取得したPDFのSHA-256：

- 4月：`6a057322b1b19b5816667b23dac2ac2d5b1cc6dcca4610e2c06c203f4b5cce3a`
- 10月：`824e0ed7cdf19062561d86e0db9853c2b2d9749c83e3cfd2ca7ac43433fd5b7a`

## 収録・照合

追加80問、400選択肢。対象回からの除外は**0問**。類題・生成問題は追加していない。公式の全80問・選択肢・○印をPDFテキストと照合し、全ページの画像でも図版の有無を確認した。

`data/questions/boiler2/2026-april.json` と `2026-october.json` に本文・5選択肢・公式番号・正答・出典・独自解説を保存した。`sourcePdfUrl` と `sourceAnswerUrl` は各問に上記公式PDFを設定。内部のア～オは公式(1)～(5)に順番で対応し、表示は既存の衛生管理者と同様に番号表記とする。

図・写真を必要とする問題はない。語句組合せの列見出し・各行と、Ａ～Ｄの記述はテキストで保持し、全問 `hasImage: false`。4月問19の薬剤の組合せ、問28・33、10月問1・26・29・35・39の空欄と列見出しも保持した。PDFのベクターで描かれた説明用空欄は「□」で表し、Ａ～Ｃの文字はそのまま保存。ページの折返し、字間、ページ番号、ルビのみ表示用に整理した。数値・単位・問題自体の不適切な記述を、正しい内容に書き換えていない。

正答は公式○印のみを根拠とする。独自解説は設問の否定形や組合せ条件に従って記述し、公式正答と整合させた。各肢にも判定と問題ごとの判断根拠を付けた。公式解説であるという表示はしていない。

`__tests__/fixtures/boiler2/` は `pdftotext -layout` による公式PDFの抽出テキスト（○印付き）。再取得は上記URLとハッシュで確認できる。`__tests__/questions/boiler2-latest2.test.ts` はこの独立した抽出テキストと、本文・全選択肢・全正答を照合する。比較時はレイアウト上の空白と復元した□を除く。

公式一覧には2026年1月1日以降施行の法令への非対応に関する注意書きがある。収録は各公表問題の正答に従うものであり、現在の実務用法令への更新を意味しない。

## 既存方式への組込み

- `eisei1`・`eisei2` と同じ、JSON＋`index.ts`、試験設定、同期レジストリ、遅延ローダー、資格台帳、表示ラベル、資格一覧用定義に登録。
- 同一年の2回を分離するため、公表年2026、4月=`spring`、10月=`autumn` とし、問番号とIDの衝突を防止。実施期間は上表のとおりで、公表年と実施年を混同しない。
- `QUALIFICATION_CATALOG` の状態を既存値 `ready-to-ingest` とし、`isExamPublished("boiler2")` はfalse。公開資格一覧、公開問題配列、遅延取得、公開ルートの利用可能試験判定から除外される。公開判断は変更していない。
- 検証用にはステージング80問を明示的に含め、非公開でも検証を省略しない。

## 検証結果

- `pnpm install`：成功（postinstallのPrisma生成も成功）。
- `pnpm validate:questions`：26,524問、ok=26,524、fail=0。既存データの警告16,808件あり。
- `pnpm validate:questions --exam=boiler2`：80問、ok=80、fail=0、warn=0。
- `pnpm exec vitest run __tests__/questions/boiler2-latest2.test.ts __tests__/questions/eisei1-two-publications.test.ts __tests__/questions/eisei2-two-publications.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/questions/qualification-expansion.test.ts`：5ファイル・1,082テスト成功。新資格の原文・正答全件照合、公開一覧・ホーム一覧・遅延ローダーからの除外、既存資格の回帰を含む。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。既定ヒープ上限の初回はメモリ不足で停止したため、上限を増やして実施。
- `git diff --check`：成功。

`pnpm build`、デプロイは実施していない。秘密値はレポート・データ・コミットに含めていない。
