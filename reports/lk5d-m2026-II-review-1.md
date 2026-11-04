**FAIL — 対象HEAD：`091aade0128406a9b62e576016d7bc789eaaac2f`**

確定した修正事項は3件です。

1. **問16・選択肢イの解説が計算と不一致**  
   [mokuzo-2026-II.ts:772](C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/mokuzo-2026-II.ts:772)  
   「171.0 m²は角地加算を考慮しない値」は誤り。角地加算なしなら `12×9×0.6＋12×10×0.8＝160.8 m²` です。この説明を訂正してください。正答183.6 m²は正しいです。

2. **問18・代替テキストの敷地寸法が誤り**  
   [mokuzo-2026-II.ts:937](C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/mokuzo-2026-II.ts:937)  
   「南北11 m」は原図の `2＋2＋1＋6＋1＝12 m` に訂正が必要です。原図PNGと正答8.90 mには問題ありません。

3. **全25問の印刷ページ科目名が誤り**  
   [mokuzo-2026-II.ts:47](C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/mokuzo-2026-II.ts:47)  
   `sourcePrintedPage` が全件「計画」。原本どおり「法規 9」～「法規 22」に修正してください。現行テストの科目別チェックは木造Ⅱを対象としておらず、検出できていません。

問23は正答判定に問題ありませんが、[1162行](C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/mokuzo-2026-II.ts:1162)・1167行の提出時期は具体化を推奨します。建築主事等への提出期限は、法第11条第7項の**確認審査期間の末日の3日前まで**です。「確認済証交付前」だけでは期限を学べません。[国交省資料](https://www.mlit.go.jp/common/001758876.pdf)

確認結果：

- 本文25・選択肢125・公式正答25は原本と一致。125肢解説を確認。
- 図4点は原本からメモリ上で再描画し、**全画素一致**。問18の表・分数復元も一致。
- 問8＝3.40 m、問16＝183.6 m²、問17＝414 m²、問18＝8.90 mを独立再計算。
- 指定の法令論点を2026年1月1日版と照合。問7・10・11・12・14・19の指定値・条件は整合。
- 固定コミットのsource verifierを読み取り専用で再実行し、報告JSONのPASS件数を再現。
- ログは29テスト成功、型検査の診断なし、validateは26,444件・失敗0・警告16,808件。これらは既存ログの確認です。
- manifest・index・READMEは250/400問、次回木造2026Ⅲ問1と整合。非公開フラグ維持、対象コミットに公開側変更なし。

原本：
:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/R8_mk_1_2.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/owner-provided/kenchikushi2/R08_mk_gokakukizyun.pdf" purpose="source"}

書込み・設定変更・Git変更・レポート作成は行っていません。