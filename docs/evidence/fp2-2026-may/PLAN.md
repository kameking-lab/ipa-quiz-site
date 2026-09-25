# FP2 2026年5月公表 学科問11〜60

- Base: `origin/main` at `a3178fe5` (2026-09-25)。既存checkoutには触れない。
- Scope: 現在公開中の問1〜10の続き。公式問題・正答を問番号ごとに照合し、確認済みの連続範囲だけを演習に追加する。
- Primary source: https://www.jafp.or.jp/exam/mohan/files/g2_202605_qa.pdf
- Reuse terms: https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf
- Hold: 正答不一致、問題文・選択肢の不一致、図表が表示できないもの、法令基準日が確認できないもの。HOLD以降を飛ばして「全問」表示しない。
- Metadata: 問題単位の出典・加工表示、公式問題/正答URL、法令基準日、取得PDFハッシュ、モデル使用receipt。
- Review: 高度な解説判断に`claude-opus-5-5`を明示指定し、実応答の`modelUsage`をreceiptで保存する。自己申告だけで検収しない。
- Acceptance: 問番号・正答・肢数・連続性のゲート、対象テスト、型検査、lint、production build、匿名URLの公開前検証。
