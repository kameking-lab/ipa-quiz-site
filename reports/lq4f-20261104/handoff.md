# LQ4F 作業報告（2026-11-04）

判定：午後180原問・900肢解説の内容制作と独立レビュー受入を完了。2024年・2025年各Q1〜180、計360原問のビル管理稿が受入済み。共通ローダーへの登録・公開は未実施。

## 範囲と状態

- worktree：C:/Users/kanet/20260522/wt-LQ4B
- branch：qual/lq4b-integration-20261104。開始HEAD：4d9338c4745d1e4788c461fd8e3634ba4fa5bc6d。
- 開始：2026-11-04 04:24:59 JST。報告作成：2026-11-03T19:57:11.916Z（UTC）。
- オーナー決定2026-11-04 01:30の権利確認済み条件で進行。過去の権利・取得STOPを停止理由としていない。保存原典を利用し、アクセス制限の迂回なし。
- 技術士機械LQ4Eの原稿・図・コードは変更なし。今回の全差分はビル管理ステージング、共通受入票、LQ4F証跡のみ。push・PR・デプロイ・本番DB操作なし。
- 全原稿publicGo:false。アプリ実行コード・共通ローダーを変更していないため、今回のビルド・ブラウザ検収は未実施。

## 制作と独立レビュー

subject:pm、午後用PDFの物理ページを使用。原文・全5選択肢・公式正答・総合解説・全5肢理由・出典URL・原典SHA・ページを保持。両OCRと原画像を照合し、図表は公式PDFから直接切り出し、座標・dpi・SHA・altを保持した。再描画なし。

独立レビューは全回 C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only。FAILの旧稿と票も保存し、指摘修正後の現在稿SHAが記載されたPASS票で受け入れた。再レビューでは差分確認を行い、未変更内容の前回PASSを保持している。実行記録はreview-executions.json。レビュー票の対象は各部分であり、技術士を含む全520問の受入ではない。

修正事項には、原文の走行機・暗幕等の厳密転記、学校の設計給水量の対象条件、非常コンセントの地上11階以上の基準、スネークワイヤの立て管20m・横管25m、空圧式清掃0.2〜0.32MPa、清掃作業の区分、図表の切出し範囲がある。飲料用貯水槽等の排水口空間は、採用したSHASE準拠の東京都基準の最小150mmへ統一し、先行受入稿2024Q129も再レビューして受入票を更新した。疾病分布等は出題当時の記述と現在の知見を区別した。

共通受入の正本：reports/lq4c-20261104/acceptance.json。今回のビル管理午後限定の受入票：reports/lq4f-20261104/acceptance.json。修正前の受入票はacceptance-history.json、審査対象版はreviewed-manuscripts/に保持。

## 検証

- corepack pnpm validate:questions：終了0。26,873問、fail 0、既存warn 16,854。未登録ステージング分は共通件数に含まれない。
- corepack pnpm typecheck：終了0、診断なし。NODE_OPTIONS=--max-old-space-size=12288。
- 関連Vitest：25ファイル・282テスト成功。
- node --test scripts/validate-lq4-staging.test.mjs：14テスト成功。
- node scripts/validate-lq4-staging.mjs --require-reviewed --sources：PASS。保存原典14PDF、受入稿・公式正答・審査対象版・全図のSHA等を検証。
- checks-final.json：ビル管理受入360/360、午後受入180/180、残0。全ID重複なし、全稿非公開、範囲外変更なし。
- Git blob照合はgit-blob-verification.jsonに記録。制作稿・審査対象版・票・図をコミットから読み戻して照合する。

## 残作業と再開

午後原問の残り：0。未受入草稿：0。ビル管理360問の内容は揃ったが、資格全体の共通ローダー登録等の統合作業は別途必要。全520問の共通受入票では技術士側の残130問があり、LQ4Eには触れていない。

再開時は同worktreeで git status --short、git log -8 --oneline、node scripts/validate-lq4-staging.mjs --require-reviewed --sources を確認。原典はC:/Users/kanet/AppData/Local/Temp/codex-work/lq4b-sources/に保存済み。remaining-originals.jsonはビル管理残0の正確な一覧。

## ローカルコミット

```text
6509d744f content(lq4f): complete 180 afternoon originals with all choice explanations reviewed
00af0fd24 content(lq4f): accept 93 more afternoon originals and reseal consistent drainage guidance
2ee1411b7 content(lq4f): accept 33 afternoon originals with source tables and corrected standards
514a50fc0 content(lq4f): accept 19 plumbing originals with sourced water demand correction
4d1be6336 content(lq4f): accept 15 afternoon building hygiene originals after independent review
```

後続の証跡・報告コミットはgit logを参照。
