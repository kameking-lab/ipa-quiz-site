# 言語聴覚士 第27・28回 保存原本調査（2026-10-11）

## 結論

残393問の allowlist `missingIds` に対応する、正規取得元を確認できる保存原問・未使用原稿は、指定範囲内で **0件**。新たな本文・選択肢・図表は回収できなかった。公開可能数の増分も0件で、393問の欠落は解消していない。

## 対象と照合

- 基準: `C:/wt/kakomon-gengo-chokakushi-latest-two-20261011/data/questions/gengo-chokakushi/source-manifest.json` の `missingIds` 393件。内訳は2025年AM 97、PM 100、2026年AM 96、PM 100。
- 対象外: 既存原稿5件（2025 AM40、2026 AM14/35/69/83）、公式除外2件（2025 AM36/48）。2026 AM35/83はレビュー保留のまま。`st` はIPA ITストラテジストで別資格。
- 指定された `reports/qualification-expansion-20261007`、`claude-capacity-20261010`、`codex-takeover-20261010/11`、`medical-two-source-20261010`、`medical-public-source` のファイル名と限定的な出典・取得メタデータを確認した。`reports/codex-takeover-20261011/gengo-latest-two-20261011/official-fullpaper-sources` 以外に、言語聴覚士の対象年度・設問に対応する保存PDF名は見つからなかった。
- 上記のうち既存言語聴覚士フォルダ、担当lease、parallel20を除く、300KB以下かつファイル名が source / manifest / receipt / intake / inventory / recovery / handoff を含むJSON/JSONL/MD/TXT/CSV 4,528件を、資格名のメタデータ参照だけで確認した。ヒット3件は「あはき」別試験の選択肢にある職種名2件と社労士資料中の職種名1件で、第27・28回の原問ではない。`input` / `inputs` / `assets` に明確な言語聴覚士名のファイルもなかった。

## 正規原本と取得記録

`official-fullpaper-sources/official-notice-manifest.json` の厚生労働省由来7 PDF（27A36/40/48、28A14/35/69/83）は、保存実ファイルのSHA-256が全件一致した。各PDFは対象設問1問の特例通知であり、4冊の試験問題冊子ではない。7 IDすべて `missingIds` の外にある。原問本文は既存 `official-notice-questions.json` に転記済み、公式正答表も既存 `OFFICIAL-ANSWER-KEY400.json` に400件あるが、正答表だけでは393件の原文・選択肢・図表を復元できない。

`official-fullpaper-sources/retrieval-status.md` による既存調査では、MHLWと試験財団の確認ページに4冊のAM/PM問題冊子または別冊図表へのリンクは確認されていない。これは確認ページに限った記録で、他所での存在否定ではない。今回はネット取得、拒否済み提供元への再試行、拒否コンテンツ閲覧をしていない。

## 次の作業

許可された一次提供元から、第27回・第28回のAM/PM問題冊子と図表を入手できた時点で、取得URL・日時・HTTP状態・PDF署名・バイト数・SHA-256を記録し、各冊子の年度・AM/PM・問番号・原文・選択肢・図表を `missingIds` と1件ずつ突合する。現状の保存資料だけから393問を埋める根拠はない。
