# 前回レビュー指摘への対応

対象：`prior-independent-review.md`（2026-11-03）。これは対応記録であり、新たな作者外レビューを実施したという記録ではない。

- R1：専用ブランチ `qual/qchizai2-20261103`、基点 `00e49b94060cc2671e9d098df91d653a4ed3ffe2` に固定原稿6ファイルと現行Questionアダプター、資格設定、loader・演習・出典表示を実装。今回開始時にはindexが復旧し、同タスクの未コミット途中成果が存在したため、破棄・再制作せず引き継いだ。他worktreeの変更は扱わない。
- R2：全160問の原文・正答・全肢解説の同一性、2回×2科目×40問、○×12問・最大9肢・数値2問を検査。関連テストは `vitest-current.json`、型・ビルド・実ブラウザ結果は `checks.json` に記録する。ブラウザのビルドID・アダプターhash・固定原稿hashと採点／localStorage再読込結果を `browser-receipt.json` に結びつける。認証後DB同期・報酬・本番画面は対象外。
- R3：`scripts/verify-chizai2-intake.py --pdf-dir <保存先>` は読取り専用。PDFの実バイトhash、全160正答の独立解析、原稿・レコードhash・スキーマを毎回検証する。保存されたhashMatchesフラグだけで合格にしない。PDFは一時領域に保持し、コミットしない。
- R4：固定6ファイルは旧draft/gate metadata込みで一字も変更しない。履歴資料と今回の採用状態を分離し、`data/questions/chizai2/index.ts` の採用状態を同版作者外160原問・651肢レビュー、前回の独立原典照合、本人の権利取得済み指示と `application-receipt.json` に対応づけた。数値問題の空の選択肢マップは現行契約に合わせて省略。歴史法令原本の網羅監査に関する6問の留保は残し、解説の再制作やフラグだけによる未査読問題の通過はしない。

最終的な検査成否・受入範囲は `application-receipt.json` を参照。本番公開・push・PR・DB書込みは含まない。
