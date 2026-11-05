**FAIL — 問11の解説に修正必須の誤りがあります。**
対象HEAD：`73422d928175e0b18746835b6d982525e10d19df`

- **問11：SM-15Sの用途が誤っています。** [総合解説・肢ア解説](/C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/mokuzo-2026-IV.ts:507)は「土台等の隅角部を補強」としています。日本住宅・木材技術センターの資料は、柱と土台・桁等、横架材の接合を示し、隅柱の柱脚など土台切れ端部への使用を禁止しています。用途説明の訂正が必要です。**公式正答1自体は正しい**です。[一次資料・印刷9～10頁](https://www.howtec.or.jp/relays/download/134/318/227/517/?file=/files/libs/517/201706291243095194.pdf)

その他の確認結果：

- 全25本文・125選択肢・25公式正答を照合。125肢解説を通読し、7図・2構造化表を確認しました。
- 問12は図2・4を含む全5図が存在。第三者出典はPNG、`questionNotice`、`originalContent.postOptionNote`に保持。図4＝そぎ継ぎの説明も妥当です。
- 問15は凡例から下階支持を独立に確認。ロの該当支点間は **1,820 mm**、中央の■は2階管柱で下階支点ではありません。中央で120×360の床梁反力も受けるため、120×180を不適当とする判断に整合します。
- 指定された問4・5・9・13・14・17・18・19・22・24には、追加の修正必須事項を認めませんでした。
- source verifierを読み取り専用で再実行しPASS。12提供PDF・400公式正答・300本文・1,500肢で、source-check JSONと一致。ただし、この検証は解説の技術的正しさを保証しません。
- manifest／index／READMEは300/400問、次回は木造2025Ⅰ問1で一致。全300問で`publicAllowed=false`・`needsReview=true`。公開レジストリ・ルートへの接続なし。
- 保存ログは29テスト成功、typecheckは診断なし。validateは26,444問・fail=0・warn=16,808で、公開問題群の結果です。

既知のⅢ参照404は非ブロッキングの別フォロー扱いです。同URLがⅣ問9にもありますが、今回のFAIL理由は上記の問11です。

照合原本：:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/R8_mk_3_4.pdf" purpose="source"}（14～26頁）、:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/R08_mk_gokakukizyun.pdf" purpose="source"}。

ファイル・Git・設定の変更、レポート作成は行っていません。
