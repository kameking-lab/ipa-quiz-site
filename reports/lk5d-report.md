# LK5D 報告（2026-11-04）

## 結果と再開位置

二級建築士・木造建築士の2026年・2025年学科I～IV、計400問の本文・各5選択肢・図表・公式正答・全肢解説を未公開ステージングに入力した。LK5Cの25問から375問・1,875肢解説を追加し、最終合計は400問・2,000選択肢・2,000肢解説・63画像・15構造化表。新規追加分は62画像・14表。

未収録問題は0問。**再開位置は、二級2026年・学科I問1からの人手による原本・技術根拠確認**（R8_2k_1_2.pdf PDF2ページ、印刷ノンブル「計画1」）。manifest.nextResume.stageは human-source-and-explanation-review。400問の転記完了を公開可能・人手確認完了とは扱わない。

全400問は needsReview=true / publicAllowed=false。manifest.ingestionStateは transcribed-human-review-pending。資格台帳の ready-to-ingest、公開Questionレジストリ、ExamCode、ルート、トップ画面は変更していない。

## 作業範囲

worktree: C:/Users/kanet/20260522/wt-kenchikushi2

branch: qual/kenchikushi2-20261104

開始HEAD: 81fa32c862943062fc10c9a02deb03878e16726f（LK5C最終保存）。開始位置は二級2026学科II問1、R8_2k_1_2.pdf PDF11ページ、印刷ノンブル「法規10」。作業開始は2026-11-04 17:54:45 JST、3時間枠の終了予定は20:54:45 JST。

入力はオーナー提供ディレクトリ C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/ のREADME及びPDF12本。指定のlk5c.txt・LK5C報告に従い、二級2026残り3科目→二級2025全4科目→木造2026全4科目→木造2025全4科目の順に各25問を収録した。原本PDFと草稿はGitに含めていない。

保存先は data/qualification-staging/kenchikushi2/。各科目TS、非公開assets、source-manifest.json、index.ts、README、固定テストと独立照合スクリプトを更新した。画像はpublic/へ置いていない。

## バッチと独立レビュー

指定コマンド C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only を別プロセスで実行。各25問の本文・125選択肢・公式正答・125肢解説及び図表をレビューし、FAIL指摘は修正コミット後に再レビューした。AIレビューPASSを needsReview の解除には使わない。

| 収録範囲（各25問） | 収録コミット | 最終修正コミット | PASS証跡（reports/） |
|---|---|---|---|
| 二級2026 II | b15f7140e | 21cc2c1ee | lk5d-II-review-2.md |
| 二級2026 III | a0424368b | a9980d14b | lk5d-III-review-2.md |
| 二級2026 IV | cffc579a0 | d9fb597a9 | lk5d-IV-review-2.md |
| 二級2025 I | 054782cc0 | d5d9194ae | lk5d-2025-I-review-2.md |
| 二級2025 II | 9c2fcfa55 | 同左 | lk5d-2025-II-review-2.md |
| 二級2025 III | 85d1b8d50 | f300b9dfb | lk5d-2025-III-review-2.md |
| 二級2025 IV | 054961bdd | 1fca2675a | lk5d-2025-IV-review-2.md |
| 木造2026 I | 86496b3e9 | 同左 | lk5d-m2026-I-review-2.md |
| 木造2026 II | 091aade01 | 24f7e3923 | lk5d-m2026-II-review-2.md |
| 木造2026 III | 1c168800d | 同左 | lk5d-m2026-III-review-2.md |
| 木造2026 IV | 73422d928 | f85c1e90b | lk5d-m2026-IV-review-2.md |
| 木造2025 I | 63da42700 | 同左 | lk5d-m2025-I-review-2.md |
| 木造2025 II | b2ac99a4b | 3eef99c14 | lk5d-m2025-II-review-2.md |
| 木造2025 III | 302f11dc2 | 80e6c51b9、28ed3ec6eの余白調整 | lk5d-m2025-III-review-2.md |
| 木造2025 IV | 28ed3ec6e | 参照URL更新3709e7fdd | lk5d-m2025-IV-review-2.md |

LK5Cからの二級2026学科I25問は既存のレビュー3 PASSを引き継ぐ。補助参照更新3709e7fdd及び最終報告・管理情報のレビューは最後に別途実施する。

主な修正は、採光開口中心と上端の区別、通常梁1/300・片持ち1/250、床下地パーティクルボード15 mm、低圧の交流600 V・直流750 V、大引継手の束心から外側150 mm、SM-15Sの用途、図の寸法・代替テキスト・ノンブル、吊束の軸力0、天井板→野縁→野縁受→吊木→吊木受→梁の伝達順序。原本の誤りを問う選択肢は変更せず、独自解説だけ訂正した。

