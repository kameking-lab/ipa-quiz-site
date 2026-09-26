# 登録販売者試験（関西広域連合 令和7年度）解説執筆ブリーフ

入力: E:/codex-worktrees/_tohan-src/batch-N.json（20問）。各問: number, section(試験項目), kind, question(本文), statements(ａ〜ｄ), choices(1〜5の選択肢文), officialAnswerNumber(公式正答番号 1〜5), pdfPart/pdfPages。
公式PDF: 前半 R7tourokuhannbaisyashiken_zennhan.pdf / 後半 R7tourokuhannbaisyashiken_kouhan.pdf（同ディレクトリ。pdfPagesは1始まりのPDFページ番号）。
根拠資料: 厚生労働省「試験問題の作成に関する手引き（令和７年４月）」 tebiki-r7-04.pdf とそのテキスト tebiki-r7-04.txt（ルビで語が分断されていることがあるので、語の一部でgrepすること。<<<pN>>> がPDFページ）。

## やること
1. **転記照合**: 各問の question / statements / choices を公式PDFの該当ページと照合する（PyMuPDF `fitz` で page.get_pixmap(dpi=110) をPNGに書き出し Read で目視、または page.get_text() と比較）。脱字・誤字・記号違い・選択肢の並び違いがあれば transcriptionIssues に記録（修正案つき）。問題なければ空配列。
2. **正誤判定と理由**: 手引き（令和7年4月版）を根拠に、各記述・各空欄・各選択肢の正誤を**自分で判定**し、理由を書く。その後で officialAnswerNumber と突き合わせ、あなたの判定から導かれる選択肢番号が公式正答と一致することを確認する。一致しない場合は手引きを再読し、それでも一致しなければ conflict に詳細を書く（公式正答に無理に合わせた理由を作らない）。
3. 理由は日本語・常体（だ・である調）・1項目 40〜160字。誤りの記述は「どこがどう違い、正しくは何か」を具体的に書く。正しい記述も「なぜ正しいか」を一言で済ませず手引きの内容に沿って補足する。手引きの長文をそのまま写さず要約する。推測・手引きにない独自見解・現在の法改正情報の上書きはしない（出題基準は令和7年4月版の手引き）。
4. 各問に tebikiPages（根拠となった手引きPDFページ番号の配列）を付ける。

## kind ごとの items の書き方
- tf（記述ａ〜ｄの正誤組合せ）: items = {"ａ": {"verdict": "正"|"誤", "reason": "..."}, ... } 全記述。
- pick（正しいもの／条件に当てはまるものの組合せ）: items = {"ａ": {"verdict": "正"|"誤", "reason": "..."}, ...}。「正」＝設問の条件に当てはまる（正しい記述、または例: マオウを含む処方、記載対象の成分）。「誤」＝当てはまらない。正はちょうど2つになるはず。
- fill（空欄補充）: items = {"ａ": {"answer": "正しい字句（選択肢の表記どおり）", "reason": "..."}, ...}。reasonでは誤った候補語がなぜ入らないかにも触れる。
- single（1つを選ぶ）: items = {"1": {"verdict": "該当"|"非該当", "reason": "..."}, ... "5"}。「該当」＝設問が求めるもの（「誤っているものを選べ」なら誤っている選択肢が該当）。該当はちょうど1つ。

## 出力
E:/codex-worktrees/_tohan-src/expl-batch-N.json に JSON 配列で書く（UTF-8、Writeツール）:
[{"number": 1, "topic": "医薬品の本質", "summary": "要点2〜3文（出題の狙いと正答の決め手）", "items": {...}, "tebikiPages": [5,6], "transcriptionIssues": [], "conflict": null}, ...]
topic は分野内の小テーマ（例: かぜ薬、胃腸薬、店舗販売業、副作用報告）を短く。
全20問を書き終えたら、python で JSON を読み込み、各問の items から導かれる選択肢番号 = officialAnswerNumber を検算するスクリプトを実行して結果を報告すること（不一致・conflict・transcriptionIssues の件数と中身）。最終返答は短く（件数と問題点のみ）。
