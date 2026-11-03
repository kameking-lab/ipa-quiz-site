**判定：FAIL（コード／受入メタデータの検証機構）**。現行15件の内容誤りを示す判定ではありません。

1. **P1：レビュー済み原稿との結び付けが未検証**  
   [validate-lq4-staging.mjs:42](/C:/Users/kanet/20260522/wt-LQ4B/scripts/validate-lq4-staging.mjs:42) は `reviewedFileSha256` の形式しか確認しません。メモリ内で全ゼロに変更しても PASS。さらに解説を変更して現行・semantic ハッシュだけ再計算すると、元のレビュー証跡を保持したまま PASS しました。  
   **修正案：** レビュー時の原稿を保存・ハッシュ検証し、その原稿と現行原稿から指定3項目だけを除外して比較する。review3 自体には原稿ハッシュがなく、現状では「ステータス変更のみ」を独立に証明できません。

2. **P2：receipt 全体の状態・件数を検証していない**  
   [validate-lq4-staging.mjs:19](/C:/Users/kanet/20260522/wt-LQ4B/scripts/validate-lq4-staging.mjs:19) は `batches` だけを読みます。receipt を `PUBLIC_COMPLETE`・承認520・残り0に変更しても PASS しました。  
   **修正案：** 部分受入状態、既存2件、総数520、承認数・残数の整合を検証し、両問題の回帰テストを追加する。

確認できた点：

- `node scripts/validate-lq4-staging.mjs --sources`：**PASS**。新規承認15、既存2、残り503。公式解答索引・保存PDFハッシュとの照合に成功。
- 現行原稿・review3/4 の生バイトハッシュは receipt と一致。semantic 除外項目は指定の3項目のみ。
- review3 は5問、review4 は10問限定。review4 は review2 の指摘修正・証跡再利用を明記。ただしモデル実行の真正性は、保存レポート・prompt・終了コードだけでは独立に確証できません。
- ハッシュ対象原稿・レポートは LF。追加属性も `eol=lf`。既存原資料・旧承認2件に基準コミットからの差分なし。
- 現行状態は部分受入・`publicGo:false`。

専用テストは実行を試みましたが、環境制限の **`spawn EPERM`** で起動できず、合格未確認です。反例検証はメモリ内のみで実施しました。編集・commit・push・PR・deploy は行っていません。上記修正と再検証が必要なため、PASS は出せません。