木造2026施工問12は提供PDF18ページ（施工17）を画像で確認し、図2・4を含む全5図と住宅金融支援機構の第三者出典注記を原図・questionNotice・postOptionNoteに保持した。図4はそぎ継ぎ。

## 原本照合と法令・補助資料

提供12 PDFのSHA-256・ページ数を照合。公式正答400件は四つの公式正答表と固定テストで保持。入力にPyMuPDF、独立照合にPDFMiner/pdfplumberを用いた。scripts/verify-kenchikushi2-owner-pdfs.py の最終結果は本文400・選択肢2,000・正答400、PASS。科目ごとの reports/lk5d-*-source-check.json と最終検証JSONに保存。

全半角・空白改行・単位・波ダッシュを正規化。原図から分数・根号・指数・記号を復元し、ルビはsourceRubiesに分離した。文字層だけで図を省略せず、切り出しPNGを目視確認した。構造化した選択肢表は別抽出のセルと照合した。

法令は各年1月1日基準と、2025年表紙指定の4月1日施行規定を区別。e-Govの改正履歴から対応する版を参照し、後年の罰則等へ一律に書き換えていない。2025年約款は当時の国交省001519399、2026年は2025年12月改正に対応する資料を参照。

既知の404補助URL（001855615、manual1008_ver3）を、到達確認できた国交省の枠組壁マニュアル・木造工事標準仕様書、日本合板工業組合連合会の技術資料等に更新した。二級2025構造11・12は既存の有効な国交省資料を保持し404だけ除去。変更一覧とHTTP200確認は reports/lk5d-reference-check.json。原本のsourcePdfUrl/sourceAnswerUrlは公式出典のまま保持している。

## 検証

最終検証結果は reports/lk5d-validation.json に保存。

- ステージング・ホーム・公開資格カバレッジの3ファイル、29テスト成功。
- pnpm typecheck 成功。
- 独立原本照合は12 PDF・400正答・400本文・2,000選択肢でPASS。
- 全400問の非公開・人手確認待ち、全63画像の存在と代替テキスト対応を確認。
- pnpm validate:questions は既存公開26,444問、ok=26,444 / fail=0 / warn=16,808。これは公開問題群の検証で、今回のステージング原本照合とは別。警告は既存公開問題群のもの。
- git diff --checkはPASS。最終保存状態は末尾に記す。

push・PR作成・mainマージ・デプロイ・本番設定変更・本番DB接続は実施していない。C:/Users/kanet/secrets-localには触れていない。秘密値をログ・Git・この報告へ出していない。

## コミット履歴（報告保存前）

```
b15f7140e feat(staging): ingest 2026 second-class architect law questions
8cea82632 chore(staging): normalize law batch text line endings
21cc2c1ee fix(staging): correct law q4 opening-center geometry
a0424368b feat(staging): ingest 2026 second-class architect structure questions
a9980d14b fix(staging): correct steel beam deflection explanation
cffc579a0 feat(staging): ingest 2026 second-class architect construction questions
d9fb597a9 fix(staging): correct particleboard floor specification
054782cc0 feat(staging): ingest 2025 second-class architect planning questions
d5d9194ae fix(staging): correct Japanese low voltage threshold explanation
9c2fcfa55 feat(staging): ingest 2025 second-class architect law questions
85d1b8d50 feat(staging): ingest 2025 second-class architect structure questions
f300b9dfb fix(staging): preserve complete steel stress curve label
054961bdd feat(staging): ingest 2025 second-class architect construction questions
1fca2675a fix(staging): correct girder joint position and contract edition
86496b3e9 feat(staging): ingest 2026 wooden architect planning questions
091aade01 feat(staging): ingest 2026 wooden architect law questions
24f7e3923 fix(staging): correct law metadata and diagram explanations
1c168800d feat(staging): ingest 2026 wooden architect structure questions
73422d928 feat(staging): ingest 2026 wooden architect construction questions
f85c1e90b fix(staging): correct SM-15S connector use explanation
63da42700 feat(staging): ingest 2025 wooden architect planning questions
b2ac99a4b feat(staging): ingest mokuzo 2025 gakka II with all explanations
3eef99c14 fix(staging): correct mokuzo 2025 II geometry alt and fire bonus reasoning
302f11dc2 feat(staging): ingest mokuzo 2025 gakka III with structural calculations
80e6c51b9 fix(staging): correct truss equilibrium ceiling load path and diagram metadata
28ed3ec6e feat(staging): finish all 400 kenchikushi academic source records unpublished
3709e7fdd fix(staging): replace unavailable supporting references with primary sources
```

外部報告: C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lk5d-report.md

同内容を reports/lk5d-report.md に保存する。最終レビュー結果・保存状態は末尾へ追記する。
