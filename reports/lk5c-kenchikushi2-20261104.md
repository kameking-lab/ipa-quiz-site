# LK5C 提供PDFからの学科収録再開（2026-11-04）

## 到達点

**二級2026年・学科Ⅰ（建築計画）問1～25を未公開ステージングに追加。累計25/400問、残り375問。** 本文25件・選択肢125件・公式正答25件・独自の全肢解説125件を収録した。全400問完成ではない。人手確認は未完了のため全25問の `needsReview=true` を維持している。

- worktree: `C:/Users/kanet/20260522/wt-kenchikushi2`
- branch: `qual/kenchikushi2-20261104`
- LK5C起点: `9a46e089b`
- 本文: `data/qualification-staging/kenchikushi2/2026-I.ts`
- 公開状態: `publicAllowed=false`、`ingestionState=in-progress`、`ingestedQuestionCount=25`
- `StagedKenchikushiQuestion` として保持し、ExamCode・公開レジストリ・公開ルート・ホーム一覧には接続していない。元PDF・抽出草稿はコミットしない。

## 入力資料と出典

入力はオーナー提供の `C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/README.md` および同フォルダーのPDF12本。READMEのオーナー決定・出典を確認した。既存 `.cache/lk5/` のエージェント取得資料を提供資料と読み替えていない。

12本すべてのSHA-256とページ数が既存manifestの出典情報と一致した。提供資料としての対応表はmanifestの `ownerProvidedSource.documents` に別記している。本文の対象は提供 `R8_2k_1_2.pdf` のPDF2～10ページ（計画1～9ページ）、公式正答は提供 `R08_2k_gokakukizyun.pdf` のPDF1ページ・学科Ⅰ行。

