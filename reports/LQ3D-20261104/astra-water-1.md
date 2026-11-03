**FAIL — water-2024 は解説4箇所の修正が必要です。** 全35問・175理由を照合しました。

| 箇所 | 必須修正 |
|---|---|
| 問13①・要約（原本p.7） | 誤りの核心が未説明。「夜間最小流量測定法は**間接測定法**であり、直接測定法とする点が誤り」と明記。 |
| 問13④（p.7） | 「水圧調整は対症療法的対策」は誤り。**予防的対策に含まれるため、④の記述は適切**に修正。[国交省資料](https://www.mlit.go.jp/common/830003767.pdf)とも一致。 |
| 問28①・要約（p.14） | 一般論だけで数値の逆転を説明していない。**汚水1,800、雨水3,600 m³/(m²・日)**が標準で、原文は逆と明記。[東京都資料](https://www.opendata.metro.tokyo.lg.jp/gesui/R3/gijyututyousa/2001all.pdf)で裏付け。 |
| 問28②（p.14） | 「日平均ではなく時間最大」は原文の適切な記述を誤って否定。**日平均汚水量流入時の水位から損失水頭を差し引く**説明に修正。 |

修正は原稿の `summary/reasons` と正規化JSONの `explanation/choiceExplanation` に反映し、原稿・正規化ファイルのハッシュピンを更新してください。**正答番号・verdictの変更は不要**です。

確認済み：

- 原本全17ページをコンタクトシート5枚で目視。印刷ページ番号と35問の参照ページは一致。
- 公式解答PDF p.12「10．上下水道部門」と**35/35正答一致**。
- 正誤ラベル175件は「解答として選ぶ／選ばない」の意味で一致。上記②・④は理由文側の誤り。
- 配信画像17枚は原本を1.8倍で再描画した**全RGB画素と一致**。寸法・画像SHA-256も17/17一致。
- 原稿・正規化JSON・問題PDF・解答PDFの4ピン、全35問の両 `sourceHash` が一致。原稿と正規化の175理由も一致。

対象原稿：:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ3D/reports/LQ3D-20261104/manuscripts/pe-first-water-2024.json" purpose="source"}
正規化：:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ3D/data/exam-library/pe-first/pe-first-water-2024.json" purpose="source"}
原本：:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ3D/reports/LQ3B-20261104/sources/2024-10.pdf" purpose="source"}
公式解答：:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ3D/reports/LQ3B-20261104/sources/answers-2024.pdf" purpose="source"}
ピン：:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ3D/reports/LQ3D-20261104/adoption-manifest.json" purpose="source"}

ファイル変更なし。