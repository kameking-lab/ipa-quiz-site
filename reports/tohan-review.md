# tohan 令和6年度（関西広域連合）独立レビュー記録

- 内容レビュー: 2026-09-28 に別担当が全120問・600肢を公式PDF画像・公式正答PDF・厚労省手引き（令和6年4月版）で独立照合済み（`reports/tohan-kansai-2024/independent-qa-20260928.md`、修正6件反映済み）。判定は内容 PASS、権利HOLDのみ。権利はオーナー決定（2026-11-04）で停止理由にしない。
- 2026-11-06（W1）: 公式正答PDF `R06touhankaitou.pdf`（SHA-256 54c3a979…c9c）を再取得し PyMuPDF で120問の正答を新たに抽出、`source-receipt.json` の officialAnswerKey と 120/120 一致。問題PDF2点・手引きのSHA-256も一致（手引きのハッシュの1字タイプミスを修正）。
- 公開データ `data/questions/tohan/2024-kansai.json` は `reports/tohan-kansai-2024/build-2024-kansai.py` でレビュー済みの記述別理由から機械的に組み立てた（正答肢フラグ＝公式正答、各肢30字超を検査）。`__tests__/tohan-kansai-2024.test.ts` で正答・章区分・出典・URLを固定。