公式出典は [二級建築士の問題・正答一覧](https://www.jaeic.or.jp/shiken/2k/2k-mondai.html) と [木造建築士の問題・正答一覧](https://www.jaeic.or.jp/shiken/mk/mk-mondai.html)。公式一覧・表紙に個人利用以外の無断転載・複製を禁止する表示があることは前回から継続して記録する。オーナーの収録決定を権利者の許諾取得と表現していない。アクセス制限の迂回はしていない。今回の入力PDFに欠落・取得不能はない。

法令基準日は2026-01-01。2025年の基準日と2025-04-01施行規定の例外は既存manifestのまま保持した。PDF公開日・試験実施日は未確定のままである。

## 転記・図表・解説

提供PDFの9ページ全体と正答表を描画して目視照合した。本文は改行・空白、選択肢番号、面積単位の組版のみ正規化した。誤りを問う選択肢は原文の誤った記述のまま保持し、訂正は独自解説に分離した。

- 問1選択肢2: 両抽出器の文字層は `繁虹梁` だが、原本の拡大画像は `繫虹梁`（つなぎこうりょう）。原本の字形に補正し、比較処理にもこの一箇所の補正を明示した。
- 問1・5・17・18のルビは、親文字を本文に残し、読みを `sourceRubies` に保存した。
- 問6: 条件4行を本文・構造化表・原本切り出しPNGに保持。各数値を照合し、外皮平均熱貫流率は `(16×0.2＋22×0.3＋18×2.0＋16×0.2)/72＝49/72≒0.681`、公式正答4（0.7）と整合した。この科目のほかの24問には原本の図表はない。
- 問15選択肢3: 上下に組まれた分数を原本画像で確認し、`1/8` とした。
- 問6画像は `data/qualification-staging/kenchikushi2/assets/` に保存。`public/` には置かず、画像フィールドにはリポジトリ相対パスを保持する。将来の公開時にパス移行が必要である。
- 問7の全天空照度、問16の750 mm間隔の踊場、問17の35 cm程度のキックプレート、問22の給湯号数の25℃、問23の300 V超のC種接地、問24の住宅用消火器の再充塡不可等は、確認した一次資料のURLを問題に記録した。数値を現在の別基準へ置換していない。

出典監査スクリプトは、今後再実行しても本文の収録進捗と提供資料の記録を0件へ戻さないよう変更した。

## 検証結果

- `python scripts/verify-kenchikushi2-owner-pdfs.py C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2`: PASS。初回転記のPyMuPDFとは別のPDFMiner/pdfplumberで、12本のハッシュ・ページ数、全400公式正答、今回の25本文・125肢を照合した。NFKC・空白制御文字の除去・問1の字形補正・問15の分数復元を明示している。ルビの読みと画像内容は別途原本画像で確認した。
- `corepack pnpm validate:questions`: PASS。26,444問、ok=26,444、fail=0、warn=16,808。これは既存問題の検証で、今回の未公開ステージングは次の専用テストで確認した。
- `corepack pnpm exec vitest run __tests__/questions/kenchikushi2-staging.test.ts __tests__/lib/home-directory.test.ts __tests__/questions/live-qualification-coverage.test.ts`: PASS、3ファイル23テスト。正答固定、25問の連番と一意ID、5肢・全肢解説、出典、基準日、図表・分数・ルビ、未公開維持、提供資料記録を検査した。
- `$env:NODE_OPTIONS='--max-old-space-size=8192'; corepack pnpm typecheck`: PASS。
- 問1の字形補正後に原文照合・関連23テスト・型チェックを再実行し、すべてPASS。原文照合の集計は `reports/lk5c-source-check.json` に保存した。
- 出典監査の全取得失敗を一時manifestにmockした試行: PASS。本文進捗・バッチ・次回位置・提供資料の記録が保持された。ネットワーク取得と本番manifestへの書き戻しはしていない。
- `git diff --check`: PASS。

## 独立レビュー・コミット

指定の `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` を別プロセスで実行した。レビュー1は今回25問バッチの品質についてPASS。提供PDFとPython照合をレビュアーが再確認し、原文・正答・125肢解説・問6画像と計算・問15分数・非公開構成を確認した。

レビュー2は25問バッチPASS・報告FAIL。字形補正は原本どおりの `繫` と独立確認されたが、次回再開位置の印刷ノンブルを「法規1」と記した誤りを指摘された。原本PDF11ページの下端は「法規10」であり、README・この報告を「PDF11ページ（印刷ノンブル：法規10、学科Ⅱの先頭）」へ訂正した。

訂正後のレビュー3は **最終品質PASS**。原本画像の「法規10」・学科Ⅱ問1との一致、保存ログの型チェックexit 0・23テスト成功、原文照合のPASS、未公開・人手確認待ち・未収録375問との整合を独立確認した。レビュー3プロセスも終了コード0。レビュー原文は `reports/lk5c-kenchikushi2-review-1.md`、`reports/lk5c-kenchikushi2-review-2.md`、`reports/lk5c-kenchikushi2-review-3.md` に保存した。レビュー判定を人手確認の完了とは扱わない。

収録コミット: `a1c67ea9c3d98958c55ccf2cc29fb3a4f1e0b246`（25問・図表・型・manifest・README・固定テスト・検証スクリプト）。この報告とレビュー原文・照合集計は別の文書コミットに保存する。push・PR・デプロイ・main操作は行っていない。

## 次回再開位置

二級2026年・学科Ⅱ（建築法規）問1、提供 `R8_2k_1_2.pdf` のPDF11ページ（印刷ノンブル：法規10、学科Ⅱの先頭）から。次は学科Ⅱ25問→学科Ⅲ25問→学科Ⅳ25問、その後に二級2025年、木造2026年、木造2025年。残り375問。

木造2026年施工問12は文字層の抽出欠落を理由に除外せず、提供 `R8_mk_3_4.pdf` のPDF18ページ（施工17ページ）を画像で確認して全5肢と第三者図版注記を保持する。

外部報告先: `C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lk5c-report.md`。
