# QKISHOUF レビュー修正・ローカル検証完了（2026-11-03）

現行版の差分裁定、通常学科60問、実技18問・237欄、公開画像130件の接続を完了。
型・lint・118テスト・標準Turbopack buildが終了コード0。生成結果のローカル配信で導線と保存読戻しを検収した。本番反映は行っていない。

- `FIX-EDITION-ACCEPTANCE.json`：全39本文頁／60学科原問の版差裁定と全78問の納品値ハッシュ。
- `FIX-UI-ACCEPTANCE.json`、`fix-ui/`：資格一覧→通常学科、実技・作図・保存読戻し、モバイルの画面検収。
- `FIX-ENVIRONMENT.json`、`FIX-CHECK-EXITS.json`：専用worktree内の依存、版、入力ハッシュ、再実行手順、検査終了コード。
- `fix-build-verified-exit.json`：最終Next.js buildの終了コード0。
- `FIX-DELIVERY-FILES.json`：今回のGit index/blobに固定した納品manifest（manifest自体とSHAファイルを除く）。

`FILES.json`、`QUESTION-RECEIPTS.json`、`reused/`と旧`DELIVERY-FILES.json`は前回コミットの履歴。145固定成果物は変更せず維持し、新たな公開用projectionを分離した。学科の既受入300肢・実技の同版受入を再利用し、新規全肢再査読や本番公開と読み替えない。

以下は修正前の作業履歴で、現在の残件・検証結果には上記と`ACCEPTANCE.json`を適用する。

---

# qkishou 受入票（2026-11-03）

対象は第65回（2026-01-25）40原問、第66回（2026-08-23）38原問。
学科60原問・300肢解説、実技18原問・237欄、130画像を既受入版から再利用した。
新規原問・推測補完は0。資格全体の公開完了とはしない。

`ACCEPTANCE.json` が範囲と検査結果、`FILES.json` が145採用ファイルの固定ハッシュ、
`QUESTION-RECEIPTS.json` が全78原問の回・問番号・正答・原問ハッシュ・PDFページ対応。
`reused/` に元の独立受入票・採用manifest・図6欄修正・狭域受入票を保存した。
145ファイル中144ファイルは元受入と同一。source-pages.json は受入済みの6欄修正版。
Q04全肢解説の受入済み差分は reader/候補adapter の読込み時に適用する。
Gitの既存改行処理によりJSON3ファイルだけCRLFからLFになるため、FILES.jsonは
リポジトリ側ハッシュと元受入バイト列のacceptedArtifactSha256を両方記録した。
値は変更せず、設定も変えていない。検査器はテキストの改行だけ正規化して比較する。

公式一覧: https://www.jmbsc.or.jp/jp/examination/examination-7.html

`OFFICIAL-SOURCE-CHECK.json` は今回取得した現行公式ZIPと各PDFのハッシュ。
公式正答・実技のPDFは保存済み受入原典と一致する。一方、学科4冊はバイト列が異なる。
`ACCEPTED-SOURCE-HASHES.json` に旧受入原典のハッシュを保持し、現行版と混同しない。
第66回旧ZIP URLは404だった。候補adapterは現行公式ZIPのURLを案内する。

学科版差について全43頁の描画・グリフ情報を比較し、一般65回2頁、専門65回12頁・
66回6頁を旧新版で目視した。PDF-CONTENT/GLYPH/RENDER-COMPARISON は診断結果であり、
文字層・フォントや空白の差を含む。これだけで全新版の意味同一性を受入済みとはしない。
新版全体の照合は公開前の残件。旧独立受入を新版の全問検収に読み替えない。

`data/questions/kisho` は既存Question形式の候補namespaceで、公開レジストリには未接続。
実技は欄単位の原図・公式解答と照合し、要約answerで自動採点しない。
絶対画像パスは来歴として保持し、表示はprivate-assetsとmanifestの対応を使う。
通常学習画面・画像供給・公開後の表示検収は残る。権利確認は本人取得済みという指示に従い、
待ち条件にしていない。固定稿の古い権利フラグは履歴であり、新しい権利判断の記録ではない。

スキーマ・型・関連テストの結果とビルド結果は ACCEPTANCE.json と各ログを参照。
スキーマ・型・Lint・11テスト・webpackビルドは成功。
ビルド後の専用worktreeの.next削除は自動承認審査に blocked by policy で2回拒否され、
削除未完。実パスと非junctionを確認したが、別手段で迂回していない。
専用worktreeはorigin/main（00e49b9）起点。作成途中の空index.lockについて稼働gitプロセスが
ないことを確認し、indexを構築、既存ファイルを上書きせず不足ファイルだけ展開した。
元作業ツリーの変更、設定変更、実キーAI、push・PR・デプロイ・本番DB書込みは行っていない。
