# 建築設備士・直近2回分の取込

対象は第一次試験の2025年度・2026年度。各105問（建築一般知識27、建築法規18、建築設備60）、計210原問・840肢理由。3科目を別の試験回として数えない。第二次試験の設計製図は含まない。

6本の問題JSONは既受入固定版のバイトを保持して再利用した。原問・選択肢・正答・全肢解説を新規生成していない。`manifest.json` は問題単位の原稿ハッシュ・公式正答・問題/正答PDF URL、科目別件数、画像32資産のハッシュ、再利用した受入票を対応づける。原図を参照する問題数は23問で、画像資産数32点とは異なる。

2026年度建築法規Q18は原文・公式正答1（ア）を保持する。肢イの当時法適用と公式正答との不整合が未解消のため、`reference-only`・`needsReview=true`・注意文を保持する。通常学習候補は209問、参照専用は1問。`KENCHIKU_SETSUBISHI_STUDY_QUESTIONS` と `KENCHIKU_SETSUBISHI_REFERENCE_QUESTIONS` を分離し、Q18を通常採点用に取得しない。

## 現行形式への適合

既存のJSON構造を維持し、読取時に資格別Zodスキーマで検証する。旧reader/indexの変更は現行`Question`に対する資格専用型の導入と検証追加、候補プールの分離に限る。公開用`ExamCode`、公開ローダー、カタログや環境設定は変更していない。画像は`private-assets/questions/kenchiku-setsubishi/`に格納し、原稿の`/questions/...`参照との対応をmanifestに保存した。静的公開画像として配信しているという主張ではない。

本人の権利取得済み指示を採用し、再許諾待ちには戻さない。原稿の既存licenseラベルは書き換えていない。このブランチはデータ取込の成果であり、一般公開ローダー・画像配信・通常アカウント履歴/SRS/報酬への接続や本番表示の受入は別途必要。過去の私有専用ルートの受入票を本番機能の検収へ読み替えない。

## 検査

```powershell
node node_modules/tsx/dist/cli.mjs scripts/validate-qkensetsu.ts --receipt
node node_modules/vitest/vitest.mjs run __tests__/questions/qkensetsu-two-rounds.test.ts
node node_modules/typescript/bin/tsc --noEmit --incremental false
node node_modules/next/dist/bin/next build --webpack
```

`validation.json`と検査ログ、最終受入票を参照。既受入内容の原典照合は同梱の既存受入票と`qkensetsu-review.md`を再利用する。後者の「取込未完了」は前回レビュー時点の履歴であり、今回の最終状態は最終受入票で確認する。全210原文・840理由・32画像を今回あらためて全件目視査読したとは主張しない。

公式一次資料は[建築技術教育普及センター・過去の試験問題等](https://www.jaeic.or.jp/shiken/bmee/bmee-mondai.html)。6本の公式問題/正答PDFは`source-inventory.json`にURL・SHA-256を記録し、原PDFと抽出草稿はコミットに含めない。試験時の法令基準日は各問の`lawReferenceDate`で保持する。公式ページには現在の法令と一致しない可能性、個人利用以外の無断転載禁止の注意がある。公開時は本人取得の個別許諾条件に従う。

## 作業環境

基点は`origin/main`の`00e49b94060cc2671e9d098df91d653a4ed3ffe2`、ブランチは`qual/qkensetsu-20261103`。元作業ツリーと他のworktreeは変更していない。

中断コピーは追加コミット0、残存4,702ファイルのうち4,701件が基点と一致、残り1件は0バイトのチェックアウト途中画像だった。独自ファイルはなかった。指定の復旧許可に基づき、そのworktreeだけを作り直した。通常の再チェックアウトでCドライブ空き0バイトとなったため停止し、専用コピー全体をGitで除去して再作成した。Git設定は変更せず、大容量の`public/`、`docs/evidence/`、既存`reports/`をindexのskip-worktreeで省略した。型チェックに必要な既存証拠JSON96件は追加展開した。これは検査入力の配置であり、リポジトリのファイル削除差分ではない。

既存の依存を専用worktreeのjunctionから参照し、依存インストール・ロックファイル変更は行っていない。省略した既存画像の表示をビルド成功だけで検証済みにしない。

## 最終結果

資格別スキーマ/受入検査、Vitest 3件、全体型チェック、追加コードlintはPASS。`next build --webpack`は終了コード0、12,466ページの静的生成を完了した。既存のmiddleware・Edge Runtime非推奨、チャート寸法の警告は残る。`acceptance.json`と`CHECKS.json`に実結果・ログのSHA-256を固定した。

ビルド後の`.next`削除は未了。通常ディレクトリ（Attributes=16、LinkType=null、reparse pointなし）で対象パスを確認したが、指定の`Remove-Item -LiteralPath …/.next -Recurse -Force`は自動承認レビューが拒否した。表示理由は「blocked by policy」のみ。別の削除手段では反復せず、生成物はignoredのまま残した。詳細は`cleanup.json`。データ取込の検査成功と、未完了の削除・公開統合を混同しない。
