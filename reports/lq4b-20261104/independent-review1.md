**FAIL（対象：e6e91c478）**

- **P1・統合で発生**：[lib/seo/exam-meta.ts:263](C:/Users/kanet/20260522/wt-LQ4B/lib/seo/exam-meta.ts:263)  
  `chizai2` と `kenchiku-setsubishi` の定義が `Record<…>` の型引数内に入り、構文エラーになります。両定義を `> = {` の内側へ移動してください。直前の統合コミット3813332e7では正常でした。共通SEO利用ページ全体に影響します。

- **P2・気象受入版から継承**：[app/quiz/stream/page.tsx:23](C:/Users/kanet/20260522/wt-LQ4B/app/quiz/stream/page.tsx:23)  
  許可一覧に `kisho` がなく、通常クイズのストリームタブを押すとAPに置換されます。年度別・分野別も同様です。各資格一覧へ追加し、資格・科目保持を確認してください。

- **P2・気象受入版から継承**：[scripts/validate-questions.ts:70](C:/Users/kanet/20260522/wt-LQ4B/scripts/validate-questions.ts:70)  
  共通検証の資格enumに `kisho`、121行のlicense enumに `JMBSC-permission-required` がありません。検証対象には気象60問が含まれるため、スキーマ検証で失敗します。両enumの追加が必要です。

保存確認：各資格に固有の変更ファイル計485件は受入コミットとGit blob一致。建築設備士2026年am2 Q18の公開除外、公開209問も保持されています。

別スコープの原稿探索：**biru-kan 360問／gijutsushi1-kikai 160問の実原稿は、確認範囲で発見できませんでした。** 引継ぎ記載の機械部門worktree・RESULTSは不存在、指定パケット名の再検索も該当なし。参照コミットはアダプター／テストで、原稿ではありません。紹介データ・note記事も原稿数に算入していません。不存在の断定ではなく、所在未確認です。旧HOLD／STOP・receipt bindingは阻害理由にしていません。

読み取り専用の静的レビューです。依存実行体が未整備のためテスト未実行。ファイル変更・build・deploy・pushは行っていません。