# 中小企業診断士一次・最新2回の引継ぎ checkpoint

2026年度（令和8年度）と2025年度（令和7年度）の7科目を対象とする。公開済み原問は0、受入れ済み原稿は0。必要原問数・解答単位数は未確定（`null`）で、完了資格として加算しない。

既存の資格固有 `RIGHTS_HOLD_NO_PROBLEM_REPUBLICATION` と、2026-10-10の公式索引取得 `WebFetch` 権限拒否を維持する。このPRは資料台帳とメタデータ検査コードのみで、問題、選択肢、正答表、原本PDF、抽出本文、図表は含まない。資格コード、公開index、出題プール、licenseを追加しない。

## 根拠と現状

- 基準main: `a9915090bf0c97dbc8a92084c33886424dcf8a96`。
- 共有checkoutは変更せず、`C:/wt/chusho-latest-two-20261011` を使用。
- 担当資格の公開index/型定義と関連open PRはなし。既存原稿を探した範囲では、受入れ可能な本資格の原稿・生きた資格専用ロックは見つかっていない。
- 既存HOLDの正本: note-automation `reports/qualification-expansion-20261007/approved35/business/INVENTORY7-CURRENT.json`。
- 既存拒否の正本: note-automation `reports/claude-capacity-20261010/shindan-official-index-20261010/OUTCOME.json`。`retryViaAlternatePermissionOrTransport=false`。ツール権限拒否を公式サイトのHTTP拒否と混同しない。
- 公式入口: https://www.jf-cmca.jp/contents/010_c_/shikenmondai.html 。対象年・科目の所在を観測したが、原本照合の受入れ済み証跡とは扱わない。
- 既存拒否のファイルを発見する前に2026年度PDFがローカル取得された。発見後の取得・別経路再試行・本文解析・採用はない。18個のローカルキャッシュ（HTML4/PDF14）はnote-automation側に保存し、このPRには含めない。
- 前後の手動メッセージ送信はsource threadが見つからず失敗した。このcheckpointの完了通知とPRを正式な引継ぎに使用する。

## 機械検査

```powershell
python scripts/test-chusho-inventory.py
python scripts/validate-chusho-inventory.py docs/evidence/chusho-latest-two-20261011/INVENTORY.json
```

候補メタデータの任意検査は `--candidate <metadata.json>`。入力は `{year, subjectCode, qNumber, part?}` の配列のみ。問題本文・正答などのフィールドは拒否する。

原問キーは `(year, subjectCode, qNumber)`、解答単位キーは `(year, subjectCode, qNumber, part)`。異なる年度・科目の同じ問番号は別原問とする。同じ原問の枝問を原問数に重複加算しない。同一解答単位の重複と、親問＋枝問の二重登録を拒否する。候補問番号の内部欠落を示すが、最高番号から必要総数を推測しない。

このcheckpoint用の検査はHOLD解除を受理せず、すべての結果で `readyToPublish=false` を返す。検査が成功しても原典・解説・掲載の受入れにはならない。

## 再開に必要な証跡

1. 既存の公式索引取得に対する権限拒否の正規解除。
2. 資格固有の既存転載HOLDの解決証跡。一般掲載の判断はユーザー担当だが、許可済みのlicenseを架空に作らない。
3. 全14科目組の公式問題・訂正後正答・図表を照合し、原問と枝問解答単位の総数を確定。
4. 保存原稿が提供された場合はmain/open PRとの重複検査を再実行して再利用。全肢解説、原本図表、難問の一次根拠を確認して既存Question型と検査に合わせる。
5. 原問追加のdraft PRを完成。mainマージ・本番デプロイは統合主担当 `01a12330-b245-70ed-a108-0998b50830be` が担当。

本PRを原問2回分の完成または新規公開増分と報告しない。
