# 介護支援専門員実務研修受講試験（ケアマネ）・未公開ステージング

第28回（令和7年度、2025-10-12）・第27回（令和6年度、2024-10-13）各60問。全国共通問題で、都道府県が掲載した公式の問題PDFと正答番号表を出典にする。

| 回 | ファイル | 問題 | 正答 |
| --- | --- | --- | --- |
| 第28回 | `2025.json` | 東京都福祉局 r7shikenmondai（PDF・スキャン） | 東京都 正答番号 PNG 2枚（問1〜25／26〜60） |
| 第27回 | `2024.json` | 山梨県 02_r06sikenmondai.pdf（スキャン） | 山梨県 03_r06seitoubangou.pdf |

- 問題PDFはテキスト層のないスキャン画像。ページ画像から転記し、全問を画像と二度照合した。読点は印刷どおり「，」。
- 正答はすべて「2つ選べ」「3つ選べ」の複数選択（`scoring: select-all-required`）。正答数と「Nつ選べ」は全120問一致。公式正答表に没問・全員正解の注記なし。
- 正答は転記値と、作業者が公式画像を見て独立に読んだ値（`reports/caremanager/build-staging.py` の `INDEPENDENT_KEYS`）で二重照合。
- 全600肢の解説は独自作成。法令・基準・報酬は各回の試験日時点（`lawAsOf`）で説明し、`lawSensitive` を付けた。別エージェントの独立レビュー結果は `reports/caremanager/review-r7.json`・`review-r6.json`（HOLD 0、FIX 7件は反映済み）。
- 区分: 介護支援分野（問1〜25）、保健医療福祉サービス分野のうち保健医療サービスの知識等（26〜45）・福祉サービスの知識等（46〜60）。`category` には小区分名を入れた。
- 表示名に都道府県名を付けない。都道府県名は出典表記（`sourceAttribution`）だけに置く。
- 第29回（2026-10-11）は正答が合格発表（2026-11-24予定）まで未公表のため未収録。
- **未公開**: 公開のQuestion型・ExamCode・レジストリには接続していない。接続差分は `reports/caremanager-registry.md`。

再生成: `python -I reports/caremanager/build-staging.py`
