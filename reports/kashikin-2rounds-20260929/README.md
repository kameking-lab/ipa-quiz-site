# 貸金業務取扱主任者資格試験 第20回（令和7年度）・第19回（令和6年度）取り込み

## 出典
- 一般社団法人日本貸金業協会「試験問題及び正答の掲載について」
  https://www.j-fsa.or.jp/chief/qualifying_exam/exam_example/
- 第20回（令和7年11月16日実施、令和7年度）
  - 問題: https://www.j-fsa.or.jp/chief/doc/qualifying_exam/exam_example/exam_paper_20th.pdf
  - 正答: https://www.j-fsa.or.jp/chief/doc/qualifying_exam/exam_example/20th_answer.pdf
- 第19回（令和6年11月17日実施、令和6年度）
  - 問題: https://www.j-fsa.or.jp/chief/doc/qualifying_exam/exam_example/exam_paper_19th.pdf
  - 正答: https://www.j-fsa.or.jp/chief/doc/qualifying_exam/exam_example/19th_answer.pdf
- 利用条件: ページ上に転載条件の記載なし（unstated）。司令塔判断により、出典明記・独自解説・
  協会と無関係である旨の表示を条件に収録（第二種衛生管理者・技術士総合技術監理部門と同じ扱い）。

## 転記方法
問題PDF・正答PDFはテキスト層を持つ（スキャン画像ではない）。転記は独立した2つのPDFライブラリに
よる抽出を passA（PyMuPDF `get_text()`）・passB（pypdf `extract_text()`）として実施し、
全角/半角の数字表記ゆれと版下ツール由来の不可視フッター文字列（`DKIH-01.indd...`）を正規化した
うえで機械差分を取った。**100問・全ページで実質的な差分は0件**（`extract.py` の出力を参照）。

選択肢の切り出しは、各問題ページの①〜④マーカーの最後の出現位置を境界とするパーサー
（`parse.py`）で行った。「ａ〜ｄ」の記述式設問では PDF の行送りを1文で結合しつつ、
ａ・ｂ・ｃ・ｄの各項目の前だけで改行を残した。脚注（例:「(注１) 加入貸金業者とは、…」）は、
選択肢内の本文中に現れる上付き引用「(注１)」（直後にスペースなし）と、ページ末尾にまとまる脚注
定義「(注１)　…をいう。」（直後に全角スペース）を区別して分離し、脚注定義は問題文の末尾に追記した。
`chk_2.png` / `chk_50.png` / `q15_300dpi.png`（300dpiレンダリング）で複数ページを目視照合し、
抽出テキストと完全一致することを確認した。

正答表は両PDFとも PyMuPDF・pypdf の抽出が完全一致（`build_source.py` の `parse_answer_key`）。

## 解説の起草・査読
- 起草: `claude-opus-5-5`、ツールなし（`--disallowedTools "*"`）。10問ずつのバッチで、公式正答
  つきの原文を渡し、法的な正誤理由・全4肢の解説を作成させた。条文番号は確信がある場合のみ書かせ、
  出典URLの創作は禁止した。
- 査読: 別セッションの `claude-opus-5-5`、WebFetch・WebSearch許可（e-Gov法令API・監督指針等の
  一次資料を実際に取得）。各問の適否判定を一次資料と突き合わせ、誤りがあれば修正済みの解説を
  提示させた。FAILだった問題は査読の修正版を採用し、公開する。
- 起稿・査読のレシート（モデル・ツール・トークン使用量）は `explanations/<round>/batchN.*.receipt.json`
  に保存。

## 検証コマンド
```powershell
pnpm exec tsc --noEmit
pnpm exec vitest run __tests__/questions/kashikin-two-rounds.test.ts
pnpm exec vitest run __tests__/questions/get-questions.test.ts
pnpm lint
```
