# LQ3 既存稿の接続（2026-11-04）

正本: status-v4/work_items.json と dots-answer-20261104.md を参照。既存成果は 2026-11-01/qual-new*-private-* の完成引渡し版を使用。ローカル branch 全件と gh pr list --state all --search 技術士も確認し、第一次部門の追加Draft PRは確認できなかった。既存の第二次総監PR #616は対象外。

16部門・17回・595原問・2,975全肢理由を再制作せず接続。森林のみ2024/2025の2回、残りは既存の2025完成範囲に限定。595件すべて保存済み公式正答PDFと機械照合して一致（adoption-manifest.json）。本文・選択肢の既存独立照合受入票はprior-receipts/に固定。原稿・原紙PDF・画像のSHA256を保持。情報工学問25は参考専用（採点594）。未完成年度を新作していない。

船舶・海洋（qual-new:1）と衛生工学（qual-new:9）は指定ローカル成果フォルダに採用できる既存稿を発見できず停止。受入済み機械、建設・共通科目、第二次、独自問題、旧要約稿は取り込まない。

停止記録は維持: 森林work/ocr.ps1のAuthorizationManager拒否、繊維のMETI資料403、環境問24の指定改正版PDF403、旧phase2/base17/shadowアクセス拒否を再実行・別経路取得していない。各完成引渡し票が受入済みとしている保存成果のみ使用。権利許諾済みという新規判断は行わず、公開・push・PR・デプロイは未実施。

本文文字起こしが受入済みの生物工学・環境・情報工学はテキストを優先。他は受入済みの原問画像を保持し、同頁の解答対象番号を明記。画像原文の全文読み上げ・検索には制約が残る。

試験日出典: https://www.mext.go.jp/b_menu/shingi/gijyutu/gijyutu7/toushin/1413549_00009.htm (2025-11-23) / https://www.mext.go.jp/b_menu/shingi/gijyutu/gijyutu7/toushin/3130_00008.html (2024-11-24)。公式問題索引: https://www.engineer.or.jp/c_categories/index02021.html

pnpmはリポジトリ指定10.33.0をcorepack経由で使用。グローバルpnpm9のfrozen lockfile不整合は設定変更せず解消。validate:questionsは26,444問・fail=0（既存warn=16,808）。このコマンドはnative問題用なので、LQ3は別途pe-first-integrationで全件資産/解説/採点およびプレーヤー結合を検証。
