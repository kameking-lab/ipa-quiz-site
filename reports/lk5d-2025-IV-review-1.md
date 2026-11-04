**FAIL — HEAD `054961b`。修正対象は2件です。**

1. **問15：大引の継手位置の解説が誤り。**
   [2025-IV.ts:716](C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/2025-IV.ts:716) と720行の「床束心で腰掛けあり継ぎ」は、**「床束心から150 mm程度持ち出した位置で腰掛けあり継ぎ」**へ修正が必要です。継手形式だけでなく位置も誤っています。原文選択肢と正答3は維持してください。根拠：[国交省・令和4年版木造標準仕様書 §5.8.1(2)、印刷36頁](https://www.mlit.go.jp/gobuild/content/001879388.pdf)。

2. **問25：参照URLの改正版が不一致。**
   [2025-IV.ts:1272](C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/2025-IV.ts:1272) は現在、令和7年12月改正版を返します。指定された[令和4年9月改正版](https://www.mlit.go.jp/tochi_fudousan_kensetsugyo/const/content/001519399.pdf)へ差替え、**第9条第1項第8号・PDF6頁**を根拠として明示してください。「受注者へ助言、発注者へ報告」という解説と正答4は正しいです。

確認結果：

- 全25本文・125肢・25公式正答は原本と一致。125肢解説を通読し、上記以外に修正必須の誤りは確認しませんでした。
- PNG2点は原本の切り出しとバイト単位で一致。構造化表1点も全セル一致。
- 問1は独立再計算で工期16日、Cの余裕1日、Gを1日短縮すると工期15日。
- 指定された他の重点数値・施工条件も確認しました。
- verifier再実行はPASS。既存source reportと一致。既存ログは29テスト成功、typecheck診断なし、validateは `fail=0`。ただし、原文照合・形式テストは問15の技術的誤りを検出しません。
- manifest／index／tests／READMEは200/400問、次回「木造2026Ⅰ問1」で整合。全200問で `needsReview=true`、`publicAllowed=false` を確認。

原本照合対象：問題PDF14～23頁、正答PDF1頁。
:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/2k-2025-1st-gakka3_4.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/2k-2025-1st-gokakukijun.pdf" purpose="source"}

読み取り専用で実施し、ファイル・設定・Git変更、レポート作成は行っていません。
