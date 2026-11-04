**PASS — 前回FAILの問11は修正済み。残りのⅣ範囲にも修正必須の欠陥は認めません。**

対象は開始時HEAD `f85c1e90b`。途中で追加された2025年I・次バッチは除外しました。

- **問11**：SM-15Sの用途「柱と土台・桁等の横架材」、隅柱柱脚等の土台切れ端部への使用禁止、一次URLを確認。[HOWTEC資料・印刷9～10頁](https://www.howtec.or.jp/relays/download/134/318/227/517/?file=/files/libs/517/201706291243095194.pdf)と整合します。
- **全25本文・125選択肢・25公式正答・125肢解説・7図・2表**を確認。7図は提供PDFから再描画した画像と全画素一致。
- **問12**：図2・4を含む全5図あり。第三者出典をPNG・`questionNotice`・`postOptionNote`に保持。図4はそぎ継ぎ。
- **問15**：凡例から支持条件を独立確認。ロの該当支点間は1,820 mm。中央の■は2階管柱で下階支点ではなく、120×360床梁の反力も受けるため、120×180を不適当とする説明に整合。
- 指定の問4・5・9・13・14・17・18・19・22・24も確認済み。
- verifier再実行はPASS：12 PDF／400正答／300本文／1,500肢で保存JSONと一致。manifest・index・READMEは300/400問、次回は木造2025Ⅰ問1。全300問で`publicAllowed=false`・`needsReview=true`、公開接続なし。
- 保存ログは29テスト成功、typecheck診断なし。validateは26,444問・fail=0（公開問題群の検証）。

既知のⅢ参照404（Ⅳ問9にも同URL）は、非ブロッキングの別フォロー扱いです。書込み・Git変更・レポート作成は行っていません。

照合原本：:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/R8_mk_3_4.pdf" purpose="source"}（14～26頁）、:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/R08_mk_gokakukizyun.pdf" purpose="source"}。
