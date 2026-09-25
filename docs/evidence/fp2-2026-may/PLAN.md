# FP2 2026年5月公表 学科問11〜60

- Base: `origin/main` at `a3178fe5` (2026-09-25)。既存checkoutには触れない。
- Scope: 現在公開中の問1〜10の続き。公式問題・正答を問番号ごとに照合し、確認済みの連続範囲だけを演習に追加する。
- Primary source: https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf
- Reuse terms: https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf
- Hold: 正答不一致、問題文・選択肢の不一致、図表が表示できないもの、法令基準日が確認できないもの。HOLD以降を飛ばして「全問」表示しない。
- Metadata: 問題単位の出典・加工表示、公式問題/正答URL、法令基準日、取得PDFハッシュ、モデル使用receipt。
- Review: 高度な解説判断に`claude-opus-5-5`を明示指定し、実応答の`modelUsage`をreceiptで保存する。自己申告だけで検収しない。
- Acceptance: 問番号・正答・肢数・連続性のゲート、対象テスト、型検査、lint、production build、匿名URLの公開前検証。

## Checkpoints

1. `scripts/fp2_2026_may_extract.py` → `extraction.json`（PDF SHA-256・表紙の法令基準日・全60問の問題文/肢/正解・図表3件の画像化とその文字起こし）。既公開の問1〜10と照合し、問題文・肢・正答が一致することを確認（問9の肢エのみ原典の全角空白1個を公開版が除去）。
2. `scripts/fp2_2026_may_review.py <first> <last>` → `receipts/`。`claude -p --model claude-opus-5-5 --output-format json` の標準出力をそのまま保存し、`modelUsage["claude-opus-5-5"].provider == "firstParty"` でないものは不採用。1バッチにつき「正答を伏せた独立解答(solve)」と「公式正答を前提とした解説(explain)」の2回。
3. `review-ledger.json` に問ごとの判定（accepted / hold と理由）を記録し、ビルドは問11から連続するacceptedだけを公開する。
