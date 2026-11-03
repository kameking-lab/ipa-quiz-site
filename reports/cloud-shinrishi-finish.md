# 公認心理師（shinrishi）仕上げ報告

確認日：2026-11-03。新しい回は追加せず、既存の第8回・第9回のみを対象とした。

**結果：全308問・1,514肢のデータ整備と独立再レビューに合格。内容・管理・コードの未解決修正指摘0件。転載許可の記録が未確認のため、公開は全308問保留・公開0問。**

## 対象・一次資料・件数

| 対象回 | 実施日 | 午前 | 午後 | 計 | 公式掲載ページ |
| --- | --- | ---: | ---: | ---: | --- |
| 第8回 | 2025-03-02 | 77 | 77 | 154 | https://www.jccpp.or.jp/shiken/shikenjoho/dai8.html |
| 第9回 | 2026-03-01 | 77 | 77 | 154 | https://www.jccpp.or.jp/shiken/shikenjoho/dai9.html |
| 合計 | | 154 | 154 | 308 | |

- 第8回：[午前問題](https://www.jccpp.or.jp/files/items/132/File/04_gokaku_happyo_09.pdf)、[午後問題](https://www.jccpp.or.jp/files/items/132/File/05_gokaku_happyo_09.pdf)、[合格基準・正答](https://www.jccpp.or.jp/files/items/132/File/03_gokaku_happyo_09.pdf)。
- 第9回：[午前問題](https://www.jccpp.or.jp/files/items/222/File/04_gokaku_happyo_09.pdf)、[午後問題](https://www.jccpp.or.jp/files/items/222/File/05_gokaku_happyo_09pm.pdf)、[合格基準・正答](https://www.jccpp.or.jp/files/items/222/File/03_gokaku_happyo_09.pdf)。

## 原文・正答・図・出典の確認

公式PDFを再取得し、`scripts/audit-shinrishi.py` で308問すべての本文・全選択肢・正答・必要選択数・出典ページを照合した。組版上の空白・制御文字、第9回問27の区切り線、第8回問84の上付き2と抽出文字2を正規化した比較で、両回154問ずつ一致。両回とも午前1〜77・午後78〜154の公式通し番号を保持している。

照合証跡は `reports/shinrishi-8-source-audit.json` と `reports/shinrishi-9-source-audit.json`。6本の公式PDFのSHA-256、各問の公式正答・出典ページ・原文ハッシュを収録している。テストでも候補データの本文と選択肢のハッシュを証跡と照合し、照合後の意図しない書換えを検出する。

第8回は全759肢・複数選択15問、第9回は全755肢・複数選択13問。各問にページ付き問題PDF URL、公式正答URL、出典表示を保持している。正答表に全員正解・採点除外等の特例はない。

4冊それぞれの問題ページ（PDF 5〜52ページ、計192ページ）をレンダリングして確認した。別画像として必要な図表はなく、全問テキストで回答可能。第9回問27の区切り、第9回問46の統計表記、第8回問84の指数をテキストで保持する。冊子冒頭の解答方法の例図は出題問題ではないため取り込まない。

## 修正

- 全308問の全1,514肢に、用語の定義・誤りの箇所・事例との対応に即した独自解説を追加し、`explanationCoverage: full` とした。第9回の一般解説から位置依存の正答番号を除去した。
- 公認心理師の検証で認めていた一般解説のみの例外を削除し、未公開候補にも全肢解説を要求する。
- 選択肢のシャッフル対象から公認心理師を除外し、4肢問題を含め公式番号・正答・解説の対応を保持する。
- 資格台帳の古い「第8回未収録」を修正し、両回の収録実績と具体的な転載条件・残作業を記載する。

## 保留：308問（公開0問）

対象は第8回の問1〜154、第9回の問1〜154の全件。共通理由は転載等の事前許可の記録を確認できないため。

[公式サイトポリシー](https://www.jccpp.or.jp/policy.html) 第2項「著作権について」は、センターへの著作権帰属と、法令で認められる利用を除いた複製・転用・改変・配布・掲示・送信等への事前許可を定めている。問題・正答が公表されていることや出典表記のみを許可取得の代替とは扱わない。確認したページのSHA-256：`2a3517be44538612e35822a32076ffdacebabd54385eb7935589d874a19dc8da`。

`status: terms-review-required` を維持し、公開用エクスポート、同期・非同期プール、資格・年度一覧、公開ルートへの接続を保留する。解除条件は対象問題の転載等の事前許可を取得・記録して公開可否を確認すること。外部への問い合わせや許諾申請は行っていない。データの原文・正答照合の不一致による保留は0問。

## 独立レビュー

指定の `codex exec -m gpt-6-astra -c model_reasoning_effort=medium --skip-git-repo-check -s danger-full-access -C "$PWD" -` で開始時点の独立レビューを実施。初回はFAIL、全308問の台帳と5件の指摘を `reports/cloud-shinrishi-review-1.md` に保存した。

| 初回指摘 | 対応 |
| --- | --- |
| R1-E001：全問の全肢解説不足 | 全1,514肢の固有解説を追加し、一般解説のみの検証例外を削除 |
| R1-S002：第9回4肢15問の番号シャッフル | 全308問で公式選択肢順を保持。全件の回帰テストを追加 |
| R1-H003：公開切替後の未完成問の保留 | 全308問の完成確認まで資格全体の保留を維持。部分公開は行わない |
| R1-L004：転載条件 | 具体的な公式ポリシーを台帳に登録し、許諾確認まで308問を保留 |
| R1-M005：台帳に第8回未収録と記載 | 両回各154問、計308問収録に訂正。完了した取り込みを残作業から除去 |

第9回154問755肢の独立再レビュー（`reports/cloud-shinrishi-review-2.md`）は内容指摘2件でFAIL。問90のA-B-Xモデルを家族危機のABC-Xモデルと混同した説明を、Newcombの人物A・Bと対象Xの関係の説明に訂正した。問88の集団錯誤はAllportの集団心の実体化への批判として説明し直し、生態学的誤謬との混同を解消した。両問に原論文・原著の参照URLを追加した。公開保留管理の修正はこの再レビューでPASS。

修正後の最終独立再レビュー（`reports/cloud-shinrishi-review-3.md`）は **PASS（保留管理を含む）、新規・未解決の修正指摘0件**。全308問・1,514肢を改めて通読し、第8回全759肢も新規に内容確認した。初回5指摘と第2回2指摘の対応を確認し、全308問の原典照合・全192問題ページの図確認・関連4ファイル1,079テストも再実施して成功した。転載許可取得は未完了であり、この合格を公開許可とは扱わない。

全論文・検査マニュアルの個別取得や本番HTTP・ブラウザE2E・配信済みキャッシュ・将来の公開切替後の動作を確認したという意味ではない。最終レビューに未読の設問・肢別解説は0件。許可記録未確認以外の理由によるデータ品質上の保留は0問。

## 検証

- `pnpm install`：成功（Prisma Client生成を含む）。
- `pnpm validate:questions`：26,752問成功、エラー0、警告16,904件。うち公認心理師は96件で、一般解説が50文字未満という長さ警告。全肢解説の不足や原文・正答不一致は0件。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。
- `pnpm exec vitest run __tests__/questions/shinrishi-staging.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/unit/exam-source-label.test.ts __tests__/questions/qualification-expansion.test.ts __tests__/lib/questions-filter.test.ts`：5ファイル・1,100テスト成功。全肢キー・解説、原文ハッシュ、正答・複数選択、出典、番号順、公開保留を検証。
- `python scripts/audit-shinrishi.py --round 9 --source-dir /tmp/shinrishi9` と `--round 8 --source-dir /tmp/shinrishi8`：それぞれ154問すべて一致。
- 開始コミットと全308問を比較し、ID・問題文・選択肢・正答・選択数・問題/正答URL等の変更がないことを確認。変更は独自解説・解説区分・2問の参考URLのみ。
- `git diff --check`：成功。
- `pnpm build`、デプロイ、push、PR作成は実施していない。

## 最終データの識別

- `data/questions/shinrishi/2025-annual.json` SHA-256：`9db93e6c06db4e5f2fa079c0cb924a839009e3b8c629ed18956677af56ecec31`（最終独立レビュー対象と一致）。
- `data/questions/shinrishi/2026-annual.json` SHA-256：`5c04f3f73ebc6abb508a6e07bbc5db3ed656b15333aea1809d31162a2e111b2c`（最終独立レビュー対象と一致）。
