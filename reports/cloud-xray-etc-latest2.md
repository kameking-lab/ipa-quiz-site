# 安全衛生技術試験協会 直近2回の追加監査

確認日: 2026-11-03。公式一覧 https://www.exam.or.jp/lckohyo/ の各資格の行から、直近が**令和8年10月掲載・令和8年4月掲載**であることを確認した。掲載回と実施回を混同せず、10月掲載は2026年1〜6月実施、4月掲載は2025年7〜12月実施として扱う。一覧の法令注意書きは掲載回との整合に曖昧さがあるため、現行法への対応は主張せず各問の解説に「法令・制度は出題時点」と明記した。

既存の `data/questions/eisei1`、`lib/qualifications/catalog.ts`、同期・遅延問題レジストリ、`EXAM_CONFIGS`、選択肢番号表示、出典回表示を調査。資格台帳は `ready-to-ingest` とし、`isExamPublished` により資格一覧・ルーティング用コード一覧・問題レジストリ・遅延ロードから除外する。生データへの直接importによる内部検証は可能。

解説は独自作成の正答中心解説（`official-summary`）。全肢解説の完成を意味する `full` は付けない。検証スクリプトには非公開の当該資格だけを対象とするsummary対応を追加した。公開時は既存の全肢解説要件が再び適用される。

## エックス線作業主任者（xray）

- 2026年10月: https://www.exam.or.jp/wp-content/uploads/2026/10/LC20262117.pdf
- 2026年4月: https://www.exam.or.jp/wp-content/uploads/2026/04/LC20260417-1.pdf
- 各40問（問1〜40）、計80問。表紙の出題範囲と末尾の問40を確認し、欠番・重複なし。正答はPDF中の○付き番号と照合。
- 4月分は既存の公式本文・表示用文字起こし・独自解説を再利用。10月分は公式PDFの文字と位置情報から転記し、分数・指数・図表周辺の文章を補正した。10月問5と4月問34の分数は括弧とスラッシュで表記。
- 図表: 10月問10・28、4月問7・28・29。必要部分のみ既存方式の切り出し画像を併用し `hasImage` を設定。問題・五肢はテキストとして保持。図表内の内容は画像でも保持。
- 各問に問題・正答URL、掲載月、原問番号、出典、独自解説表示を保存。類題・生成問題なし。
- 検証: `pnpm install` 完了。`pnpm exec vitest run __tests__/questions/xray-latest2.test.ts __tests__/questions/qualification-expansion.test.ts` は2ファイル・1068テスト成功。
- PDF SHA-256 `LC20262117`: `aff291dc76036eb0e2fc94c7a1ff2c38aff9404d6db3808d6607d34c2aa0cd3e`
- PDF SHA-256 `LC20260417-1`: `a239b9bf47b60f4ba851302b40a841413a611a9eeb3d00510d01d6d64b66b272`
- 最終検証: `pnpm validate:questions` 26524問成功（既存警告16888件を含む。空タグ補完後の `--exam=xray` は80問成功・警告0）。最終のxray関連2テスト成功。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` 成功。初回は既存データ量で標準ヒープ上限に到達したため実行時のみ上限を増やした。build・デプロイは実行していない。

## ガンマ線透過写真撮影作業主任者（gamma）

- 2026年10月: https://www.exam.or.jp/wp-content/uploads/2026/10/LC20262118.pdf
- 2026年4月: https://www.exam.or.jp/wp-content/uploads/2026/04/LC20260418-1.pdf
- 各40問（問1〜40）、計80問。表紙・末尾・欠番・重複と○付き正答を確認。公式に全40問公開されている。
- 4月の既存文字起こしと独自解説を再利用し、10月分は新規転記・独自解説作成。10月問25の分数、4月問10の標準偏差式は読みやすいテキスト表記を補完。
- 図表: 10月問9、4月問9・10。必要図表のみ画像併用。問題・五肢はテキスト。全問に出典・正答URL、出題時点の法令に基づく旨を保存。
- ステージング登録し、公開一覧・問題レジストリ・遅延ロードに公開しない。正答中心解説として明示する。
- PDF SHA-256 `LC20262118`: `e170493e2d7d8b541195ac32091e79864b6647a21b991473cc01b73ffd332391`
- PDF SHA-256 `LC20260418-1`: `97524aefd7fbaffa3827843ab2ad57c2bb84717ad45d58ef7a1e2216540fb81a`
- 検証: `pnpm validate:questions` 26604問成功（既存等の警告16809件、gammaは既存解説中の「誤り」という言い回し1件）。xray・gamma関連4テスト成功。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` 成功。build・デプロイなし。

## ガス溶接作業主任者（gas-welding）

- 2026年10月: https://www.exam.or.jp/wp-content/uploads/2026/10/LC20262112.pdf
- 2026年4月: https://www.exam.or.jp/wp-content/uploads/2026/04/LC20260412-1.pdf
- 各20問（問1〜20）、計40問。公式冊子の表紙に問1〜20と明記され、免除者は問1〜10。20問は部分公開による欠落ではなく冊子の全問題数である。欠番・重複なし、全正答は○付き番号と照合。
- 4月分の既存文字起こしと独自解説を再利用。10月分は新規文字起こし・独自解説。図表画像が必要な問題はなし。原問本文と五肢をテキストで保存し、10月問6の空欄表示を補正。
- 各問に問題・正答URLと出典番号、出題時点の法令である旨を保存。資格台帳等の既存方式でステージング登録し、公開ゲートで除外。
- PDF SHA-256 `LC20262112`: `b802020ebdf0a80f08b4c74ff7a0d8d6cee93c930adb6d7eff4d4cffe3283217`
- PDF SHA-256 `LC20260412-1`: `2098042747dd465e51d313636bdb53d2fbd0f25cba0de947aa1370b56cf40ac0`
- 検証: `pnpm validate:questions` 26644問成功（警告16809件は既存データ等、gas-welding由来の警告なし）。関連2テスト成功、`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` 成功。build・デプロイなし。
- ここまでの3資格の4月PDFは今回公式から再取得し、`official-catalog.json` に保存されている既存PDFのSHA-256と完全一致した。
