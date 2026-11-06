# khk-hanbai（高圧ガス販売主任者 第一種・第二種／液化石油ガス設備士 学科）報告 2026-11-06

## 対象回と根拠
- 令和7年度・令和6年度（令和8年度は2026-11-08実施のため対象外）。公式 https://shiken.khk.or.jp/shiken.html
- 既存190問はローカルWIP `C:/Users/kanet/20260522/wt-khk-hanbai`（`qual/khk-hanbai-20261104`、独立レビューPASS）から取り込み。WIPフォルダは読み取りのみで変更していない。
- 不足していた設備士 配管理論等（LY）の公式PDFは、旧候補URL（…ACLY-W.pdf）が404だったが、Wayback CDXの記録から正しいファイル名が末尾「-W-W.pdf」と判明し、公式サーバーから通常GETで取得（HTTP 200、ブラウザ・ログイン不要）。
  - https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACLY-W-W.pdf （SHA256 9eef2dc2…、10ページ）
  - https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACLY-W-W.pdf （SHA256 bbb86b4a…、11ページ）
  - 正答は既存の公式正答表（R7fy_kaitou.pdf・R6fy_kaitou.pdf）のLY行。

## 追加問数
- 190問 → 230問（設備士 配管理論等 各年度20問、計40問・200肢解説を追加）。
- 問12（配管図・継手寸法表）・問20（配管図・別紙寸法早見表）は両年度ともwebpを併用し、本文末尾に数値を文章化。
- 検証スクリプト `scripts/validate-khk-hanbai.ts` とテストを piping セッション・画像ハッシュに対応。

## 独立レビュー
- 40問を別エージェント（read-only）で照合：PASS（`reports/khk-setsubishi-ly-review.md`）。P3のうち4件（R7問17ハ・問9ロ、R6問19ロ・問9イ）の表現を修正済み。
- 残るP3：R7問13ロ・問16ロ（具体値は一次資料確認後に追記）、R6問13イ・ハの根拠資料。いずれも正答と整合し、現状の文面に誤りなし。

## 権利文言（記録のみ）
- https://www.khk.or.jp/condition.html に転載・複製禁止の文言。オーナー決定（2026-11-04）により未公開stagingで収録。`publicAllowed=false` 維持。

## 未解決
- 共有レジストリ（catalog.ts / validate-questions.ts）の反映は `reports/khk-hanbai-registry.md`。
- `scripts/audit-khk-hanbai-sources.py`（ローカル tmp/lk6 前提の原本照合）は190問のまま。LY 40問の照合方法は `source-audit.json` の `lyMethod` に記録。
