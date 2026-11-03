# 高圧ガス製造保安責任者 甲種機械・乙種機械 最新2回の収録監査

確認日：2026-11-03 UTC。TASK slug：`khk-kikai`。作者作業の結果であり、独立レビューは監督役の担当。

## 対象回と公式根拠

対象は**令和7年度（2025年度）・令和6年度（2024年度）の国家試験**。講習後の技術検定とは区別した。

[国家試験の公式申込案内](https://www.khk.or.jp/qualification/qualification_application/)に令和8年度の試験日が**2026年11月8日**とあり、確認日時点では実施前である。[正解答・試験問題の公式公表ページ](https://shiken.khk.or.jp/shiken.html)は令和8年度用の見出しに切り替わっているが、問題・正答のリンクはまだない。見出しだけから令和8年度を直近の過去問と判定していない。通常公開URLに残る令和7・6年度の問題冊子と正答・解答例の年度・資格名を確認し、この2年度を対象にした。確認したページ本文の抜粋とURLは `official-verification.json` に保存。

## 収録数と未公開設定

| 資格（別slug） | 年度 | 法令 | 保安管理技術 | 学識 | 計 |
| --- | --- | ---: | ---: | ---: | ---: |
| 甲種機械 `khk-kikai-kou` | 令和7 | 20 | 15 | 記述5 | 40 |
| 甲種機械 `khk-kikai-kou` | 令和6 | 20 | 15 | 記述5 | 40 |
| 乙種機械 `khk-kikai-otsu` | 令和7 | 20 | 15 | 択一15 | 50 |
| 乙種機械 `khk-kikai-otsu` | 令和6 | 20 | 15 | 択一15 | 50 |

**追加：甲種80問、乙種100問、合計180原問。除外・内容保留0問。** 択一170問は5肢×850肢分の独自解説を収録。組合せ問題はイ・ロ・ハ・ニの各記述の理由も別保存し、各選択肢が不適切な理由を示した。甲種学識10問は原問単位を維持し、独自の解答例・式・計算過程・確認事項を収録。小問を架空の択一問題へ置き換えていない。公式の小問別配点は不明なので、自動採点は行わない旨を明記した。

`data/qualification-staging/khk-kikai/` に資格別JSONを保存。全問 `publicAllowed=false`、`needsReview=true`。資格台帳は両資格を別項目の `ready-to-ingest` とし、公開用 `examCode` は未設定。公開問題レジストリ・EXAM_CONFIGS・試験資料カタログ・ルーティングには接続していない。型の `ExamCode` は公開レジストリ全体を駆動するため、未公開データの段階で拡張していない。将来の公開時に型・設定・登録と表示を統合する必要がある。

## 原本・正答・図の照合

- 公式問題12冊、択一正答2冊、甲種学識解答例2冊を取得し、PDF原本・抽出テキスト・SHA256を保存。全170問を公式表の甲種機械EX/EY・乙種機械FX/FY/FZ行と照合した。甲種化学の行とは区別した（例：令和6年度保安問7は甲種機械5、甲種化学1）。
- 記述10問の計算値・定性的要点を公式解答例と照合した。解説・解答文は独自作成で、公式例の全文転載ではない。出典URLは全180問に問題・正答の双方を保存。
- 問題文・選択肢はPDFのテキストから作成。全角英数字・括弧、改行、単位の上付き等を整理。旧PDFの日本語CIDフォントはPyMuPDFで抽出し、第三者サイトの転記や生成問題は使っていない。法令の共通設例は該当する各問の本文にも保持。法令の基準日は各年度4月1日とし、**出題時点の法令**と全80問に明記。
- 令和6年度乙種学識問9の数表は「σθ・σz」の五つの組をテキスト選択肢へ転記。令和6年度甲種学識問1の運転条件表と令和7年度甲種学識問5の計算用数表もテキストで保持。令和6年度甲種学識問4の分数は `σk=−4π²EI/(L²A)` に整形。
- 必要な入力原図は6点（令和6甲種学識問1・2・5、令和7甲種学識問2の2図・問4）を切り出し、`hasImage=true` と代替説明を設定。図の原本ページ・切出し矩形は `figures.json`。クリープ曲線の解答図1点は独自SVG。画像を含む問題も本文はテキストで収録。

## 取得できなかったPDF

**必要な公式PDFの未取得：なし（16/16冊取得）。** 次の別ホストのURLは404だったが、同名のPDFを `www.khk.or.jp` から通常取得できたため、問題の欠落はない。

- 404：<https://shiken.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACFZ-W.pdf>
- 取得成功：<https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACFZ-W.pdf>

ログイン・CAPTCHA・ボット拒否の迂回はしていない。指定の保管ブランチ `origin/ops/source-pdfs-20261104` はこの作業環境のローカル参照には存在せず、`git ls-tree` は `Not a valid object name` となった。全原本を直接取得できたためフォールバックは使用していない。fetchは実施していない。

## 転載・複製禁止文言とオーナー決定

[公式「ご利用条件について」](https://www.khk.or.jp/condition.html)の「1. 著作権について」：

> 著作権法により認められる「私的使用」や「引用」の場合を除き、KHK又は原著作者、その他の権利者の許諾なく使用、転載、複製、再配布、再出版、販売、貸与等を行う行為を禁止します。

ユーザーの明示したオーナー決定に従って収録し、この文言を停止理由とはしていない。資格台帳・データの出典表示は、協会から転載許諾を取得したと主張するものではない。

## 重複調査

作業前の `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library`、`data/qualification-staging` に同資格の成果なし。利用可能なローカルorigin参照は `origin/main`、`origin/claude/jolly-goodall-wlxnzx`、`origin/ops/cloud-qual-brief`。main及びclaudeのツリーも読み取り調査し、同資格の成果なし。`qual/*`・`codex/*` のローカルorigin参照はなし。fetchしていないため、未取得のリモートブランチの有無までは保証しない。

## 検証

- `pnpm install --store-dir /tmp/khk-pnpm-store`：成功。Corepackの既定キャッシュが書込不可だったため `COREPACK_HOME=/tmp/khk-corepack` を使用。依存定義・ロックファイル変更なし。Prisma Client生成成功。
- `pnpm validate:questions`：成功。追加したステージング専用検証で180問、欠番・重複、未公開設定、正答170問、記述解答例10問、全肢解説、法令設例、原本16冊のSHA256、図の存在・原典を検証。既存データ26,444問も `ok=26444 fail=0 warn=16808`。警告は既存問題に対するもの。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。
- `pnpm exec vitest run __tests__/questions/khk-kikai-staging.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/lib/home-directory.test.ts`：**4ファイル、1,092テスト成功**。新規9テストは未公開の隔離、原問数、資格間正答の相違、共通設例、数表転記、記述式及び誤った正答・公開設定・設例欠落を拒否することを確認。
- `git diff --check`：成功。

独立レビュー・commit・pushは監督役へ引き渡す。codexの入れ子起動、git fetch/commit/push、pnpm build、デプロイ、PR作成はいずれも行っていない。

## 変更ファイル

- `data/qualification-staging/khk-kikai/`：資格別問題JSON2ファイル、未公開index、manifest、公式出典・正答・公式確認記録、PDF16冊と抽出テキスト16件、入力図6点と解答図1点、図の出典記録、README。
- `lib/qualifications/catalog.ts`：未公開の甲種・乙種を別項目として登録。
- `scripts/validate-khk-kikai.ts`、`scripts/validate-questions.ts`：未公開データも指定検証コマンドの検証対象に追加。
- `__tests__/questions/khk-kikai-staging.test.ts`：収録・隔離・破損検出テスト。
- `reports/cloud-khk-kikai-latest2.md`：本報告。

## 公式PDF一覧とSHA256

原本は `data/qualification-staging/khk-kikai/sources/`。下記のページは表紙を含むPDF物理ページ数。

| ファイル | 出典URL | ページ数 | SHA256 |
| --- | --- | ---: | --- |
| `R6ACEX-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACEX-W.pdf) | 8 | `f2ae35df5cc1d9f09dabd2c717198372c064747f614d638a090b25b5695cf4e5` |
| `R6ACEY-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACEY-W.pdf) | 7 | `998f32a42e12631763db6106e58a84b9cea9f0f9696e4dcd2e9e56cf50aec41e` |
| `R6ACEZ-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACEZ-W.pdf) | 13 | `edaf7c3185b7ad9713136252cfbcb5858a650c5fc9d9b8ce97f699365b6dd5c5` |
| `R6ACFX-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACFX-W.pdf) | 8 | `4d92bc2c56b27e4c51316525533282c81419b677866f5a71fce3c96ea4299bf8` |
| `R6ACFY-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACFY-W.pdf) | 7 | `9818fb951882d962edf1daa7604ad34fbe20d1f558254111dabae98bba85daab` |
| `R6ACFZ-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACFZ-W.pdf) | 7 | `866890d02650c5b0d44a135b31c176141456e58023e6a5c9b0f773dfa300ef93` |
| `R6fy_02.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_02.pdf) | 6 | `ff2aa67dfbfe51cfcffd03a7f86c62f16b7493512cca04b98f590c851f165e4c` |
| `R6fy_kaitou.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_kaitou.pdf) | 1 | `0fd73548590e9cc8da07c84bbc088ed8aac224275b1d5869706fe39433e6cc7b` |
| `R7ACEX-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACEX-W.pdf) | 8 | `922054602ebbef0e1352b124eb3ff3b415b616d00161081df8b8e7f0030bccf1` |
| `R7ACEY-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACEY-W.pdf) | 7 | `8aba31180e72df63d4e99dc881d8500e44f2a20108d4c1307697c63d0a62a693` |
| `R7ACEZ-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACEZ-W.pdf) | 7 | `18d7eb473d70fcb6900d80b30f4dec5ac773edf7f037da68834bca7b314aee04` |
| `R7ACFX-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACFX-W.pdf) | 8 | `d0536d4ec21bc6f13d7e73843d07d99c3f00fea5e3e133b20da081aae1b3fe76` |
| `R7ACFY-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACFY-W.pdf) | 6 | `0b3da5a4c074e31affdf3ff40e52be4f1c727cc8a7538db5032be6a9f5cc432d` |
| `R7ACFZ-W.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACFZ-W.pdf) | 6 | `b6a8f797f2828b37ee481b874684aa9a3fe8ab1375c59c9af36dde908ef06912` |
| `R7fy_kaitou.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7fy_kaitou.pdf) | 1 | `3de6b459e2639f352ca27f31d413d7bfc6ce6bcb467dbde9d40dd5c8b594c660` |
| `R7fy_kaitourei_2.pdf` | [公式PDF](https://www.khk.or.jp/Portals/0/khk/exam/2025/1219/R7fy_kaitourei_2.pdf) | 5 | `1200bed576ebca2b8af2da7317941dc5614132989cf02c16d2466e89c2b4c0d0` |

## 独立レビューFAIL指摘の修正（2026-11-03 UTC）

`reports/cloud-khk-kikai-review.md` の3件を修正した。以下は作者による修正・再検証の記録であり、独立した再レビューの判定ではない。

1. **令和7年度・乙種機械・学識問1「ロ」**：`khk-kikai-otsu/questions.json` の問題文を `kg・m²/s2` から **`kg・m²/s²`** に修正。[公式問題PDF・物理2ページ](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACFZ-W.pdf#page=2)の指数表記に合わせた。
2. **令和6年度・甲種機械・学識問5**：同梱の[公式問題PDF・物理8ページ](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACEZ-W.pdf#page=8)から `figures/2024-gakushiki-q5-p8.png` を再切り出し。矩形を `[60, 30, 535, 730]` から **`[45, 30, 535, 730]`** に広げ、左縦軸ラベル **8ⁿ** 全体が余白付きで入ることを目視確認した。`figures.json` の矩形も更新した。
3. **令和6年度・甲種機械・学識問1(1)**：同梱の[公式解答例 R6fy_02.pdf・物理1ページ](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_02.pdf#page=1)の解答図を矩形 `[90, 145, 420, 370]` で切り出し、`figures/2024-gakushiki-q1-answer-p1.png` として追加した。`khk-kikai-kou/questions.json` の `answerImageUrls`・`answerImageAltTexts` に接続し、出典表示と `figures.json` に原典・ページ・矩形・解答図の用途を記録した。`modelAnswer`・`answer`・`explanation` の小問(1)を、解答図への参照、左右端の油・冷却水の入口／出口、温度記号と値、互いに逆向きの流れを説明する文章に更新した。図の未知数 `t_s2` は小問(3)で約301 Kと求まることも明記した。

入力図6点・独自解答SVG1点に公式解答図1点を加え、図は計8点。READMEの図一覧も更新した。

### 修正後の再検証

コマンド実行には `COREPACK_HOME=/tmp/khk-corepack` を使用した。

- 専用validate：`pnpm exec tsx -e 'import { validateKhkKikai } from "./scripts/validate-khk-kikai"; validateKhkKikai();'`：**成功（終了コード0）**。未公開候補180問・公式正答170問・記述式10問・公式PDF16冊を検証。ログ：`/tmp/khk-failfix-validate.log`。
- `pnpm validate:questions`：**成功（終了コード0）**。上記ステージング検証と、既存問題 `ok=26444 fail=0 warn=16808`。警告数は前回と同じ。ログ：`/tmp/khk-failfix-questions.log`。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：**成功（終了コード0）**。ログ：`/tmp/khk-failfix-typecheck.log`。
- `pnpm exec vitest run __tests__/questions/khk-kikai-staging.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/lib/home-directory.test.ts`：**4ファイル・1,092テスト成功（終了コード0）**。ログ：`/tmp/khk-failfix-tests.log`。
- 画像2点を目視確認し、切れのない縦軸ラベル、解答図の流向・温度・全ラベルを確認した。両画像が記録した原本ページ・矩形からの2倍解像度再描画と画素単位で一致することも確認。単位表記、解答図参照、`modelAnswer` と `answer` の一致、`explanation` への反映を確認した。

本修正ではcodexコマンドを起動せず、gitコマンドも一切実行せず、作業ツリーを直接編集した。
