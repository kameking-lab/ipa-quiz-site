# CQ8 検証記録

実装・データの最終検証対象：`981dd0f2b36bc9c7fa3e7cdee75350c6ece84b61`。
検証日：2026-11-05 JST。使用パッケージマネージャ：リポジトリ指定のpnpm 10.33.0（corepack経由）。

| コマンド | 結果 |
| --- | --- |
| `corepack pnpm validate:questions --exam=dojo-osen` | exit 0、160問、ok=160 / fail=0、publicAllowed=false |
| `corepack pnpm exec vitest run __tests__/questions/dojo-osen-staging.test.ts __tests__/lib/home-directory.test.ts __tests__/lib/exam-config-integrity.test.ts` | exit 0、3ファイル・26テストPASS |
| `corepack pnpm typecheck` | exit 0、tsc --noEmit PASS |
| `corepack pnpm validate:questions` | exit 0、既存全体34,383問、ok=34,383 / fail=0 / warn=20,263 |
| `python scripts/verify-dojo-osen-sources.py <一時PDFディレクトリ>` | exit 0、公式正答160欄一致、6PDF・169問題画像、本文60,386文字の画像領域内包含PASS |

全体validateと原PDF検査は`4efe968b7`時点で実行。その後の実装差分は2024調査12の解説中の0.028→0.025の訂正と回帰アサーション追加のみで、専用validate・関連26テスト・typecheckは上記最終対象で再実行した。既存全体の警告は短い解説・要確認フラグなど、今回追加したステージング外の既存データに対するもの。

原PDF検査はpdfplumberを使用し、取り込みのPyMuPDFによる切出しとは別に正答表の左右欄を読んで160欄を比較。図表等の保存について、初回独立レビューでは全169問題画像が元PDF再描画と画素一致し、フッター以外の非白色内容に領域外の欠落がないことも確認している。最終テストは169問題画像と6参照画像のハッシュ・出典、採点、全肢解説、公開除外を含む。

独立レビューは別プロセスの`C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only`で実行。各回の判定・実際の検査範囲は同ディレクトリの原文に記載。全800肢の一次資料との個別照合を完了したという証明ではない。
